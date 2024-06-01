const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite'); 

fs.readFile('./init_db.sql', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading SQL file: ", err);
        return;
    }

    db.exec(data, (err) => {
        if (err) {
            console.error("Error executing SQL script: ", err);
        } else {
            console.log("Database populated successfully");
        }
        db.close();
    });
});
