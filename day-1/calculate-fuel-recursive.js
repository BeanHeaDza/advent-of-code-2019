const calculateFuel = require("./calculate-fuel");

module.exports = function(mass) {
  let totalFuel = Math.floor(mass / 3) - 2;
  let fuelFuel = calculateFuel(totalFuel);
  while (fuelFuel > 0) {
    totalFuel += fuelFuel;
    fuelFuel = calculateFuel(fuelFuel);
  }
  return totalFuel;
};
