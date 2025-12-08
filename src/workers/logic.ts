onmessage = async (event) => {
  const { payload } = event.data;

  await new Promise((resolve) => setTimeout(resolve, 2000)); // for tests

  console.log("worker: ", payload);
  const house = buildHouse(100, 100, 100);
  console.log("worker: house built", house);
};


function generateRoof(sizeX: number, sizeZ: number, heightY: number) {
  const tiles = [];
  for (let x = 0; x < sizeX; x++) {
    for (let z = 0; z < sizeZ; z++) {
      tiles.push({ type: "roof_tile", position: { x, y: heightY, z } });
    }
  }
  return tiles;
}

function generateWallSide(
  length: number,
  heightY: number,
  start: { x: number; z: number },
  axis: "x" | "z"
) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const pos =
      axis === "x"
        ? { x: start.x + i, z: start.z }
        : { x: start.x, z: start.z + i };
    for (let y = 0; y < heightY; y++) {
      arr.push({
        type: "wall_segment",
        position: { x: pos.x, y, z: pos.z },
      });
    }
  }
  return arr;
}

function buildHouse(sizeX: number, sizeY: number, sizeZ: number) {
  return {
    roof: generateRoof(sizeX, sizeZ, sizeY),

    north: generateWallSide(sizeX, sizeY, { x: 0, z: 0 }, "x"),
    south: generateWallSide(sizeX, sizeY, { x: 0, z: sizeZ - 1 }, "x"),

    west: generateWallSide(sizeZ, sizeY, { x: 0, z: 0 }, "z"),
    east: generateWallSide(sizeZ, sizeY, { x: sizeX - 1, z: 0 }, "z"),
  };
}

// // Таймер
// console.time("houseBuild");
// const house = buildHouse(100, 100, 100);
// console.timeEnd("houseBuild");

// console.log("Количество элементов в доме:");
// console.log("Roof:", house.roof.length);
// console.log("North wall:", house.north.length);
// console.log("South wall:", house.south.length);
// console.log("West wall:", house.west.length);
// console.log("East wall:", house.east.length);

//console.dir(house, { depth: null, colors: true });
