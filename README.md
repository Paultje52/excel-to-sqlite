# Excel-to-sqlite
Convert excel documents to sqlite!

# Dependencies
- [Sqlite3](http://npmjs.com/sqlite3): 5.0.0
- [Xlsx](https://npmjs.com/xlsx): 0.16.4

# Documentation / usage
> **Navigation**
- [Main](#Documentation-/-usage)
  - [Loading your excel](#Loading-Your-Excel)
  - [Sheet names](#Sheet-names)
  - [Read One Sheet](#Read-One-Sheet)
    - [Get sheet data](#Data)
    - [Save sheet to sqlite](#Save-sheet-to-SQLITE)
  - [Read All Sheets](#Read-All-Sheets)
    - [Get data of all sheets](#Read-All-Sheets)
    - [Save whole excel](#Saving-Whole-Excel)
  - [_xlsx](#_xlsx)

Firstly, load the package.
```js
const excelToSqlite = require("excel-to-sqlite");
```
The export of `excel-to-sqlite` is one function, with one parameter: `excelPath`.

## **Loading your excel**
The path must me absolute, like `__dirname`. This example uses `path`.
```js
const path = require("path");
let excelPath = path.join(__dirname, "test.xlsx"); // File "test.xlsx" in the current directory
let excel = excelToSqlite(excelPath);
```

## Sheet names
After you used the `excelToSqlite` function, you can use the property `sheets` to get a string array of all the sheet names.
```js
let sheets = excel.sheets;
console.log(sheets);
```

## Read One Sheet
To read one sheet, use the method `readSheet` afer you used the `excelToSqlite` function. It has one parameter: The name of the sheet.

> The name of the sheet is case-sensitive!

```js
let sheet = excel.readSheet("Sheet1"); // Read "Sheet1".
```

### Data
To get the data of the current sheet, use the property `data` on `sheet`.
```js
let data = sheet.data;
```
To get the json data, use the method `getJSON`.
```js
let json = sheet.getJSON();
```
### Output
```js
[
  Sheet1: [
    {column_1_name: "value", column_2_name: "value", ...},
    {column_1_name: "value", column_2_name: "value", ...}
  ]
]
```
### Save sheet to SQLITE
To save the current sheet to sqlite, use the `saveTo` method. It has one parameter: The name of the sqlite file.

> **Warning:** When saving to a database, a table with the same name as the current sheet will get **deleted**.

To change the name of the table in the sqlite database, set `sheet._name` to another string **before** calling the `saveTo` function.

This function returns a promise, that will be resolved with a database object of [`sqlite3`](https://github.com/mapbox/node-sqlite3/wiki/API#database).
```js
// Save without changing the name
sheet.saveTo("database.sqlite").then((database) => {
  console.log(`Sheet ${sheet._name} saved in "database.sqlite"!`);
});

// Change the name for the table and then save
sheet._name = "lol";
sheet.saveTo("database.sqlite").then((database) => {
  console.log(`Sheet ${sheet._name} saved in "database.sqlite"!`);
});
```

## Read All Sheets
To read all the sheets in an excel, use the `readAll` method.
```js
let sheets = excel.readAll();
```

### Data
To get all the data of all the sheets, use the property `data`. To convert your data to JSON, use the method `getJSON`.
```js
let data = sheets.data;
let json = sheets.getJSON();
```
> **Output:**
See [Output](#Output)

### Saving Whole Excel
To save the whole excel in sqlite, use the `saveTo` method. It has one parameter, the name of the database.

This function returns a promise, that will be resolved with a database object of [`sqlite3`](https://github.com/mapbox/node-sqlite3/wiki/API#database).

> **Warning:** When saving to a database, a table with the same name as a sheet will get **deleted**.

```js
sheets.saveTo("database.sqlite").then((database) => {
  console.log("Whole database saved in sqlite!");
});
```

## _xlsx
The property `_xlsx` is the output of [`xlsx.readFile`](https://docs.sheetjs.com/).