//slick slider
$('.images').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true
});
const activeSlideNum = document.querySelector('.count_active');
const leftArrow = document.querySelector('.slick-prev');
const rightArrow = document.querySelector('.slick-next');
const bullets = document.querySelectorAll("ul.slick-dots > li > button");
const wrapper = document.querySelector('.welcome__image-wrapper');

rightArrow.addEventListener('click', showActiveSlideNum);
leftArrow.addEventListener('click', showActiveSlideNum);
leftArrow.addEventListener('click', showActiveSlideNum);
wrapper.addEventListener('click', showActiveSlideNum);
wrapper.addEventListener('mouseup', showActiveSlideNum);
wrapper.addEventListener('touchend', showActiveSlideNum);
bullets.forEach(bullet => {
  bullet.addEventListener('click', showActiveSlideNum);
})
bullets.forEach(bullet => {
  bullet.addEventListener('touch', showActiveSlideNum);
})

function showActiveSlideNum() {
  const activeSlide = document.querySelector('.slick-active');
  activeSlideNum.innerText = `0${+activeSlide.dataset.slickIndex + 1}`;
}

