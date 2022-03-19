const title = document.querySelector('.title');
const textInput = document.querySelector('.input-text');
const btn = document.querySelector('.btn');
const btnColor = document.querySelector('.btn-color');

btn.addEventListener('click', e => {
  e.preventDefault();
  const newTitle = textInput.value;

  title.textContent = newTitle;
});

btnColor.addEventListener('click', e => {
  e.preventDefault();

  title.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
});
