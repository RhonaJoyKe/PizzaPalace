// Animate welcome text once page has been loaded
jQuery(document).ready(function() {
    $('#next-step').click(function() {
        $("#delivery").show();
       
  
    })
    // $('#next-step').click(function() {
    //     $("#delivery").hide();
  
    //  } )
    $("#pickup").click(function () {
        alert('Enjoy your Pizza and come back !')
    })
    $("#delivery1").click(function(){
            $(".data-overlay").show();

    })
        $("#submit").click( function () {
            let userName =document.getElementById("name").value
            let number=document.getElementById("num").value
            let location=document.getElementById("location").value
             
              if(userName===null||userName===""){
              alert("Please Write your Name")
              }
              else if(number===""||number===null){
                alert("Please write your Number")
             }
              else if (location===""||location===null){
              alert("Please write your location")
              }
              else if(location!="" && number !="" && userName !=""){
                alert(`${userName} Your Order will be delivered to your location once you check out`)
              }
               })  
        $("#check-out").click(function(){

        })

        
        });
    
   
window.onload = (event) => {
    animateWelcomeText();
    setUpActionListeners();
   
  };
  
  var i = 0;
  var txt = 'HELLO WELCOME TO FELICE PIZZA PLACE EVERY  DAY IS A GOOD DAY FOR SOME PIZZA!';
  
  // Speed in milliseconds
  var speed = 300;
  
  function animateWelcomeText() {
    if (i < txt.length) {
      document.getElementById("welcome").innerHTML += txt.charAt(i);
      i++;
      setTimeout(animateWelcomeText, speed);
    } else {
      document.getElementById("welcome").innerHTML = "";
      i = 0;
      setTimeout(animateWelcomeText, speed);
    }
  }
  const pizzaSizes = [
    {
        size: "small",
        price: 600,
    },
    {
        size: "medium",
        price: 800,
    },
    {
        size: "large",
        price: 1000,
    },
];

// pizza crusts
const pizzaCrusts = [
    {
        name: "crispy",
        price: 100,
    },
    {
        name: "stuffed",
        price: 150,
    },
    {
        name: "Glutten free",
        price: 200,
    },
];

// Pizza type names
const listOfPizzaTypeNames = [
    "Not selected",
    "Cheeseburger",
    "Meet Deluxe",
    "Chicken Hawaaian",
    "Chicken Bacon BBQ",
    "Chicken & Beef Pepperoni",
    "Veg Feast"
]
// Pizza toppings names
const listOfPizzaToppingsNames = [
    "Not known",
    "Pepperoni",
    "Mushrooms",
    "Onions",
    "Sausage",
    "Bacon"
]
// Map of topping prices by size
const mapOfPizzaToppingPrices = new Map()
mapOfPizzaToppingPrices.set(0, 0)
mapOfPizzaToppingPrices.set(1, 50)
mapOfPizzaToppingPrices.set(2, 100)
mapOfPizzaToppingPrices.set(3, 150)

const listOfPizzaSizeNames = [
    "Not selected",
    "Small",
    "Medium",
    "Large"
]
// Map of pizza size prices
const mapOfPizzaSizePrices = new Map()
mapOfPizzaSizePrices.set(0, 0)
mapOfPizzaSizePrices.set(1, 600)
mapOfPizzaSizePrices.set(2, 800)
mapOfPizzaSizePrices.set(3, 1000)

const listOfPizzaCrustNames = [
    "Crust not selected",
    "Crispy",
    "Stuffed",
    "Gluten-free"
];
// Map of pizza crust prices
const mapOfPizzaCrustPrices = new Map()
mapOfPizzaCrustPrices.set(0, 0)
mapOfPizzaCrustPrices.set(1, 100)
mapOfPizzaCrustPrices.set(2, 150)
mapOfPizzaCrustPrices.set(3, 200)

// Declare class for a PizzaOrder
class PizzaOrder { // Naming conventions
    constructor (pizzaType, pizzaSize, pizzaCrust, quantity, toppings) {
        this.pizzaType = pizzaType;
        this.pizzaSize = pizzaSize;
        this.pizzaCrust = pizzaCrust;
        this.quantity = quantity;
        this.toppings = toppings;
    }
    calculatePrice() {
        // Get the price of the selected pizza size
        let sizePrice = mapOfPizzaSizePrices.get(this.pizzaSize);
    
        // Get the price of the selected pizza crust
        let crustPrice = mapOfPizzaCrustPrices.get(this.pizzaCrust);

        // Get price of each topping based on pizza size
        let unitToppingPrice
        switch(this.pizzaSize) {
            case 1:
                unitToppingPrice = mapOfPizzaToppingPrices.get(1)
                break;
            case 2:
                unitToppingPrice = mapOfPizzaToppingPrices.get(2)
                break;
            case 3:
                unitToppingPrice = mapOfPizzaToppingPrices.get(3)
                break;
            default:
                unitToppingPrice = mapOfPizzaToppingPrices.get(0)
                break;
        }
// Calculate price of all toppings
let totalToppingsPrice = unitToppingPrice * this.toppings.length
    
// Calculate total price
let total = (parseInt(sizePrice) + parseInt(crustPrice) + parseInt(totalToppingsPrice)) * this.quantity;

return total.toLocaleString('en-US', {maximumFractionDigits: 0});
}
}
// Declare array to save pizza orders
let cartList = []

