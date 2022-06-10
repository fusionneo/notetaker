const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

router.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.get('/:id', (req, res) => {
  const singleNote = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === singleNote);
      return result.length > 0
        ? res.json(result)
        : res.json('Unable to locate note with the provided ID. Check your request and try again.');
    });
});


router.delete('/:id', (req, res) => {
  const singleNote = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {

      const result = json.filter((note) => note.id !== singleNote);

      writeToFile('./db/db.json', result);

      res.json(`Note ${singleNote} has been deleted successfully!`);
    });
});

router.post('/', (req, res) => {

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note has been added successfully!`);
  } else {
    res.error('Error creating note!');
  }
});

module.exports = router;