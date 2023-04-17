const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./models/todo");

const connectionString = 'mongodb://localhost:27017/firstmongo';

mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

app.use("/", express.static(path.resolve(__dirname, "assets")));
app.use(express.json());

app.get('/api/get', async (req, res) => {
  const records = await Todo.find()
  console.log('records =>', records)
  res.json(records)
})

app.post('/api/create/', async (req, res) => {
  const record = req.body
  console.log(record)
  const response = await Todo.create(record)
  console.log('response =>', response);
  res.json(response)
})

app.post('/api/modify', async (req, res) => {
  const { old: oldTitle, new: newTitle } = req.body
  const response = await Todo.updateOne(
    {
      record: oldTitle
    },
    {
      $set: {
        record: newTitle
      }
    }
  )
  res.json(res.json({
    status: 'ok'
  }))
})

app.post('/api/delete', async (req, res) => {
  const record = req.body;
  const response = await Todo.deleteOne(record);
  res.json({
    status: 'ok'
  })
})

app.listen(3000, "127.0.0.1", () => {
  console.clear();
  console.log("Server up at http://localhost:3000");
});
