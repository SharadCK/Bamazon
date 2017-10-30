var prompt = require("prompt");

var inquirer = require("inquirer");

var mysql= require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "storeIn"
});

connection.connect(function(err){
	if (err) throw err;

});

function allProducts(){
	connection.query("SELECT * FROM products", function(err, inventory){
		if (err) throw err;
console.log("My Inventory");
for(var i = 0; i<inventory.length; i++) {
	console.log("Item ID: " + inventory[i].id + " | Product: " + inventory[i].product_Name + " | Department: " + inventory[i].department_name + " | Price: " +  inventory[i].price + " | Quantity: " + inventory[i].quantity_Sock);
 	}

          inquirer.prompt([

          	// Here we create a basic text prompt.
          	{
          		type: "input",
          		message: "What is the id of the item you would like to buy?",
          		name: "id"
          	},

               {
          		type: "input",
          		message: "How many would you like to buy?",
          		name: "quantity"
          	}

          
          ]).then(function (order) {
          	
                    var quantity = order.quantity;
                    var itemId = order.id;
                    connection.query('SELECT * FROM products WHERE id=' + itemId, function(err, selectedItem) {
                    	if (err) throw err;
                         if (selectedItem[0].quantity_Sock - quantity >= 0) {
                              console.log("Bamazon's Inventory has enough of that item (".green + selectedItem[0].product_Name.green + ")!".green);
                              console.log("Quantity in Stock: ".green + selectedItem[0].quantity_Sock+ " Order Quantity: ".green + quantity);
                              console.log("You will be charged ".green + (order.quantity * selectedItem[0].price) +  " dollars.  Thank you for shopping at Bamazon.".green);
                              
                              connection.query('UPDATE products SET quantity_Sock=? WHERE id=?', [selectedItem[0].quantity_Sock - quantity, itemId],
                              function(err, inventory) {
                              	if (err) throw err;
                                 
                                   allProducts();
                              });  

                         }

                         else {
                              console.log("Insufficient quantity.  Please order less of that item, as Bamazon only has ".red + selectedItem[0].quantity_Sock + " " + selectedItem[0].product_Name.red + " in stock at this moment.".red);
                              allProducts();
                         }
                    });
          });
     });
}

allProducts();
