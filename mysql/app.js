import mysql from "mysql2/promise";

//? connect to mysql server
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node_sql_test",
  // use this if you have already created the database
});

//? creating database
// await connection.execute(`create database node_sql_test`);

//? creating table
// await connection.execute(`
//     create table users(
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(100) NOT NULL,
//         email VARCHAR(100) UNIQUE NOT NULL
//     )
//     `);

//? INSERT DATA INTO TABLE
//! INLINE INSERTION (NOT RECOMMENDED)
// await connection.execute(
//   `insert into users(username, email) values('test', 'test@test.com')`
// );

//* USING PREPARED STATEMENTS(RECOMMENDED)
// await connection.execute(`insert into users(username, email) values(?, ?)`, [
//   "jon",
//   "jon@test.com",
// ]);

//? INSERTING MULTIPLE DATA AT ONCE
// const usersArr = [
//   ["jane", "jane@test.com"],
//   ["bobby", "bobby@test.com"],
// ];

// await connection.query(`insert into users(username, email) values ?`, [
//   usersArr,
// ]);

//? Reading from the database
const [result] = await connection.execute(`select * from users`);
console.log(result);
