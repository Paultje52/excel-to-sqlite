const openDB = require("./openDB.js");
const waitUntil = require("./waitUntil.js");

// Save to SQLITE function
async function saveToSqlite(name) {
  let database = await openDB(name); // Get the sqlite3 database object
  // Define data types
  let dataTypes = [];
  this.data.forEach(data => {
    for (let name in data) {
      if (!dataTypes.includes(`'${name}' TEXT DEFAULT ''`)) dataTypes.push(`'${name}' TEXT DEFAULT ''`);
    }
  });
  // Return promise and execute database query
  return new Promise((res) => {
    // Remove a table with the same name as the sheet
    database.all(`DROP TABLE IF EXISTS ${this._name}`, (e) => {
      if (e) throw new Error(`Drop table error: ${e}`);
      // Create the table with the datatypes
      database.all(`CREATE TABLE IF NOT EXISTS ${this._name} (${dataTypes.join(", ")})`, (e) => {
        if (e) throw new Error(`Create table error: ${e}`);
        // Insert data
        let done = 0;
        this.data.forEach((row) => {
          let values = [];
          let rowNames = [];
          for (let i in row) {
            values.push(row[i]);
            rowNames.push(i);
          }
          database.all(`INSERT INTO ${this._name} ('${rowNames.join("', '")}') VALUES ('${values.join("', '")}')`, (e) => {
            if (e) throw new Error(`Insert error:  ${e}`);
            done++;
          });
        });
        // Interval until everything is inserted
        waitUntil(() => this.data.length === done).then(() => {
          res(database);
        });
      });
    });
  });
}

// Export the function
module.exports = saveToSqlite;