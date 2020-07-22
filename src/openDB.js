const sqlite3 = require("sqlite3");
const waitUntil = require("./waitUntil");

// Function for opening a sqlite database
function openDB(name) {
  return new Promise((res) => {
    let database = new sqlite3.Database(name); // Getting the Database
    // Resolve promise on database open
    waitUntil(() => database.open).then(() => {
      res(database);
    });
  });
}

// Export the function
module.exports = openDB;