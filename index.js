/**
 * Debugging Guide
 * 1. Make the code more readable
 * 2. Pick up calculation errors
 * 3. Make these calculations robust such that the calculation does not give an incorrect result, it throws an error to the user if something has gone wrong (parameter used with an incorrect unit of measurement, etc)
 */

// Given Parameters
const initialVelocityKmH = 10000; // velocity (km/h)
const accelerationMPS2 = 3; // acceleration (m/s^2)
const timeInSeconds = 3600; // seconds (1 hour)
const initialDistanceKm = 0; // distance (km)
const initialFuelKg = 5000; // remaining fuel (kg)
const fuelBurnRateKgPerS = 0.5; // fuel burn rate (kg/s)

//Convert velocity in km/h to m/s

const convertVelocityToMS = (velocityKmH) => {
  return (velocityKmH * 1000) / 3600; //Times 1000 to get from km to metres, divided by 3600 seconds in an hour.
};

//Convert velocity in m/s to km/h

const convertVelocityToKmH = (velocityMS) => {
  return (velocityMS * 3600) / 1000;
};

const calcNewVelocity = (
  initialVelocityKmH,
  accelerationMPS2,
  timeInSeconds
) => {
  //Convert velocity from KM/H to M/S
  const initialVelocityMS = convertVelocityToMS(initialVelocityKmH);

  //Calculate new velocity in m/s using the formula provided: v = u + at
  const newVelocityMS = initialVelocityMS + accelerationMPS2 * timeInSeconds;

  //Convert the new velocity back to km/h
  return convertVelocityToKmH(newVelocityMS);
};

const calcNewDistance = (initialDistanceKm, velocityKmH, timeInSeconds) => {
  if (
    typeof velocityKmH !== "number" ||
    typeof timeInSeconds !== "number" ||
    timeInSeconds < 0
  ) {
    throw new Error(
      "Invalid input: Velocity and time should be positive numbers!"
    );
  }
  //Divide time in seconds by 3600 to return value to Km/H
  return initialDistanceKm + velocityKmH * (timeInSeconds / 3600);
};

const calcRemainingFuel = (
  fuelBurnRateKgPerS,
  timeInSeconds,
  initialFuelKg
) => {
  if (
    typeof fuelBurnRateKgPerS !== "number" ||
    typeof timeInSeconds !== "number" ||
    timeInSeconds < 0
  ) {
    throw new Error(
      "Invalid Input: Fuel burn rate and time should be positive numbers!"
    );
  }

  const fuelUsedInKg = fuelBurnRateKgPerS * timeInSeconds;
  return Math.max(0, initialFuelKg - fuelUsedInKg);
};

const newDistance = calcNewDistance(
  initialDistanceKm,
  initialVelocityKmH,
  timeInSeconds
); //calcultes new distance
const remainingFuel = calcRemainingFuel(
  fuelBurnRateKgPerS,
  timeInSeconds,
  initialFuelKg
); //calculates remaining fuel
const newVelocity = calcNewVelocity(
  initialVelocityKmH,
  accelerationMPS2,
  timeInSeconds
); //calculates new velocity based on acceleration

console.log(`Corrected New Velocity: ${newVelocity.toFixed(2)} km/h`);
console.log(`Corrected New Distance: ${newDistance.toFixed(2)} km`);
console.log(`Corrected Remaining Fuel: ${remainingFuel.toFixed(2)} kg`);
