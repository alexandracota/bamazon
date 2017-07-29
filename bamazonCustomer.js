var mysql = require('mysql');
var inquirer = require('inquirer');
var parsedAnswer = "";

var wrapper = function() {

	//Create connection
	var connection = mysql.createConnection({
		host: "127.0.0.1",
		port: 3306,
		user: "root",
		password: "",
		database: "Bamazon_db"
	});

	//Connect and call afterConnection function.
	connection.connect(function(err) {
		if (err) throw err;
		//console.log("connected as id " + connection.threadId);
		afterConnection();
	});

	//After connection run inquirer to get user input.
	function afterConnection() {
		inquirer
			.prompt([{
				name: "ID",
				message: "What is the ID of the product you would like to buy?",
				},
				{
				name: "units",
				message: "How many units would you like to buy?"
			}])
			.then(function(answer) {
				var selectID = answer.ID;
				var selectUnits = answer.units;
				// parsedAnswer = parseFloat(answer);
				// console.log(parsedAnswer);
				readProducts(selectID, selectUnits);
				// var query = "SELECT stock_quantity FROM products WHERE ?", function (err, res) {
			});
		
	};
	//Grab the stock quantity and store it in a variable.
	function readProducts(selectID, selectUnits) {
		var query = connection.query("SELECT stock_quantity FROM products WHERE item_id=?", [selectID], function (err, res) {
			console.log("Selecting user product...\n");
			if (err) throw err;
			var selectProductQ = res[0].stock_quantity;
			updateProduct(selectProductQ, selectUnits);
		});
		
	}

// Subtract desired units from the units from the stock quantity
	function updateProduct(selectProductQ, selectUnits) {
		var quantityRemaining = selectProductQ -= selectUnits;
		if (quantityRemaining > 0) {
			console.log("Order complete!");
		} else {
			console.log("Insufficient quantity! Try a smaller amount.");
		}
	}

};

wrapper();


// // };
