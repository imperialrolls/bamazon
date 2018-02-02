# BAMAZON
This is an Amazon-like storefront app that will take in orders from customers and deplete stock from the store's inventory.

Please follow the link below to watch me showing off my working app!
**[Demonstration Video](https://github.com/imperialrolls/bamazon/tree/master/assets)**

**Customer View**

**bamazonCustomer.js.**

1. Running this application will first display all of the items available. The CLI table display includes id, product name, department name, price and stock quantity.

2. Bamazon app will then prompt users with two messages:

- The first should ask them the ID of the product they would like to buy.
- The second message should ask how many units of the product they would like to buy.

3. Once the customer has placed the order, Bamazon will check if the store has enough of the selected product to meet the customer's request.

- If not, the Bamazon will log the phrase "Insufficient Quantity!" and then prevent the order from going through.
- However, if Bamazon does have enough of the product, the the customer's order fulfilled.

4. The Bamazon SQL database is updated to reflect the remaining stock quantity.

5. The customer's total cost of their purchase is displayed.

6. Customer is prompted to either:

- Continue shopping
- Exit Bamazon


**Manager View (Next Level)**

**bamazonManager.js**

Running this application will:

List a set of menu options:

- View Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product
- Exit Bamazon Manager

- If a manager selects 'View Products for Sale', the app will list every available item: the item IDs, names, department, prices and quantities.

- If a manager selects 'View Low Inventory', then it will list all items with an inventory count lower than 10.

- If a manager selects 'Add to Inventory', the app will display a prompt that will let the manager "add more" of any item currently in the store.

- If a manager selects 'Add New Product', it will allow the manager to add a completely new product to the store.

- If a manager selected 'Exit Bamazon Manager', the process will exit.










