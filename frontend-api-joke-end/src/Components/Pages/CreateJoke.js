import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const CreateJoke = () => {
  clearPage();
  renderGoBackHomeButton();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  const inputTitle = document.createElement('input');
  const inputContent = document.createElement('input');
  const submit = document.createElement('input');

  inputTitle.type = "text";
  inputContent.type = "text";
  submit.type = 'submit';
  submit.value = 'Add joke';
  submit.className = 'btn btn-secondary mt-3';


  main.appendChild(inputTitle)
  main.appendChild(inputContent)
  main.appendChild(submit);


  submit.addEventListener('click', async (e) => {
    console.log(inputTitle.value)
    console.log(inputContent.value)
    e.preventDefault();
    const titleIn = inputTitle.value;
    const contentIn = inputContent.value;

    const options = {
      method: 'POST',
        body: JSON.stringify({
          title : titleIn,
          content : contentIn,
      }),

      headers: {
          'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/api/jokes', options); // fetch return a promise => we wait for the response

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const newJoke = await response.json(); // json() returns a promise => we wait for the data$

    if(newJoke !== null && newJoke !== undefined){
      Navigate('/');
    } else {
      console.log("problèmes");
    }


  });

}

export default CreateJoke;
