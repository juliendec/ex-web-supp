const path = require('node:path');
// eslint-disable-next-line import/no-extraneous-dependencies
const escape = require('escape-html');
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/jokes.json');

const JOKES = [
    {
      id: "dz1a-ehnfe",
      title: 'Quest ce qui est jaune et qui attends ?',
      content: 'Jonathan',
    },
    {
      id: "eethgdzfefneffe",
      title: 'Que fait un requin sur la terre ferme ?',
      content: 'il est mort.',
    }
  ];

  
function readAllJokes(orderBy) {
    const orderByTitle = orderBy?.includes('title') ? orderBy : undefined;
    let orderedMenu;
    const jokes = parse(jsonDbPath, JOKES);
    if (orderByTitle) orderedMenu = [...jokes].sort((a, b) => a.title.localeCompare(b.title));
    if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();
  
    const allPizzasPotentiallyOrderd = orderedMenu ?? jokes;
    return allPizzasPotentiallyOrderd;
  }
  
  function readOneJoke(id) {
    console.log("GET JOKE");
    const idNumber = id;
    const jokes = parse(jsonDbPath, JOKES);
    const indexOfPizzaFound = jokes.findIndex((joke) => joke.id === idNumber);
    if (indexOfPizzaFound < 0) return undefined;
  
    return jokes[indexOfPizzaFound];
  }

  function readRandomJoke() {
    console.log("RANDOM");
    const jokes = parse(jsonDbPath, JOKES);
    const lengthJokes = jokes.length;
    console.log(lengthJokes);
    const idNumber = Math.floor(Math.random() * ((lengthJokes-1) - 0 + 1) + 0);
    const indexOfPizzaFound = jokes[idNumber].id;
    console.log(indexOfPizzaFound);
    if (indexOfPizzaFound === null) return undefined;
  
    return jokes[idNumber];
  }
  
  function createOneJoke(title, content) {
    const jokes = parse(jsonDbPath, JOKES);
  
    const createdJoke = {
      id: uuidv4(),
      title: escape(title),
      content: escape(content),
    };
  
    jokes.push(createdJoke);
  
    serialize(jsonDbPath, jokes);
  
    return createdJoke;
  }
  
  /* function getNextId() {
    const jokes = parse(jsonDbPath, JOKES);
    const lastItemIndex = jokes?.length !== 0 ? jokes.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = jokes[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
  } */
  
  function deleteOneJoke(id) {
    const idNumber = id;
    const jokes = parse(jsonDbPath, JOKES);
    const foundIndex = jokes.findIndex((joke) => joke.id === idNumber);
    if (foundIndex < 0) return undefined;
    const deletedJokes = jokes.splice(foundIndex, 1);
    const deletedJoke = deletedJokes[0];
    serialize(jsonDbPath, jokes);
  
    return deletedJoke;
  }
  
  function updateOnejoke(id, propertiesToUpdate) {
    const idNumber = id;
    const jokes = parse(jsonDbPath, JOKES);
    const foundIndex = jokes.findIndex((joke) => joke.id === idNumber);
    if (foundIndex < 0) return undefined;
  
    const updatedJoke = { ...jokes[foundIndex], ...propertiesToUpdate };
  
    jokes[foundIndex] = updatedJoke;
  
    serialize(jsonDbPath, jokes);
  
    return updatedJoke;
  }
  
  module.exports = {
    readAllJokes,
    readOneJoke,
    readRandomJoke,
    createOneJoke,
    deleteOneJoke,
    updateOnejoke,
  };
  