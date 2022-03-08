
function renderRandomGallery() {
  const galleryInnerContainer = document.querySelector('.gallery-inner-container');

  const galleryArray =
    [
      'galery1',
      'galery2',
      'galery3',
      'galery4',
      'galery5',
      'galery6',
      'galery7',
      'galery8',
      'galery9',
      'galery10',
      'galery11',
      'galery12',
      'galery13',
      'galery14',
      'galery15',
    ];

  shuffle(galleryArray);

  for (let i = 0; i < galleryArray.length; i++) {
    const image = `<img src="./assets/img/gallery/${galleryArray[i]}.jpg" alt="${galleryArray[i]}" class="gallery__image gallery_show">`;
    galleryInnerContainer.innerHTML += image;
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
}

renderRandomGallery();


//анимация при скролле
const animItems = document.querySelectorAll('.gallery_show');

if (animItems.length > 0) {
  window.addEventListener('scroll', animateOnScrolling);
  function animateOnScrolling() {
    for (let i = 0; i < animItems.length; i++) {
      let animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if ((window.pageYOffset > (animItemOffset - animItemPoint)) && (window.pageYOffset < (animItemOffset + animItemHeight))) {
        animItem.classList.add('active');
      } else {
        animItem.classList.remove('active');
      }

    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  animateOnScrolling();
}


// const container = document.querySelector('.gallery-inner-container');
//   let coords = container.getBoundingClientRect();
//   let containerStartsAt = window.scrollY + coords.top;
//   let windowBottom = window.scrollY + window.innerHeight;
//   console.log('start of the container', containerStartsAt);
