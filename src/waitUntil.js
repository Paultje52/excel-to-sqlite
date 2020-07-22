// The wait until function
function waitUntil(testFunction) {
  if (typeof testFunction !== "function") throw new Error("Wait until test function needs to be a function!");
  return new Promise((res) => {
    let i = setInterval(() => { // The interval for checking
      if (!testFunction()) return;
      clearInterval(i);
      res();
    });
  });
}

// Export the function
module.exports = waitUntil;