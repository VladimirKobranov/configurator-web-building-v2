import { mulberry32 } from "@/etc/utils";
import type { BuildingItem, BuildingProps } from "@/types";

onmessage = async (event) => {
  const { payload }: { payload: BuildingProps } = event.data;

  console.log("worker: received payload", payload);

  // await new Promise((resolve) => setTimeout(resolve, 2000)); // for tests

  // Use actual values from payload or defaults
  const sizeX = payload?.sizeX || 10;
  const sizeY = payload?.sizeY || 10;
  const sizeZ = payload?.sizeZ || 10;
  const offset = payload?.offset || 0;
  const seed = payload?.randomSeed || 12345;
  const brandmauer = payload?.brandmauer || false;
  const aircond = payload?.aircond ?? false;
  const aircondPercent = payload?.aircondPercent ?? 20;

  console.log(
    `worker: building house with dimensions ${sizeX}x${sizeY}x${sizeZ}, offset ${offset}, seed ${seed}, brandmauer ${brandmauer}, aircond ${aircond}, aircondPercent ${aircondPercent}`,
  );

  const rawHouse = buildHouse(
    sizeX,
    sizeY,
    sizeZ,
    seed,
    brandmauer,
    aircond,
    aircondPercent,
  );

  // Apply spacing and centering
  const spacing = 1 + offset;
  const centerOffsetX = -((sizeX - 1) * spacing) / 2;
  const centerOffsetZ = -((sizeZ - 1) * spacing) / 2;

  const house = rawHouse.map((item) => ({
    ...item,
    position: {
      x: item.position.x * spacing + centerOffsetX,
      y: item.position.y * spacing + 0.5, // 0.5 vertical offset from store
      z: item.position.z * spacing + centerOffsetZ,
    },
  }));

  console.log("worker: house built", house);

  // Send the result back to the main thread
  postMessage({
    status: "success",
    result: house,
    dimensions: { sizeX, sizeY, sizeZ },
  });
};

function generateRoof(sizeX: number, sizeZ: number, heightY: number) {
  const tiles = [];
  for (let x = 0; x < sizeX; x++) {
    for (let z = 0; z < sizeZ; z++) {
      const isEdge = x === 0 || x === sizeX - 1 || z === 0 || z === sizeZ - 1;
      if (!isEdge) {
        tiles.push({
          type: "roof_cap",
          position: { x, y: heightY - 1, z },
          rotationY: 0,
        });
      }
    }
  }
  return tiles;
}

// Helper for stable coordinate-based seeding
function getCoordSeed(baseSeed: number, x: number, y: number, z: number) {
  // Simple shift-and-xor hash to combine coordinates into a seed
  return (baseSeed ^ (x * 73856093) ^ (y * 19349663) ^ (z * 83492791)) >>> 0;
}

function generateWallSide(
  length: number,
  heightY: number,
  start: { x: number; z: number },
  axis: "x" | "z",
  rotationY: number,
  sideIndex: number,
  baseSeed: number,
  brandmauer: boolean,
) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const pos =
      axis === "x"
        ? { x: start.x + i, z: start.z }
        : { x: start.x, z: start.z + i };
    for (let y = 0; y < heightY; y++) {
      // Use stable seed for each coordinate
      const coordSeed = getCoordSeed(baseSeed, pos.x, y, pos.z);
      const rand = mulberry32(coordSeed);

      let type = "unknown";

      // Pick random variant index 0-3
      const variant = Math.floor(rand() * 4);

      const isSideBrandmauer =
        brandmauer && (sideIndex === 2 || sideIndex === 3);

      if (isSideBrandmauer) {
        if (y === heightY - 1) {
          type = "roof_wall_brandmauer";
        } else {
          type = "main_floor_brandmauer";
        }
      } else {
        if (y === 0) {
          type = `first_floor_${variant}`;
        } else if (y === heightY - 1) {
          type = "roof_wall_0";
        } else {
          type = `main_floor_${variant}`;
        }
      }

      arr.push({
        type,
        position: { x: pos.x, y, z: pos.z },
        rotationY,
        sideIndex,
      });
    }
  }
  return arr;
}

