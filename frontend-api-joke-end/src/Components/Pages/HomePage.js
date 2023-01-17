const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.innerHTML += '<div class="uniqueJoke"></div>';

  // eslint-disable-next-line no-use-before-define
  setInterval(() =>{ displayRandomJoke() }, 5000);
  
  // eslint-disable-next-line no-use-before-define
  afficherTouteLesBlagues();
  

};

const afficherTouteLesBlagues = async () => {
  try {

    const response = await fetch('/api/jokes');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const jokes = await response.json();
    // eslint-disable-next-line no-use-before-define
    displayjokes(jokes);

  } catch (err) {
      console.error('HomePage::error: ', err);
  }
}

const displayjokes = (jokes) => {
  console.log(jokes);
  const main = document.querySelector('main');

  // eslint-disable-next-line no-undef

  let text = ''
  text = '<div class="container"><div class="row text-center justfy-content-center"><table class="table"><thead><tr><th scope="col">All Jokes</th></thead><tbody>' ;

  jokes.forEach(element => {
    text += `<tr><th>${element.title} - ${element.content}</th></tr>`;
  });

  text += '</tbody></table></div></div>' ;

  main.innerHTML += text;
}

const displayRandomJoke = async () => {
  try {

    const response = await fetch('/api/jokes/getJokeRandom/');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const joke = await response.json();
    // eslint-disable-next-line no-use-before-define
    displaytoMainjoke(joke);

  } catch (err) {
      console.error('HomePage::error: ', err);
  }
}

const displaytoMainjoke = (jokes) => {
  console.log(jokes);
  const div = document.querySelector('main div.uniqueJoke');
  div.innerHTML = `<h4 class="text-center">${jokes.title} - ${jokes.content}</h4>`;
}

export default HomePage;
