# Bamazon Node and MySQL CLI Application

## Overview

Bamazon is an Amazon-like storefront built using MySQL and Node and utilizing the MySQL and Inquirer npm packages. The app will take in orders from customers and deplete stock from the store's inventory. Additionally, managers can use the app to track inventory across the store and bolster inventory or add new products.

## Customer

![Initialize](https://github.com/stehar14/Bamazon/blob/master/images/custinit.PNG "Initialize")
* Run the program 'bamazonCustomer.js'.

![Display](https://github.com/stehar14/Bamazon/blob/master/images/custDisplay.PNG "Display")
* After the program is initialized, the entirety of the store inventory will display on the screen, along with a prompt for the ID of the product the user is interested in buying.

![First Input](https://github.com/stehar14/Bamazon/blob/master/images/custentry1.PNG "First Input")
* After the user inputs the appropriate product ID, the program prompts the user to enter the number of units they want of the product they selected.

![Second Input](https://github.com/stehar14/Bamazon/blob/master/images/custentry2.PNG)
* If there is enough inventory, the program will perform the transaction with the customer and inform the customer of their total bill.

![Second Input 2](https://github.com/stehar14/Bamazon/blob/master/images/custentry2b.PNG)
* If there isn't enough inventory, the program will inform the customer of such.

## Manager

![Initialize](https://github.com/stehar14/Bamazon/blob/master/images/managerinit.PNG)
* Run the program 'bamazonManager.js'.

![Display](https://github.com/stehar14/Bamazon/blob/master/images/managerdisplay.PNG)
* After the program is initialized, the program will prompt you to input what action you would like to perform. If the user selects 'View Products for Sale', the entirety of the store inventory will display on the screen.

![Low Inventory](https://github.com/stehar14/Bamazon/blob/master/images/managerdisplay2.PNG)
* If the user selects 'View Low Inventory', the program will display all relevant information on products with less than 5 units available in store.

![Add Inventory](https://github.com/stehar14/Bamazon/blob/master/images/manageradd.PNG)
* If the user selects 'Add to Inventory', the program will prompt the user to input the Product ID to add units to.

![Add2](https://github.com/stehar14/Bamazon/blob/master/images/manageradd2.PNG)
* The user would input the number of units to be added to inventory and the program outputs the updated amount.

![Add Product](https://github.com/stehar14/Bamazon/blob/master/images/managerproduct.PNG)
* If the user selects 'Add New Product', the program will prompt the user to input the name of the product along with the department name, cost, and number of initial units to be entered into inventory.

![New Display](https://github.com/stehar14/Bamazon/blob/master/images/managernewdisplay.PNG)
* After adding an item, you will be able to see the updated product list by rerunning either program.