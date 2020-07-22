const getCoordinates = require("./getCoordinates.js");
const sheetToSqlite = require("./sheetToSqlite.js");
const getJSON = require("./getJSON.js");

// Read a sheet function
function readSheet(sheetName, parent = this) {
  // console.log(Object.keys(this));
  let sheet = parent._xlsx.Sheets[sheetName]; // Get the sheet information from xlsx

  // Looping through all the objects
  let data = [];
  let dataKeys = {};
  for (let i in sheet) {
    if (i.startsWith("!")) continue; // Don't need unnecessary data
    let coordinates = getCoordinates(i); // Get the Coordinates
    let value = sheet[i].v; // Get the value of the cell
    if (coordinates.number === 1) dataKeys[coordinates.letter] = value; // First row define the names
    else { // Other rows are the data
      if (!data[coordinates.number-2]) data[coordinates.number-2] = {};
      data[coordinates.number-2][dataKeys[coordinates.letter]] = value;
    }
  }

  // Returning the result
  return {
    data: data, // The data itself
    getJSON: getJSON, // The function to get a JSON object of the data
    saveTo: sheetToSqlite, // The saveToSqlite function
    _name: sheetName // The name of the sheet
  };
}

// Export the function
module.exports = readSheet;