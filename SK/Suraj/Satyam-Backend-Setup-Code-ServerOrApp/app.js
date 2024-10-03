const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

        app.use(
          cors({
            origin: "*",
          })
        );

        app.use(express.json());

        const db = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "crud",
        });

        db.connect((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Connected to database");
          }
        });

// connection close

      app.get("/", (req, res) => {
        return res.json("this is from backned");
      });

      app.listen("8081", () => {                 // Mandatory fro Listening
        console.log("port : 8081");              // Axios Install Is mandatory for Http Request Response
      });

// backend close

      // app.get("/getdata", (req, res) => {

      //     const sql = "SELECT * FROM student";

      //     db.query(sql , (err,data) =>{
      //         if(err){
      //             return res.json(err);
      //         }else{
      //             return res.json(data);
      //         }
      //     })
      // });

// backend Fetch Query Close

//Start From Here







