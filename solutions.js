const carMarket = require("./obj.js");


//Search for a car agency by its name or ID
carMarket.searchForAgency = function(nameOrId){
    for(let i=0; i<this.sellers.length; i++){
        if(this.sellers[i].agencyName === nameOrId){
            console.log('agency exist');
            return i;
        }
        if(this.sellers[i].agencyId === nameOrId){
            console.log('agency exist');
            return i;
        }
        
    }
    console.log('agency does not exist')
}


//Retrieve all agencies' names.
carMarket.allAgencys = function(){
    const arr = this.sellers.map(agency => {return agency.agencyName});
    console.log(arr);
    return arr;
}

//Add a new car to an agency's inventory.
//brand sholud be a property in the car object
carMarket.addNewCToAgency = function(carObj,agencyNameOrId){
    const agency = carMarket.searchForAgency(agencyNameOrId);
    carObj['ownerId'] = this.sellers[agency].agencyId;
    for(let i=0; i<this.sellers[agency].cars.length; i++){
        if(this.sellers[agency].cars[i].brand === carObj.brand){
            delete carObj.brand;
            this.sellers[agency].cars[i].models.push(carObj);
            return;
        }
    }
    const brand1 = carObj.brand;
    delete carObj.brand;
    this.sellers[agency].cars.push({
        brand : brand1,
        models : [carObj]
    })
    carMarket.changeCashCredit(agencyNameOrId,carObj.price,'-',cash);
}

// let carobj1 =               {
//     brand: "bmw",
//     name: "3",
//     year: 2010,
//     price: 137000,
//     carNumber: "AZJZ4",
//   }

  //Remove a car from an agency's inventory.
  carMarket.removeCarFromAgency = function(carNumber,agencyNameOrId,brand){
    let carObj;
    let price;
    let brandinA = carMarket.sellers[carMarket.searchForAgency(agencyNameOrId)].cars.find(element => element.brand === brand);
    brandinA.models.forEach(function(car, index, object) {
        if(car.carNumber === carNumber){
            carObj = car;
            price = car.price;
            object.splice(index,1);
        }
    })
    carMarket.changeCashCredit(agencyNameOrId,price,'+','cash');
    carObj.brand = brand;
    return carObj; 
  }


//   const arr = [{he : 'ksjdfh', hee: 1}]
//   let som = arr.find(element => element.hee ===1);
//   console.log(som);
//   som.hee = 3;
//   delete som;
//   console.log(som);
//   console.log(arr);


//Change the cash or credit of an agency.
carMarket.changeCashCredit = function(agency, amount, operator, cashOrCredit){
    let chosenAgency = carMarket.searchForAgency(agency);
    if(operator === '+'){
        if(cashOrCredit === 'cash'){
        carMarket.sellers[chosenAgency].cash += amount;
        } else{
            carMarket.sellers[chosenAgency].credit += amount;
        } 
    } else {
        if(cashOrCredit === 'cash'){
            carMarket.sellers[chosenAgency].cash -= amount;
            } else{
                carMarket.sellers[chosenAgency].credit -= amount;
            }
    }
    console.log(`${operator}${amount} difference in your account`);
}
// carMarket.changeCashCredit("Best Deal", 190000, '-', 'cash');
// console.log(carMarket.sellers[0].cash);


//Update the price of a specific car in an agency
carMarket.updateCarPrice = function(carNumber,agencyNameOrId,brand, newPrice){
    let brandinA = carMarket.sellers[carMarket.searchForAgency(agencyNameOrId)].cars.find(element => element.brand === brand);
    brandinA.models.forEach(car => {
        if(car.carNumber === carNumber){
            car.price = newPrice;
        }
    })
  }
//   carMarket.updateCarPrice("AZJZ4","Best Deal",'bmw', 3);
//   console.log(carMarket.sellers[0].cars[0])


//Calculate and return the total revenue for a specific agency
carMarket.getTotalAgencyRevenue = function(agencyNameOrId){

}


//Transfer a car from one agency to another
carMarket.transferCar = function(agency1,agency2,carNumber, brand){
    let theCar = carMarket.removeCarFromAgency(carNumber,agency1,brand);
    carMarket.addNewCToAgency(theCar,agency2);
}
// carMarket.transferCar("Best Deal","The Auto World","AZJZ4",'bmw');
//   console.log(carMarket.sellers[0].cars[0]);
//   console.log(carMarket.sellers[2].cars[0]);
//   console.log(carMarket.searchForAgency("The Auto World"))

