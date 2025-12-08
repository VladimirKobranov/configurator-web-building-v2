onmessage = async (event) => {
  const { payload } = event.data;

  await new Promise((resolve) => setTimeout(resolve, 2000)); // for tests

  console.log("worker: ", payload);
};
