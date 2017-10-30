var prompt = require('prompt');

var inquirer = require('inquirer');

var mysql = require('mysql');

var colors = require('colors');

var connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: '',
     database: "storeIn"
});


connection.connect(function(err) {
     if (err) throw err;
     
});

function allProducts () {
     connection.query('SELECT * FROM products', function(err, inventory) {
          if (err) throw err;
          console.log("Bamazon's Inventory");
          for(var i = 0; i < inventory.length; i++) {
          console.log("Item ID: " + inventory[i].id + " | Product: " + inventory[i].product_Name + " | Department: " + inventory[i].department_name + " | Price: " +  inventory[i].price + " | Quantity: " + inventory[i].quantity_Sock);
          } // Closes for loop
     }); // Closes connection.query
}

inquirer.prompt([

	// A list to choose from.
	{
		type: "list",
		message: "Select an action",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
		name: "selection"
	}

// here the user will get the information about all the products and the item they want to add in...
     ]).then(function (user) {
          switch(user.selection) {
               case "View Products for Sale":
               allProducts();
               break;



               case "View Low Inventory":
               connection.query('SELECT * FROM products WHERE quantity_Sock < 5', function(err, inventory) {
                    if (err) throw err;
                    console.log("Bamazon's Inventory");
                    for(var i = 0; i < inventory.length; i++) {
                    console.log("Item ID: " + inventory[i].id + " | Product: " + inventory[i].ProductName + " | Department: " + inventory[i].DepartmentName + " | Price: " +  inventory[i].Price + " | Quantity: " + inventory[i].quantity_Sock);
                    } 
               }); 
               break;



               case "Add to Inventory":
               inquirer.prompt([
               	// basic text prompt for the item they want to add in...
               	{
               		type: "input",
               		message: "What is the id of the item you would like to add to?",
               		name: "itemId"
               	},
                    {
               		type: "input",
               		message: "How many items should we add to the inventory of that item?",
               		name: "amount"
               	}
               
               // this function gives queries answers
          ]).then(function (request) {
               	
                    connection.query('SELECT * FROM products WHERE id=' + request.itemId, function(err, selectedItem) {
                    	if (err) throw err;
                          console.log("You have added ".green + request.amount + " " + selectedItem[0].product_Name.green + " to the inventory.".green);
                              connection.query('UPDATE products SET quantity_Sock=? WHERE id=?', [selectedItem[0].quantity_Sock + Number(request.amount), request.itemId],
                              function(err, inventory) {
                              	if (err) throw err;
                                   // Runs the prompt again..
                                   allProducts();
                              });  
                    });
               }); 
               break;

               case "Add New Product":
               inquirer.prompt([
                    // Here we create a basic text prompt.
                    {
                         type: "input",
                         message: "What is the name of the product you would like to add?",
                         name: "product_Name"
                    },
                    {
                         type: "input",
                         message: "What department does this item belong to?",
                         name: "department_name"
                    },
                    {
                         type: "input",
                         message: "What is the price of the item you would like to add to the inventory?",
                         name: "price"
                    },
                    {
                         type: "input",
                         message: "How many items should we add to the inventory of that item?",
                         name: "quantity_Sock"
                    }
              
          ]).then(function (newItem) {

               connection.query("INSERT INTO products (product_Name, department_name, price, quantity_Sock) VALUES (?,?,?,?)",[newItem.product_Name, newItem.department_name, newItem.price, newItem.quantity_Sock],
               function(err, inventory) {
                    if (err) throw err;
                    // Runs the prompt again, so the user can keep shopping.
                    console.log("Great, ".green + newItem.product_Name.green + " have been added to the inventory.".green);
                    allProducts();
               });  



               }); 
          }  

});