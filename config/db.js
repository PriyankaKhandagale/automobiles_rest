import mysql from 'mysql'

export const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Priyanka@1995',
    database: 'automobiles'
})

connection.connect((error, result) => {
    if (result) {
        console.log('Connected to mySQL !!')
    }
})