// list of requirements

var mysql = require("mysql");
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

// connect to database and console log connection id
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  	readProducts();
	// connection.end();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    // define  
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


function productSearch() {
  inquirer.prompt([
    {
      name: "item_id",
      type: "choices",
      message: "Welcome to Bamazon! What is the id of the product you would like to buy?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log("Please enter a item ID!");
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
        console.log("Please enter a item ID!");
        return false;
      }
    }
  ]).then(function (answers) {
    //variables that stores user inputs from question prompt
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
          var total = (answers.stock * price);
          console.log(`Thanks for purchasing! Your total is $${total}`);
          connection.query(queryUpdate, [{ stock_quantity: quantity }, { item_id: id }], function (err) {
            if (err) throw err;
          })
        } else {
          console.log("Insufficient quantity!");
          productSearch();
        }
      })
    }
  })
}







// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.



// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.




// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.







