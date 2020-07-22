const excelToSqlite = require("../");

// The excel path
const path = require("path");
let excelPath = path.join(__dirname, "test.xlsx");

// Reading the excel file
let excel;
try {
  excel = excelToSqlite(excelPath);
} catch(e) {
  throw new Error("Excel file \"test.xlsx\" not found, please create one!");
}

// The sheets
let sheets = excel.sheets;
console.log(`${sheets.length} sheet(s) found: ${sheets.join(", ")}`);

// Save one sheet
let sheet = sheets[0];
let sheetObject = excel.readSheet(sheet);
sheetObject._name = "lol"; // Save as the table name "lol".
sheetObject.saveTo(`${sheet}.sqlite`).then((_database) => {
  // _database > The sqlite3 database object
  console.log(`Sheet ${sheet} saved to "${sheet}.sqlite"!`);
});

// Save all sheets
excel.readAll().saveTo("test.sqlite").then((_database) => {
  // _database > The sqlite3 database object
  console.log(`All ${sheets.length} sheet(s) saved to "test.sqlite"!`);
});