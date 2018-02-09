var mysql = require('mysql');
var inquirer = require('inquirer');

var columns = ["item_id", "product_name", "department_name", "price", "stock_quantity", "product_sales"];

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: //enter password,
    database: "bamazon"
});

var promptSuper = function() {
    inquirer
  		.prompt([
    // Here we create a basic text prompt.
    		{
      		type: "list",
              message: "What would you like to do?\n",
            choices: ["View Product Sales by Department", "Create New Inventory"],
            name: "choice"
    		},
        ]).then(function(inquirerResponse) {
            var superChoice = inquirerResponse.choice;
            switch (superChoice) {
                case "View Product Sales by Department":
                    return displayDepartments();
                case "Create New Inventory":
                    return displayLow();
                default:
                    return false;
            }  
	});
}

var promptAdd = function() {
    inquirer
  		.prompt([
    // Here we create a basic text prompt.
    		{
      		type: "input",
      		message: "What Product ID are you interested in?\n",
      		name: "prod_id"
    		},
            {
            type: "input",
            message: "How many units would you like to add?",
            name: "add_units"
            }
        ]).then(function(inquirerResponse) {
			var addUnits = inquirerResponse.add_units;
            var addProduct = inquirerResponse.prod_id;
            addInventory(addProduct, addUnits);
	});
}

var displayDepartments = function() {
    con.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            var str = "";

            for (var j = 0; j<columns.length; j++) {
                str += " | " + result[i][columns[j]];
            }
            console.log(str);
        }
        
    });
}

var displayLow = function() {
    con.query("SELECT * FROM products WHERE (stock_quantity < 5)", function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            var str = "";

            for (var j = 0; j<columns.length; j++) {
                str += " | " + result[i][columns[j]];
            }
            console.log(str);
        }
    })
}

var addInventory = function(product, units){
    con.query("SELECT * FROM products WHERE item_id = ?", [product], function (err, result, fields) {
        if (err) throw err;
        var newUnits = parseInt(result[0].stock_quantity) + parseInt(units);
        con.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newUnits}, {item_id: product}], function (err) {
            if (err) throw err;
            console.log("Added " + units + " " + result[0].product_name + ". The total inventory is now " + newUnits + ".");
            displayProducts();
            promptChoice();
        })
    });
}

var promptNew = function() {
    inquirer
  		.prompt([
    // Here we create a basic text prompt.
    		{
      		type: "input",
      		message: "What Product are you interested in adding to the inventory?\n",
      		name: "new_id"
    		},
            {
            type: "input",
            message: "How many units would you like to add?",
            name: "new_units"
            },
            {
            type: "input",
            message: "What Department does the Product belong in?",
            name: "new_dept"
            },
            {
            type: "input",
            message: "What is the price of this item?",
            name: "new_price"    
            }
        ]).then(function(inquirerResponse) {
			var newUnits = inquirerResponse.new_units;
            var newProduct = inquirerResponse.new_id;
            var newDept = inquirerResponse.new_dept;
            var newPrice = inquirerResponse.new_price;
            addNew(newProduct, newDept, newPrice, newUnits);
	});
}

var addNew= function(product, dept, price, units) {
    con.query("INSERT INTO products SET ?", { 
        product_name: product, 
        department_name: dept,
        price: price,
        stock_quantity: units}, function(err){
           if (err) throw err;
           console.log("You've added info to the db!");
       }
    );
}
promptSuper();