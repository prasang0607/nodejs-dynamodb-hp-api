const axios = require('axios');
const { addOrUpdateCharacter } = require('./dynamo');

const seedData = async () => {
  const URL = 'https://hp-api.herokuapp.com/api/characters';

  try {
    const { data: characters } = await axios.get(URL);
    const characterPromises = characters.map((character, i) =>
      addOrUpdateCharacter({ ...character, id: i })
    );
    await Promise.all(characterPromises);
  } catch (error) {
    console.error(error);
  }
};

seedData();
