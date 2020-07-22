const Xlsx = require("xlsx");

const readSheet = require("./readSheet.js");
const readAll = require("./readAll.js");

// The main function
function excelToSqlite(file) {
  // Using "xlsx" to read the excel document
  let result = Xlsx.readFile(file);

  return {

    sheets: result.SheetNames, // An array of all the sheet names
    _xlsx: result, // The "xlsx" object

    // Function to read one sheet
    readSheet: readSheet,

    // Read all the sheets
    readAll: readAll

  };
}

module.exports = excelToSqlite;