const express = require('express');

const {
    readAllJokes,
    readOneJoke,
    readRandomJoke,
    createOneJoke,
    deleteOneJoke,
    updateOnejoke,
} = require('../models/jokes');

// const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  const allJokesPotentiallyOrdered = readAllJokes(req?.query?.order);

  return res.json(allJokesPotentiallyOrdered);
});

// Read the pizza identified by an id in the menu
router.get('/specifique/:id', (req, res) => {
  const foundJoke = readOneJoke(req.params.id);

  if (!foundJoke) return res.sendStatus(404);

  return res.json(foundJoke);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;

  if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'

  const createdJoke = createOneJoke(title, content);

  return res.json(createdJoke);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  const deletedJoke = deleteOneJoke(req.params.id);

  if (!deletedJoke) return res.sendStatus(404);

  return res.json(deletedJoke);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const content = req?.body?.content;

  if ((!title && !content) || title?.length === 0 || content?.length === 0) {
    return res.sendStatus(400);
  }

  const updatedJoke = updateOnejoke(req.params.id, { title, content });

  if (!updatedJoke) return res.sendStatus(404);

  return res.json(updatedJoke);
});

// get a pizza from the menu based on its id
router.get('/getJokeRandom/', (req, res) => {
  const foundJoke = readRandomJoke();

  if (!foundJoke) return res.sendStatus(404);

  return res.json(foundJoke);
});

module.exports = router;
