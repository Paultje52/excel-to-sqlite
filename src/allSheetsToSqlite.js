const readSheet = require("./readSheet.js");
const waitUntil = require("./waitUntil.js");

// Export all sheets to sqlite
async function saveToSqlite(name) {
  // Make promise
  return new Promise((res) => {
    let done = 0;
    let database;
    let sheets = Object.keys(this.data);
    // Loop through al the sheets
    sheets.forEach(sheet => {
      if (typeof this.data[sheet] === "function") return done++;
      readSheet(sheet, this).saveTo(name).then((database) => {
        done++;
        database = database;
      });
    });
    // Wait until all the sheets are done
    waitUntil(() => done === sheets.length).then(() => {
      res(database);
    });
  });
}

// Export the function
module.exports = saveToSqlite;