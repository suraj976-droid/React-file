const {
  createPool
} = require('mysql');

const express = require('express');
const app = express();
const cors = require('cors')

app.get('/', (req, res) => {
  return res.json('from the backend side')
})

app.listen('8081', () => {
  console.log(`port is running on ${'http://localhost:8081'}`)
})

app.use(
  cors({
    origin: '*'
  })
)

app.use(express.json());

const con = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mysociety'
})

app.get(`/getdata`, (req, res) => {
  const sql = "select * from users where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})
app.get(`/requestdata`, (req, res) => {
  
  const sql = "select * from users where deleted = 0"

  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err)
    } else {
      return res.json(data)
    }
  })
})

app.put('/putdata', (req, res) => {
  const { username, password, address } = req.body;

  const sql = `INSERT INTO users (username, password, address) VALUES (?, ?, ?)`;

  con.query(sql, [username, password, address], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post('/deletedata', (req, res) => {
  const { id } = req.body;

  const sql = `UPDATE users SET deleted = 1 WHERE id = ?`;

  con.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating user' });
    } else {
      return res.json(data);
    }
  });
});