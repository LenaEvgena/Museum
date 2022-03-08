//mainmenu opening
const burgerButton = document.querySelector('.burger_logo');
const burgerMenu = document.querySelector('.burger__menu');
const welcomeText = document.querySelector('.welcome__text');
const overlay1 = document.querySelector('.overlay1');
const links = document.querySelectorAll('.burger_link');

burgerButton.addEventListener('click', () => {
  toggleMenu();
});

function toggleMenu() {
  if (burgerMenu.classList.contains('open')) {
    removeActiveMenuClasses();
  } else {
    welcomeText.style.opacity = '0';
    burgerMenu.classList.add('open');
    burgerButton.classList.add('open');
    overlay1.classList.add('burger-opened');

    if (parseInt(burgerMenu.offsetWidth) > 300) {
      document.querySelector('#slider').style.zIndex = '-1';
    }
  }
}

links.forEach(item => item.addEventListener('click', () => {
  removeActiveMenuClasses();
}));

function removeActiveMenuClasses() {
  burgerMenu.classList.remove('open');
  burgerButton.classList.remove('open');
  overlay1.classList.remove('burger-opened');
  welcomeText.style.opacity = '1';
  document.querySelector('#slider').style.zIndex = '5';
}

overlay1.addEventListener('click', (e) => {
  const isClickInside = burgerMenu.contains(e.target);
  if (isClickInside) {
    return;
  } else {
    removeActiveMenuClasses();
  }
});


// ripple эффект
const button = document.querySelector('.book_button');

button.addEventListener('click', (e) => {
  addEffect(e, button);
});

function addEffect(e, but) {
  const newDiv = document.createElement('div');
  const maxValue = Math.max(but.clientWidth, but.clientHeight);
  const rect = but.getBoundingClientRect();

  newDiv.style.width = newDiv.style.height = maxValue + 'px';
  newDiv.style.left = e.clientX - rect.left - (maxValue / 2) + 'px';
  newDiv.style.top = e.clientY - rect.top - (maxValue / 2) + 'px';

  newDiv.classList.add('ripple');
  but.appendChild(newDiv);
  setTimeout(() => newDiv.remove(), 500);
}
