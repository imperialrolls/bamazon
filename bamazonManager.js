// Running this application will:


// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.




// here we list the required files and libraries need

var mysql = require('mysql');
var connection = require('./dbConnect.js');
var inquirer = require('inquirer');
var Table = require('cli-table');

// this function connects to the mysql database and returns a display view of the 'product' table
function viewAllProducts() {
  connection.query('SELECT * FROM products ORDER BY department_name', function(error, res) {
    if (error) throw error;
    var table = new Table({
      head: ['item_Id', 'Product Name', 'Department', 'Price', 'Stock Quantity']
    });

    for (i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    promptAction();
    // connection.end();
  });
};

// this function returns all 'items' from the 'product' table with a quantity below 10
function lowInventoryList() {
  connection.query("SELECT * FROM products WHERE stock_quantity<=10", function(error, res) {
    if (error) throw error;
    var table = new Table({
      head: ['item_Id', 'Product Name', 'Department', 'Price', 'Stock Quantity']
    });
    for (i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].department_name, res[i].stock_quantity]
      );
    }
    console.log(table.toString());
    promptAction();
    // connection.end();
  });
};

// this function completes the proceeding function adding a user specified amount of inventory via an mysql UPDATE
function completeAddInventory(item) {
  inquirer.prompt([{Zx
    type: 'input',
    message: '\nSpecify amount of stock to add to ' + item.product_name + '.\n',
    name: 'addStock',
    // validate with a isNOTaNUMBER function
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  }]).then(function(amount) {
    var newStockAmt = parseInt(item.stock_quantity) + parseInt(amount.addStock);
    var addStock = [{
      stock_quantity: newStockAmt
    }, {
      item_id: item.item_id
    }];
    connection.query('UPDATE products SET ? WHERE ?', addStock, function(error) {
      if (error) throw error;
    });
    console.log(item.product_name + ' stock has been updated to ' + newStockAmt + '.\n');
    // connection.end();
    promptAction();
  }).catch(function(error) {
    throw error;
  });
};
// First part of the preceeding function, which prompts our user to select and item to add inventory to via a
// dislay of all items in our 'product' table
function selectAddInventory(data) {
  inquirer.prompt([{
    type: 'list',
    message: 'Select item where you would like to add more stock.\n',
    choices: function() {
      var choiceArr = [];
      for (i = 0; i < data.length; i++) {
        choiceArr.push(data[i].item_id + " : " + data[i].product_name + " : " + data[i].stock_quantity);
      }
      return choiceArr;
    },
    name: 'itemList',
  }, ]).then(function(input) {
    var idArr = input.itemList.split(" : ");
    var selectedItem;
    for (i = 0; i < data.length; i++) {
      if (parseInt(idArr[0]) === parseInt(data[i].item_id)) {
        selectedItem = data[i];
      }
    }
    completeAddInventory(selectedItem);
  }).catch(function(error) {
    throw error;
  });
};

// a simple query function that returns all from the 'product' table
function addInventory() {
  var sqlQuery = 'SELECT * FROM products';
  connection.query(sqlQuery, function(error, data) {
    if (error) throw error;
    selectAddInventory(data);
  });
};

// function to add new products to our database
// 1st run a series of prompts to collect the necessary data/values
function addNewProduct() {
  inquirer.prompt([{
    type: 'input',
    message: '\nWhat is the name of the new product?\n',
    name: 'name'
  },
  {
    type: 'input',
    message: '\nWhat is the department of the new product?\n',
    name: 'department'
  },
  {
    type: 'input',
    message: '\nWhat is the price per unit of the new product?\n',
    name: 'price',
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  },
  {
    type: 'input',
    message: '\nWhat is the starting stock quantity of the new product?\n',
    name: 'stockQty',
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
// now let's relate the prompt values to our 'product' table and INSERT
  }]).then(function(response) {
    var sqlQuery = 'INSERT INTO products SET ?';
    var params = {
      product_name: response.name,
      department_name: response.department,
      price: parseFloat(response.price),
      stock_quantity: parseInt(response.stockQty)
    }
    connection.query(sqlQuery, params, function(error) {
      if (error) throw error;
      console.log('\nAdded new product ' + response.name + ' to database.\n');
      viewAllProducts();
      // connection.end();
  });
});
};

// this awesome function displays list of prompts which map to the functions in this file and allows
// the user to exit the entire process
function promptAction() {
  inquirer.prompt([{
    type: 'list',
    message: 'Bamazon Manager Function Selections:',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit Bamazon Manager'],
    name: "action"
  }, ]).then(function(selection) {
    switch (selection.action) {
      case 'View Products for Sale':
        viewAllProducts();
        break;

      case 'View Low Inventory':
        lowInventoryList();
        break;

      case 'Add to Inventory':
        addInventory();
        break;

      case 'Add New Product':
        addNewProduct();
        break;

      case 'Exit Bamazon Manager':
        process.exit();
        break;       


    }
  }).catch(function(error) {
    throw error;
  });
};

connection.connect(function(error) {
  if (error) throw error;
  console.log('Connected as id: ' + connection.threadId);
  promptAction();
});