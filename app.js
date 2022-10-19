const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')


const mongoose = require('mongoose');
const DB_HOST =
  "mongodb+srv://slava2711:dzsmcrIzJTvBv8CX@cluster0.ubkpags.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch(err => {
    console.log("Error connecting to Mongoose: " + err.message);
    process.exit(1);
  }
  )










const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
