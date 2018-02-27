 var fs = require('fs');
 // require mysql
 var mysql = require('mysql');
 // require inquirer
 var inquirer = require('inquirer');
 // require cli table
 var Table = require('cli-table');
 // empty array for shopping cart/item purchased.
 var shoppingCartArray = [];
 var connection = mysql.createConnection({
     host: "localhost",
     port: 3306,
     // Your user name
     user: "root",
     // Your password
     password: "R1o9b8s*",
     database: "bamazonDB"
 });

 connection.connect(function(err) {
     if (err) { throw err };
     console.log("Connected as id: " + connection.threadId + "\n");
     readProducts();
 });

 function readProducts() {
     // table from sql. selecting id, product_name, dept.name, price and stock
     connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function(err, res) {
         if (err) throw err;

         // table is an Array, so you can `push`, `unshift`, `splice` and friends 
         var table = new Table({
             head: ['Item ID', 'Product name', 'Department', 'Price', 'Quantity'],
             colWidths: [10, 30, 30, 30, 30]
         });
         // for loop to fill items in the table.
         for (var i = 0; i < res.length; i++) {
             table.push(
                 [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]

             );
         }

         console.log(table.toString());
         purchase();
     });
 }


 function purchase() {
     inquirer.prompt([{
         type: "input",
         message: " Please enter item  ID # of the item you would like to purchase.",
         name: "choice"
     }]).then(function(answer) {
         var purchaseId = answer.choice;

         // inserting the user choice into the query.
         connection.query('SELECT * FROM Products WHERE id=?', purchaseId, function(err, res) {
             if (err) console.log(err, 'That item ID doesnt exist');
             console.log(res);

             inquirer.prompt([{
                 type: "input",
                 message: "How many would you like to buy?",
                 name: "quantity"
             }]).then(function(answer) {
                 var quantity = answer.quantity;
                 if (quantity > res[0].stock_quantity) {
                     console.log("not enough stock");
                     purchase();
                 } else {
                     console.log("Thank you for purchasing: Your total is:" + quantity * res[0].price);

                     var newQuantity = res[0].stock_quantity - quantity;

                     // udpating the new quantity of the targeted res. id.
                     connection.query("UPDATE products SET stock_quantity = " + newQuantity + " WHERE id = " + purchaseId, function(err, res) {
                         if (err) throw err;
                         console.log("bang your head on the wall at this point", err);

                     })

                     inquirer.prompt([{
                         type: "list",
                         message: " Would you like to keep shopping?",
                         choices: ["Yes, keep shopping", "No, leave MySql-Swapmeet"],
                         name: "choice"
                     }]).then(function(answer) {
                         if (err) throw err;

                         switch (answer.choice) {
                             case "Yes, keep shopping":
                                 readProducts();
                                 break;

                             case "No, leave MySql-Swapmeet":
                                 txt();
                                 connection.end();
                                 break;

                             default:
                                 console.log("Invalid Choice");

                         }

                     });



                 }
             })
         });


     });
 }

 function txt() {
     fs.readFile("txt.txt", "utf8", function(error, data) {
         console.log(data);
     });
 }








 // connection.end();