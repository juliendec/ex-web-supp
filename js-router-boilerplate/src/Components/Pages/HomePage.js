import Christmas from '../../img/Christmas.jpg';
import Programming from '../../img/Programming.jpg';
import Pun from '../../img/Pun.jpg';
import Json from "../../utils/jokes";

const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.innerHTML = '<div class="container"><div class="row"><h1>Theme kojes !</h1></div></div>';
  // eslint-disable-next-line no-use-before-define
  afficherTheme();
};

const afficherTheme = () => {
  const main = document.querySelector('main');
  main.innerHTML += `
    <div class="container">
      <div class="row">
        <img src="${Christmas}" alt="Christmas" data-theme="Christmas" style="width:33%">
        <img src="${Programming}" alt="Programming" data-theme="Programming" style="width:33%">
        <img src="${Pun}" alt="Pun" data-theme="Pun" style="width:33%">
      </div>
    </div>
  `;

  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.addEventListener('click', (elem) => {
        elem.preventDefault();
        console.log("click");
        const type = img.dataset.theme;
        console.log(type);
        // eslint-disable-next-line no-use-before-define
        afficherBlague(type);
    })
  })
}

// eslint-disable-next-line arrow-body-style



const afficherBlague = (type) => {
  const arrayGood = findIndexByTheme(type)
  const main = document.querySelector('main');
  main.innerHTML = '';
  const indexRandom = Math.floor(Math.random() * ((arrayGood.length-1) - 0 + 1) + 0);
  const timerID = setTimeout(() => {
    document.querySelector('div.answer').innerHTML = arrayGood[indexRandom].answer;
    console.log(arrayGood[indexRandom].answer)
  }, 1000);
  main.innerHTML = `
    <div class="container">
      <div class="row text-center justify-content-center">
        <div class="col-12 question">
          ${arrayGood[indexRandom].question}
        </div>
        <div class="col-12 answer">
          ${timerID}
        </div>
        <div class="col-12 return-div">
          <button class="btn btn-primary">back to theme</button>
        </div>
      </div>
    </div>
  `;
  const btn = document.querySelector('button.btn-primary');
  btn.addEventListener('click', (elem) => {
    elem.preventDefault();
    HomePage();
  })

}

function findIndexByTheme(type) {
  const arrayTheme = [];

  Json().forEach(element => {
    if(element.category.toLocaleLowerCase() === type.toLocaleLowerCase()){
      console.log(element);
      arrayTheme.push(element);
    }
  });
  return arrayTheme;
}

export default HomePage;
