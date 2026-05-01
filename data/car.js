class Car {
  brand;
  model;
  speed = 0;
  // The trunk starts closed. false means closed, true means open.
  isTrunkOpen = false;

  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }
  displayInfo() {
    // If isTrunkOpen is true, trunkStatus is "open"; otherwise, it is "closed".
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";
    console.log(`Brand :${this.brand} 
Model: ${this.model}
Speed: ${this.speed} km/h
Trunk: ${trunkStatus}`);
  }

  go() {
    // The car can only speed up while the trunk is closed.
    if(!this.isTrunkOpen) {
      this.speed += 5;
    }

    if (this.speed > 200) {
      this.speed = 200;
    }
  }

  brake() {
    this.speed -= 5;

    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  openTrunk() {
    // The trunk can only open when the car is fully stopped.
    if(this.speed === 0) {
      this.isTrunkOpen = true
    }
  }

  closeTrunk() {
    // Closing the trunk changes isTrunkOpen back to false.
    this.isTrunkOpen = false
  }
}

const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
});

const car2 = new Car({
  brand: "Tesla",
  model: "Model 3",
});

car1.go()
car1.brake()
car1.openTrunk()
car1.closeTrunk()
car1.displayInfo();
car2.displayInfo();