function buildHouse(
  sizeX: number,
  sizeY: number,
  sizeZ: number,
  baseSeed: number,
  brandmauer: boolean,
  aircond: boolean,
  aircondPercent: number,
) {
  const roof = generateRoof(sizeX, sizeZ, sizeY);
  const north = generateWallSide(
    sizeX,
    sizeY,
    { x: 0, z: 0 },
    "x",
    -Math.PI / 2,
    0,
    baseSeed,
    brandmauer,
  );
  const south = generateWallSide(
    sizeX,
    sizeY,
    { x: 0, z: sizeZ - 1 },
    "x",
    Math.PI / 2,
    1,
    baseSeed,
    brandmauer,
  );
  const west = generateWallSide(
    sizeZ,
    sizeY,
    { x: 0, z: 0 },
    "z",
    0,
    2,
    baseSeed,
    brandmauer,
  );
  const east = generateWallSide(
    sizeZ,
    sizeY,
    { x: sizeX - 1, z: 0 },
    "z",
    Math.PI,
    3,
    baseSeed,
    brandmauer,
  );

  const allWalls = [...north, ...south, ...west, ...east];
  const posMap = new Map<string, BuildingItem[]>();

  allWalls.forEach((seg) => {
    const key = `${seg.position.x},${seg.position.y},${seg.position.z}`;
    if (!posMap.has(key)) posMap.set(key, []);
    posMap.get(key)!.push(seg);
  });

  const finalSegments: BuildingItem[] = [...roof];
  const seen = new Set<string>();

  // Process wall segments to find corners and deduplicate
  allWalls.forEach((seg) => {
    const key = `${seg.position.x},${seg.position.y},${seg.position.z}`;
    if (seen.has(key)) return;
    seen.add(key);

    const atPos = posMap.get(key)!;
    const isCorner = atPos.length > 1;
    const { x, y, z } = seg.position;

    if (isCorner) {
      // Process structural corner
      let rot = 0;
      if (x === 0 && z === 0)
        rot = 0; // left top
      else if (x === sizeX - 1 && z === 0)
        rot = -Math.PI / 2; // right bottom
      else if (x === sizeX - 1 && z === sizeZ - 1)
        rot = Math.PI; // right top
      else if (x === 0 && z === sizeZ - 1) rot = Math.PI / 2; // left bottom

      let type = "main_floor_corner";
      if (y === 0) type = "first_floor_corner";
      else if (y === sizeY - 1) type = "roof_corner";

      if (brandmauer) {
        if (y === 0) {
          // first floor
          if (x === sizeX - 1 && z === 0) {
            type = "first_floor_corner_brandmauer";
          } else if (x === sizeX - 1 && z === sizeZ - 1) {
            type = "first_floor_corner_brandmauer_right";
            rot -= Math.PI / 2;
          } else if (x === 0 && z === 0) {
            type = "first_floor_corner_brandmauer_right";
            rot -= Math.PI / 2;
          } else if (x === 0 && z === sizeZ - 1) {
            type = "first_floor_corner_brandmauer";
          }
        } else if (y === sizeY - 1) {
          // roof
          if (x === sizeX - 1 && z === 0) {
            type = "roof_corner_brandmauer";
          } else if (x === sizeX - 1 && z === sizeZ - 1) {
            type = "roof_corner_brandmauer_right";
            rot -= Math.PI / 2;
          } else if (x === 0 && z === 0) {
            type = "roof_corner_brandmauer_right";
            rot -= Math.PI / 2;
          } else if (x === 0 && z === sizeZ - 1) {
            type = "roof_corner_brandmauer";
          }
        }
      }

      finalSegments.push({
        ...atPos[0],
        type,
        rotationY: rot,
      });
    } else {
      // Process regular wall
      const structural = atPos[0];
      finalSegments.push(structural);

      // Randomly place air conditioner on main floor windows
      const isFirstFloor = y === 0;
      const isLastFloor = y === sizeY - 1;
      const isBrandmauer =
        brandmauer &&
        (structural.sideIndex === 2 || structural.sideIndex === 3);

      if (!isFirstFloor && !isLastFloor && !isBrandmauer && aircond) {
        // Use a different salt for decorations to avoid correlation with wall variants
        const decoSeed = getCoordSeed(baseSeed + 123, x, y, z);
        const decoRand = mulberry32(decoSeed);

        if (decoRand() * 100 < aircondPercent) {
          // 20% chance
          const acVariant = Math.floor(decoRand() * 3);
          finalSegments.push({
            type: `aircond_${acVariant}`,
            position: { x, y, z },
            rotationY: structural.rotationY,
            sideIndex: structural.sideIndex,
          });
        }
      }
    }
  });

  return finalSegments;
}
