// Returns "this.data" in JSON format
function getJSON() {
  return JSON.stringify(this.data); // Return the JSON string of "this.data"
}

// Export the function
module.exports = getJSON;