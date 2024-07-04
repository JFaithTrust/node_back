require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postModel = require('./models/post.model');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  try{
    const posts = await postModel.find();
    res.status(200).send(posts);
  }catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const {title, content} = req.body;
    const newPost = await postModel.create({title, content});
    res.status(200).send(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.delete('/:id', (req, res) => {
  const {id} = req.params;
  res.status(200).send(`Delete user with id ${id}`);
});

app.put('/:id', (req, res) => {
  const {id} = req.params;
  const {fistName, lastName} = req.body;
  const message = `Update user with id ${id} to ${fistName} ${lastName}`;
  res.status(200).send(message);
})

const PORT = process.env.PORT || 8080;

const bootstrap = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => {
      console.log('Connected to MongoDB');
    })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`
      Error on bootstrap: ${error}`);
  }
}

bootstrap();