const allSheetsToSqlite = require("./allSheetsToSqlite.js");
const getJSON = require("./getJSON.js");

// Function to read all the excel sheets
function readAll() {
  let sheets = {};
  for (let sheet of this.sheets) {
    sheets[sheet] = this.readSheet(sheet).data;
  }

  return {
    data: sheets, // The Object with all the sheets
    getJSON: getJSON, // Convert the data to json
    saveTo: allSheetsToSqlite, // Save the data
    _xlsx: this._xlsx // The xlsx object
  }
}

// Export the function
module.exports = readAll;