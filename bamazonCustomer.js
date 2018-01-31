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
  	checkAndBuy2();
	connection.end();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    // define  
        var table = new Table({
            head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        });

        //
        console.log("Do you like what you see?: ");
        console.log("===========================================");

    // here we push data from the 'product' database table into the display table
    for (var i = 0; i < res.length; i++) {
    	table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log("-----------------------------------");
    console.log(table.toString());
  });


// The app should then prompt users with two messages.
 inquirer.prompt([{

            name: "itemId",
            type: "input",
            message: "See something you like? Just enter its ID! ",

            validate: function(value) {
                if (isNaN(value) == false) {
                 	return true;
                } else {
                    return false;
                }
            }
        }, {
            name: "Quantity",
            type: "input",
            message: "How many of this item would you like to buy?",

            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }

        }]).then(function(answer) {

            var chosenId = answer.itemId - 1

            var chosenProduct = res[chosenId]

            var chosenQuantity = answer.Quantity

            if (chosenQuantity < res[chosenId].StockQuantity) {

                console.log("Your total for " + "(" + answer.Quantity + ")" + " - " + res[chosenId].ProductName + " is: " + res[chosenId].Price.toFixed(2) * chosenQuantity);

                connection.query("UPDATE products SET ? WHERE ?", [{

                    StockQuantity: res[chosenId].StockQuantity - chosenQuantity

                }, {

                    id: res[chosenId].id

                }], function(err, res) {

                    //console.log(err);

                    checkAndBuy2();

                });



            } else {

                console.log("Sorry, insufficient Quanity at this time. All we have is " + res[chosenId].StockQuantity + " in our Inventory.");

                checkAndBuy2();


            }

        })

    })

}




// checkAndBuy2();




// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.



// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.




// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.







