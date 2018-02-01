// Challenge #1: Customer View (Minimum Requirement)

// Create a MySQL Database called bamazon.
// Then create a Table inside of that database called products.
// The products table should have each of the following columns:

// item_id (unique id for each product)
// product_name (Name of product)
// department_name
// price (cost to customer)
// stock_quantity (how much of the product is available in stores)

// Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

// ============================================================================================================

// list of requirements

var mysql = require("mysql");
var connection = require('./dbConnect.js');
var inquirer = require('inquirer');
var Table = require('cli-table');

// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "",
//   database: "bamazon"
// });

// connect to database and console log connection id
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  	readProducts();
});

	
function readProducts() {
  console.log("Selecting all Bamazon products...\n");
  connection.query("SELECT * FROM products ORDER BY department_name", function(err, res) {
// define a new table which will display the results of our database query
        var table = new Table({
            head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        });
        console.log("===========================================");

// here we push data from the 'product' database table into the display table
    for (var i = 0; i < res.length; i++) {
    	table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log("-----------------------------------");
    console.log(table.toString());
	productSearch();
  });

}


// let's use inquirer to ask for the ID of the product the customer would like to buy.
function productSearch() {
  inquirer.prompt([
    {
      name: "item_id",
      type: "choices",
      message: "Welcome to Bamazon. Enter the ID of the product you would like to purchase.",
      validate: function (value) {
        if (isNaN(value) === false) {
        	return true;
        	}
        	console.log("Don't forget the ID!");
        	return false;
      	}
    },
    {
      name: "stock",
      type: "input",
      message: "Enter the quantity.",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log("How many would you like?");
        return false;
      }
    }
  ]).then(function (answers) {
    //define local variables to store input values from prompts
    let id = answers.item_id;
    let qty = answers.stock;
    updateStock();
    //connects to database and updates stock_quantity when user purchases items
    function updateStock() {
      var query = "SELECT * FROM products WHERE ?";
      var queryUpdate = "UPDATE products SET ? WHERE ?";
      connection.query(query, { item_id: id }, function (err, res) {
      	// console.log(res);
        var price = res[0].price;
        var quantity = res[0].stock_quantity;
        if (quantity >= answers.stock) {
          quantity = quantity - answers.stock;
          console.log(`${quantity} remaining.`);
        // this will display the total price of purchased items
          var total = (answers.stock * price);
          console.log(`Thanks for shopping! Your total is $${total}`);
          promptAction();
          connection.query(queryUpdate, [{ stock_quantity: quantity }, { item_id: id }], function (err) {
            if (err) throw err;
          })
        } else {
          console.log("Insufficient Quantity!");
          productSearch();
        }
      })
    }
  })

}

function promptAction() {
  inquirer.prompt([{
    type: 'list',
    message: 'Choose an option.',
    choices: ['continue shopping', 'exit bamazon'],
    name: "action"
  }, ]).then(function(selection) {
    switch (selection.action) {
		case 'Continue Shopping':
		readProducts();
		break;

		case 'Exit Bamazon':
		process.exit();
		break;       


    }
  }).catch(function(error) {
    throw error;
  });
};









