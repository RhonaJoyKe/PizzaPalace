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

//toppings
const pizzaToppings = ["Pepperoni","Mushrooms", "Onions", "Sausage","Bacon"];

const pizzas = [
    { name: "Cheese Burger" },
    { name: "Meat Deluxe" },
    { name: "Chicken Hawaiian" },
    { name: "Chicken Macon BBQ" },
    { name: "Chicken & Beef Pepperoni" },
    { name: "Veg Feast" },
];