/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */

class PowerPlant {
  constructor() {
    this.alive = true;
  }

  kill() {
    this.alive = false;
  }

  repair() {
    this.alive = true;
  }

  isAlive() {
    return this.alive;
  }
}

class Household {
  constructor() {
    this.connectedHouseholds = new Set();
    this.connectedPowerPlants = new Set();
  }

  connectToHousehold(household) {
    this.connectedHouseholds.add(household);
    household.connectedHouseholds.add(this);
  }

  connectToPowerPlant(powerPlant) {
    this.connectedPowerPlants.add(powerPlant);
  }

  disconnectFromPowerPlant(powerPlant) {
    this.connectedPowerPlants.delete(powerPlant);
  }

  hasElectricity(visited = new Set()) {
    if (visited.has(this)) {
      return false;
    }
    visited.add(this);

    for (let powerPlant of this.connectedPowerPlants) {
      if (powerPlant.isAlive()) {
        return true;
      }
    }

    for (let household of this.connectedHouseholds) {
      if (household.hasElectricity(visited)) {
        return true;
      }
    }

    return false;
  }
}

export class World {
  constructor() {
    this.powerPlants = new Set();
    this.households = new Set();
  }

  createPowerPlant() {
    const powerPlant = new PowerPlant();
    this.powerPlants.add(powerPlant);
    return powerPlant;
  }

  createHousehold() {
    const household = new Household();
    this.households.add(household);
    return household;
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
    household.connectToPowerPlant(powerPlant);
  }

  connectHouseholdToHousehold(household1, household2) {
    household1.connectToHousehold(household2);
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    household.disconnectFromPowerPlant(powerPlant);
  }

  killPowerPlant(powerPlant) {
    powerPlant.kill();
  }

  repairPowerPlant(powerPlant) {
    powerPlant.repair();
  }

  householdHasElectricity(household) {
    return household.hasElectricity();
  }

  getHouseholds() {
    return Array.from(this.households);
  }

  getPowerPlants() {
    return Array.from(this.powerPlants);
  }
}