// Create instance of PizzaOrder class
let currentOrder = new PizzaOrder(
    0,
    0,
    0,
    1,
    []
);
// Action listeners > Validator > Add to cart

function setUpActionListeners(){
    // Set current quantity to 1
    updateQuantity()

    // Set current order total to zero
    updateTotal()

    // Hide/show pizza toppings selection
    let toppingsDiv = document.getElementById("toppings-div")
    toppingsDiv.style.display = 'none'

    let pizzaTypePicker = document.getElementById("pizza-type")
    pizzaTypePicker.addEventListener("change", () => {
        let value = pizzaTypePicker.value

        // Update value on class
        currentOrder.pizzaType = parseInt(value)

        updateTotal()
    });
    let pizzaSizePicker = document.getElementById("pizza-size")
    pizzaSizePicker.addEventListener("change", () => {
        let value = pizzaSizePicker.value

        // Update value on class
        currentOrder.pizzaSize = parseInt(value)

        // console.log(value);

        updateTotal()
         // Only show if size is selected
         if (value != 0) {
            toppingsDiv.style.display = 'block'
        } else {
            toppingsDiv.style.display = 'none'
        }
    });

        let pizzaCrustPicker = document.getElementById("pizza-crust")
        pizzaCrustPicker.addEventListener("change", () => {
            let value = pizzaCrustPicker.value
    
            // Update value on class
            currentOrder.pizzaCrust = parseInt(value)
    
            updateTotal()
        });

    let inputs = document.querySelectorAll("input[type='checkbox']")
    
    // Iterate through all checkboxes adding event listeners
    for(let i = 0; i < inputs.length; i++) {
        let currentCheckbox = inputs[i]

        currentCheckbox.addEventListener('change', function() {
            if (this.checked) {
                currentOrder.toppings.push(currentCheckbox.value)
            } else {
                // Get index of the topping index
                // Array.indexOf(value)
                let indexOfTopping = currentOrder.toppings.indexOf(currentCheckbox.value)

                // Remove the element from our toppings list
                currentOrder.toppings.splice(indexOfTopping, 1)
            }

            updateTotal()
        });
    }
    let btnAddQuantity = document.getElementById("add-quantity")
    btnAddQuantity.addEventListener("click", function() {
        currentOrder.quantity = currentOrder.quantity + 1

        updateQuantity()

        updateTotal()
    });

    let btnSubtractQuantity = document.getElementById("subtract-quantity")
    btnSubtractQuantity.addEventListener("click", function() {
        if (currentOrder.quantity > 1) {
            currentOrder.quantity = currentOrder.quantity - 1
        }

        updateQuantity()

        updateTotal()
    });

    let btnAddToCart = document.getElementById("add-to-cart")
    btnAddToCart.addEventListener("click", function() {
        validateValues()
    });
}
    function updateQuantity(){
        let currentQuantity = document.getElementById("quantity")
    
        currentQuantity.innerHTML = currentOrder.quantity
    }
    
    function updateTotal(){
        let currentOrderPrice = document.getElementById("pizza-total")
    
        currentOrderPrice.innerHTML = `Pizza Total: Ksh. ${currentOrder.calculatePrice()}`
    }
    function validateValues(){
        if (currentOrder.pizzaType != 0) {
            if (currentOrder.pizzaSize != 0) {
                if (currentOrder.pizzaCrust != 0) {
                    addToCart()
                } else {
                    alert("Please select your preferred crust")
                }
            } else {
                alert("Please select the size of the pizza you want")
            }
        } else {
            alert("Please select a pizza type")
        }
    }
    function addToCart(){
        // Get table as DOM element
        let ordersTable = document.getElementById("orders-table")
    
        // Create new row
        let tableRow = document.createElement('tr');
    
        // Create columns
        let colNo = document.createElement('th');
        colNo.setAttribute("scope", "row");
        colNo.innerHTML = cartList.length + 1
    
        let colPizzaType = document.createElement('td')
        colPizzaType.innerHTML = listOfPizzaTypeNames[currentOrder.pizzaType]
    
        let colPizzaSize = document.createElement('td')
        colPizzaSize.innerHTML = listOfPizzaSizeNames[currentOrder.pizzaSize]
    
        let colPizzaCrust = document.createElement('td')
        colPizzaCrust.innerHTML = listOfPizzaCrustNames[currentOrder.pizzaCrust]
    
        let toppingsString = ""
        // Iterate through all toppings in the order to get their names
        currentOrder.toppings.map(value => {
            let toppingName = listOfPizzaToppingsNames[value]
    
            // Ternary operator
            // Syntax: (condition) ? option-if-yes : option-if-no
            toppingsString += toppingsString.length == 0 ? toppingName : `, ${toppingName}`
        })
    
        let colPizzaToppings = document.createElement('td')
        colPizzaToppings.innerHTML = toppingsString;
    
        let colPizzaQuantity = document.createElement('td')
        colPizzaQuantity.innerHTML = currentOrder.quantity
    
        let colPizzaTotal = document.createElement('td')
        colPizzaTotal.innerHTML = currentOrder.calculatePrice()
    
        tableRow.append(colNo, colPizzaType, colPizzaSize, colPizzaCrust, colPizzaToppings, colPizzaQuantity, colPizzaTotal)
    
        ordersTable.append(tableRow)
    
        // Add current order to cart and clear data
        cartList.push(currentOrder)
       
    
    }
    
   
