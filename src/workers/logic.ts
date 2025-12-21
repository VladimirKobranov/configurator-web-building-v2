onmessage = async (event) => {
  const { payload } = event.data;

  console.log("worker: received payload", payload);

  // await new Promise((resolve) => setTimeout(resolve, 2000)); // for tests

  // Use actual values from payload or defaults
  const sizeX = payload?.sizeX || 10;
  const sizeY = payload?.sizeY || 10;
  const sizeZ = payload?.sizeZ || 10;

  console.log(
    `worker: building house with dimensions ${sizeX}x${sizeY}x${sizeZ}`
  );
  const house = buildHouse(sizeX, sizeY, sizeZ);
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

function generateWallSide(
  length: number,
  heightY: number,
  start: { x: number; z: number },
  axis: "x" | "z",
  rotationY: number,
  sideIndex: number
) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const pos =
      axis === "x"
        ? { x: start.x + i, z: start.z }
        : { x: start.x, z: start.z + i };
    for (let y = 0; y < heightY; y++) {
      arr.push({
        type: "wall",
        position: { x: pos.x, y, z: pos.z },
        rotationY,
        sideIndex,
      });
    }
  }
  return arr;
}

function buildHouse(sizeX: number, sizeY: number, sizeZ: number) {
  const roof = generateRoof(sizeX, sizeZ, sizeY);
  const north = generateWallSide(
    sizeX,
    sizeY,
    { x: 0, z: 0 },
    "x",
    -Math.PI / 2,
    0
  );
  const south = generateWallSide(
    sizeX,
    sizeY,
    { x: 0, z: sizeZ - 1 },
    "x",
    Math.PI / 2,
    1
  );
  const west = generateWallSide(sizeZ, sizeY, { x: 0, z: 0 }, "z", 0, 2);
  const east = generateWallSide(
    sizeZ,
    sizeY,
    { x: sizeX - 1, z: 0 },
    "z",
    Math.PI,
    3
  );

  const allWalls = [...north, ...south, ...west, ...east];
  const posMap = new Map<string, any[]>();

  allWalls.forEach((seg) => {
    const key = `${seg.position.x},${seg.position.y},${seg.position.z}`;
    if (!posMap.has(key)) posMap.set(key, []);
    posMap.get(key)!.push(seg);
  });

  const finalSegments: any[] = [...roof];
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
      // Logic for rotations stays the same as per previous custom request
      let rot = 0;
      if (x === 0 && z === 0) rot = 0; // left top
      else if (x === sizeX - 1 && z === 0) rot = -Math.PI / 2; // right bottom
      else if (x === sizeX - 1 && z === sizeZ - 1) rot = Math.PI; // right top
      else if (x === 0 && z === sizeZ - 1) rot = Math.PI / 2; // left bottom

      let type = "main_floor_corner";
      if (y === 0) type = "first_floor_corner";
      else if (y === sizeY - 1) type = "roof_corner";

      finalSegments.push({
        ...seg,
        type,
        rotationY: rot,
      });
    } else {
      let type = `main_floor_0`;
      if (y === 0) type = `first_floor_0`;
      else if (y === sizeY - 1) type = "roof_wall_0";

      finalSegments.push({
        ...seg,
        type,
      });
    }
  });

  return finalSegments;
}
