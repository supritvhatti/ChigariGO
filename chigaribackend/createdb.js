var mysql = require('mysql2');

// Create connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",      // replace with your MySQL username
    password: "",      // replace with your MySQL password
    database: "chigari" // use the 'chigari' database
});

// Connect to MySQL
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database!");

    // Create 'users' table
    var usersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(191) UNIQUE NOT NULL,
            mobile VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        );`;

    con.query(usersTable, function(err, result) {
        if (err) throw err;
        console.log("Table 'users' created");

        // Create 'feedback' table
        var feedbackTable = `
            CREATE TABLE IF NOT EXISTS feedback (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                payment INT NOT NULL,
                booking INT NOT NULL,
                comments TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );`;

        con.query(feedbackTable, function(err, result) {
            if (err) throw err;
            console.log("Table 'feedback' created");

            // Create 'studentregister' table
            var studentRegisterTable = `
                CREATE TABLE IF NOT EXISTS studentregister (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    mobile VARCHAR(255) NOT NULL,
                    age INT NOT NULL
                );`;

            con.query(studentRegisterTable, function(err, result) {
                if (err) throw err;
                console.log("Table 'studentregister' created");
                con.end(); // Close the connection
            });
        });
    });
});
