const express = require('express');
const {
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
  deleteCharacter
} = require('./dynamo');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/characters', async (req, res) => {
  try {
    const characters = await getCharacters();
    res.status(200).json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'something went wrong' });
  }
});

app.get('/characters/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const character = await getCharacterById(id);
    res.status(200).json(character);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'something went wrong' });
  }
});

app.post('/characters', async (req, res) => {
  const character = req.body;
  try {
    const newCharacter = await addOrUpdateCharacter(character);
    res.status(201).json(newCharacter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'something went wrong' });
  }
});

app.put('/characters/:id', async (req, res) => {
  const character = req.body;
  const id = parseInt(req.params.id);
  character.id = id;

  try {
    const updatedCharacter = await addOrUpdateCharacter(character);
    res.status(200).json(updatedCharacter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'something went wrong' });
  }
});

app.delete('/characters/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    res.json(await deleteCharacter(id));
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'something went wrong' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`listening on port ${port}`);
});