//Search for a customer by their name or ID.
carMarket.searchCustomer = function(nameOrId){
    for(let i=0; i<this.customers.length; i++){
        if(this.customers[i].name === nameOrId){
            console.log('customer exist');
            return i;
        }
        if(this.customers[i].id === nameOrId){
            console.log('customer exist');
            return i;
        }
        
    }
    console.log('customer does not exist');
}
// console.log(carMarket.searchCustomer("Aleksander Carr"));

//Retrieve all customers' names.
carMarket.allCustomers = function(){
    const arr = this.customers.map(customer => {return customer.agencyName});
    console.log(arr);
    return arr;
}

//Change the cash of a customer.
carMarket.changeCashOfCustomer = function(nameOrId,amount,operator){
    let chosenCustomer = carMarket.searchCustomer(nameOrId);
    if(operator === '+'){
        carMarket.customers[chosenCustomer].cash += amount;
        } else{
            carMarket.customers[chosenCustomer].cash -= amount;
        }
    console.log(`${operator}${amount} difference in your account`);
}

// carMarket.changeCashOfCustomer("Aleksander Carr",50000,'+');
// console.log(carMarket.customers[2]);

//Calculate the total value of all cars owned by a specific customer
carMarket.getCustomerTotalCarValue = function(nameOrId){
    let chosenCustomer = carMarket.searchCustomer(nameOrId);
    let sum=0;
    carMarket.customers[chosenCustomer].cars.forEach(car => sum += car.price)
    console.log(sum);
    return sum;
}
// console.log(carMarket.getCustomerTotalCarValue("Bob Steel"));

//Retrieve all cars available for purchase.
carMarket.allCars = function(){
    let arr = [];
    for(let i = 0; i < this.sellers.length; i++){
     arr.push(this.sellers[i].cars.map( element =>{
        let arr1 = element.models.map(car =>{
            car.brand = element.brand;
            return car;
        })
        return arr1;
     }))    
    }
    const merge = arr.flat(2);
    return merge;
}

// const arr1 = carMarket.allCars();
// console.log(arr1);

//Search for cars based on certain criteria. The search parameters should include the
// production year, price, and optionally, the brand of the car.
carMarket.searchForCar = function(year,price,brand){
    let arr = carMarket.allCars();
    if(brand !== ''){
        return arr.filter(car => {
            if(car.price === price && car.year === year && car.brand === brand){
                console.log('exist');
                return car;
            }
        })  
    } else {
        return arr.filter(car => {
            if(car.price === price && car.year === year){
                console.log('exist');
                return car;
            }
        })
    }
}

//Return the most expensive car available for sale
carMarket.getMostExpensiveCar = function(){
    let allcars = carMarket.allCars();
    allcars.sort(function(a,b) {
        if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          return 0;
    })
    return allcars[allcars.length-1];
}

// let car = carMarket.getMostExpensiveCar();
// console.log(car);

//Return the cheapest car available for sale
carMarket.getCheapestCar = function(){
    let allcars = carMarket.allCars();
    allcars.sort(function(a,b) {
        if (a.price > b.price) {
            return -1;
          }
          if (a.price < b.price) {
            return 1;
          }
          return 0;
    })
    return allcars[allcars.length-1];
}
// let car = carMarket.getCheapestCar();
// console.log(car);


//Implement a sellCar function that sells a car to a specific customer
carMarket.sellCar = function(agency,carNumber, customer) {
    let agency1 = carMarket.searchForAgency(agency);
    let theCar = carMarket.allCars().find(car => car.carNumber === carNumber);
    let customer1 = carMarket.searchCustomer(customer);
    if(theCar === undefined){
        return console.log('car doesnt exist in the market');
    }
    if(theCar.ownerId !== carMarket.sellers[agency1].agencyId){
        return console.log('the agency doesnt own the car');
    }
    if(theCar.price > carMarket.customers[customer1].cash){
        return console.log('customer doesnt have enough money to buy the car :(');
    }
    carMarket.removeCarFromAgency(carNumber,agency,theCar.brand);
    carMarket.customers[customer1].cars.push(theCar);
    carMarket.changeCashOfCustomer(customer,theCar.price,'-');
    carMarket.taxesAuthority.numberOfTransactions += 1;
    carMarket.taxesAuthority.sumOfAllTransactions += theCar.price;
    console.log('successful sell');
}

carMarket.sellCar("Best Deal","AZJZ4","Will Reyes");


