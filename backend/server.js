const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/testdb';

console.log('Connecting to MongoDB at:', mongoUrl); // Добавих това за дебъгване

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', ItemSchema);

app.get('/api', async (req, res) => {
  try {
    // Създаваме нов запис всеки път, за да видим че работи
    await new Item({ name: 'Hello from Kubernetes ' + new Date().toLocaleTimeString() }).save();
    const items = await Item.find();
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log('Backend listening on port 3000');
});