<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="checkElectricity">Check Electricity</button>
    <button @click="togglePowerPlant">Toggle Power Plant Status</button>
    <div class="grid" >
      <div class="household">
      <div v-for="(household, index) in households" :key="'household-' + index" class="household-item">
        <div :class="['node', household.hasElectricity ? 'electric' : '']">Household {{ index  }}</div>
      </div>
      </div>
      <div class="powerPlant">
      <div v-for="(powerPlant, index) in powerPlants" :key="'powerPlant-' + index" class="powerPlant-item">
        <div :class="['node', powerPlant.isAlive() ? 'alive' : 'dead']">Power Plant {{ index  }}</div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { World } from '../world.js';

export default {
  data() {
    return {
      message: 'Electricity Network',
      world: new World(),
      households: [],
      powerPlants: [],
    };
  },
  created() {
    this.initializeNetwork();
  },
  methods: {
    initializeNetwork() {
      const powerPlant = this.world.createPowerPlant();
      const powerPlant1 = this.world.createPowerPlant();
      const household = this.world.createHousehold();
      const household1 = this.world.createHousehold();
      const household2 = this.world.createHousehold();
      this.world.connectHouseholdToPowerPlant(household, powerPlant);
      this.world.connectHouseholdToPowerPlant(household1, powerPlant1, powerPlant);
      this.world.connectHouseholdToHousehold(household1, household2);

      this.updateNetwork();
    },
    updateNetwork() {
      this.households = this.world.getHouseholds().map(household => ({
        ...household,
        hasElectricity: this.world.householdHasElectricity(household),
      }));
      this.powerPlants = this.world.getPowerPlants();
    },
    checkElectricity() {
      this.updateNetwork();
    },
    togglePowerPlant() {
      const powerPlant = this.powerPlants[0];
      if (powerPlant.isAlive()) {
        this.world.killPowerPlant(powerPlant);
      } else {
        this.world.repairPowerPlant(powerPlant);
      }
      this.updateNetwork();
    }
  }
};
</script>

<style>
.grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction:column;
}
.node {
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  margin: 10px;
  border-radius: 5px;
}
.household {
  display: inline-flex;
}
.powerPlant {
  display: inline-flex;
}

.electric {
  background-color: yellow;
}
.alive {
  background-color: lightgreen;
}
.dead {
  background-color: lightcoral;
}
button {
  padding: 10px;
  border-radius: 15px;
  margin:10px;
}
</style>
