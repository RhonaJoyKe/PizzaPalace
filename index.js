// Animate welcome text once page has been loaded
window.onload = (event) => {
    animateWelcomeText();
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
const listOfPizzaSizeNames = [
    "Not selected",
    "Small",
    "Medium",
    "Large"
]
const listOfPizzaCrustNames = [
    "Crust not selected",
    "Crispy",
    "Stuffed",
    "Gluten-free"
];
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
