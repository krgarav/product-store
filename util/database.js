const mysql=require("mysql2");
const pool= mysql.createPool({
    host:'local',
    user:'root',
    database:'node-complete',
    password:'123456789'
});

module.exports=pool.promise();