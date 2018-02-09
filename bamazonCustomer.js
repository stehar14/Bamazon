var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
 
// instantiate 
var table = new Table({
    head: ["Item ID", "Product Name", "Department Name", "Price", "Stock Quantity"]
});
var columns = ["item_id", "product_name", "department_name", "price", "stock_quantity"];

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: //enter password,
    database: "bamazon"
});

var displayProducts = function() {
    con.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            var arr = [];

            for (var j = 0; j<columns.length; j++) {
                arr.push(result[i][columns[j]]);
            }
            table.push(arr);
        }
        console.log(table.toString());
        promptId();
    });
    
}

var promptId = function() {
    inquirer
  		.prompt([
    // Here we create a basic text prompt.
    		{
      		type: "input",
      		message: "==================================================\n  =     What Product ID are you interested in?     =\n  ==================================================\n",
      		name: "prod_id"
    		},
            {
            type: "input",
            message: "How many units would you like?",
            name: "unit_num"
            }
        ]).then(function(inquirerResponse) {
			var reqUnits = inquirerResponse.unit_num;
            var reqProduct = inquirerResponse.prod_id;
            checkAvailability(reqProduct, reqUnits);
	});
}

var checkAvailability = function(product, units){
    con.query("SELECT * FROM products WHERE item_id = ?", [product], function (err, result, fields) {
        if (err) throw err;
        if (parseInt(result[0].stock_quantity) > units) {
            var custOwes = parseInt(result[0].price) * units;
            var newUnits = parseInt(result[0].stock_quantity) - units;
            var newSales = parseInt(result[0].product_sales) + custOwes;
            con.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newUnits}, {item_id: product}], function (err) {
                if (err) throw err;
                console.log("==================================================\n  Sure here are " + units + " " + result[0].product_name + ". Your total is $" + custOwes + ". \n==================================================\n");
            })
            con.query("UPDATE products SET ? WHERE ?", [{product_sales: newSales}, {item_id: product}], function(err){
                if (err) throw err;
                con.end();
            })
        } else {
            console.log("==================================================\n  " + units + " " + result[0].product_name + " is not in stock! \n==================================================\n");
            con.end();
        }
    });
}

// execute a connection 
con.connect(function(err) {
    if (err) throw err;
    displayProducts();
});
