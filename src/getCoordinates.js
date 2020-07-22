// Getting the coordinates of each cell
function getCoordinates(cellName) {
  // Defining variables
  let letter = "";
  let number = "";
  let alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Looping thrue each character 
  cellName.split("").forEach(i => {
    if (alphabet.includes(i.toLowerCase())) letter += i;
    else number += i;
  });

  // Returning the value
  return {
    letter: letter,
    number: Number(number) // Make the number a number type
  };
};

// Export the function
module.exports = getCoordinates;