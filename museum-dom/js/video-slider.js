$('.videoEx-slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  // asNavFor: '.videoBig-slider',
  dots: true,
  arrows: true,
  centerMode: false,
  focusOnSelect: false,
  draggable: false,
  responsive:[
    {
      breakpoint: 1100,
      settings: {
        slidesToShow:2
      }
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow:2
      }
    }
  ]
});


let IDArray = ['zp1BXPX8jcU', 'Vi5D6FKhRmo', 'NOhDysLnTvY', 'aWmJ5DgyWPI', '2OR0OCr6uRE'];

function findVideos() {
  let videos = document.querySelectorAll('.videoEx');
  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i], IDArray[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector('.videoEx__link');
  let button = video.querySelector('.videoEx__button');
  let media = video.querySelector('.videoEx__media');
  let info = video.querySelector('.video_info');
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
    let iframe = createIframe(id);

    info.remove();
    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('videoEx--enabled');

}

function parseMediaURL(media) {
  let url = media.src;
  let id = url.substring(17);
  return id;
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('videoEx__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';
  return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();



//main video
//видео- и аудиоконтроллеры
const ranges = Array.from(document.querySelectorAll('.range'));
ranges.forEach(range => {
  range.addEventListener('input', function() {
    const value = this.value || 0;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  })
});

const screen = document.querySelector('.video__window');
const videoPlayer = document.querySelector('.video0');
const videoIcon = document.querySelector('.video_icon');
const playButton = document.querySelector('.play');
const soundButton = document.querySelector('.sound');
const fullscreenButton = document.querySelector('.fullscreen');
const videoRange = document.querySelector('.range1');
const soundRange = document.querySelector('.range2');

const arrows = document.querySelectorAll('.slick-arrow');
const dots = document.querySelectorAll('.slick-dots > li');
const slides = document.querySelectorAll('.videoEx');
const videoSection = document.querySelector('.video_screen');
let coords;

playButton.addEventListener('click', toggleVideoPlay);
videoPlayer.addEventListener('click', toggleVideoPlay);
videoIcon.addEventListener('click', toggleVideoPlay);
soundButton.addEventListener('click', toggleVolume);
fullscreenButton.addEventListener('click', toggleVideoFullScreen);
soundRange.addEventListener('input', rangeVolume);
videoRange.addEventListener('input', rangeDuration);
videoPlayer.addEventListener('timeupdate', videoRanging);

arrows.forEach(arrow => {
  arrow.addEventListener('click', stopVideo);
});

dots.forEach(dot => {
  dot.addEventListener('click', stopVideo);
});

function stopVideo() {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  videoIcon.style.display = 'block';
  playButton.classList.remove('active');
  videoRange.value = 0;
  videoRange.style.background = `linear-gradient(to right, $color-dark-red 0%, $color-dark-red 0%, #c4c4c4 0%, #c4c4c4 100%)`;
  videoRanging();
  localStorage.setItem('currentTime', 0);
  replaceSrc();
}

function replaceSrc() {
  const activeSlide = document.querySelector('.videoEx.slick-current');
  let source = videoPlayer.src.substr(-5, 1); //number
  let newSource = activeSlide.dataset.slickIndex;
  let newSrc = videoPlayer.src.replace(`${source}.mp4`, `${newSource}.mp4`); //number

  let poster = videoPlayer.poster.substr(-5, 1);
  let newPosterSrc = videoPlayer.poster.replace(`${poster}.jpg`, `${newSource}.jpg`); //
  videoPlayer.src = newSrc;
  videoPlayer.poster = newPosterSrc;
}

function toggleVideoPlay() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    videoIcon.style.display = 'none';
    playButton.classList.add('active');
  } else {
    videoPlayer.pause();
    videoIcon.style.display = 'block';
    playButton.classList.remove('active');
  }
}

function toggleVideoFullScreen() {
  if (!document.fullscreenElement) {
    videoPlayer.requestFullscreen();
    // fullscreenButton.classList.add('active');
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      // fullscreenButton.classList.remove('active');
    }
  }
}

function toggleVolume() {
  if (videoPlayer.volume !== 0) {
    localStorage.setItem('volume', videoPlayer.volume);
    videoPlayer.volume = 0;
    soundRange.value = 0;
    soundRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${soundRange.value}%, #c4c4c4 ${soundRange.value}%, #c4c4c4 100%)`;
    soundButton.classList.add('active');
  } else {
    videoPlayer.volume = localStorage.getItem('volume');
    soundRange.value = localStorage.getItem('volume') * 100;
    soundRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${soundRange.value}%, #c4c4c4 ${soundRange.value}%, #c4c4c4 100%)`;
    soundButton.classList.remove('active');
  }
}

function rangeVolume() {
  let volumeRangeValue = soundRange.value;
  if (volumeRangeValue <= 0) {
    soundButton.classList.add('active');
  } else {
    soundButton.classList.remove('active');
  }
  videoPlayer.volume = volumeRangeValue / 100;
  localStorage.setItem('volume', videoPlayer.volume);

  if (localStorage.volume) {
    volumeRangeValue = localStorage.getItem('volume') * 100;
  }
  localStorage.setItem('volume', (volumeRangeValue / 100));
}

function rangeDuration() {
  let durationRangeValue = videoRange.value;

  if (durationRangeValue <= 0 || durationRangeValue >= 100) {
    videoIcon.style.display = 'block';
    playButton.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  } else {
    playButton.classList.add('active');
  }

  videoPlayer.currentTime = durationRangeValue * videoPlayer.duration / 100;
  localStorage.setItem('currentTime', videoPlayer.currentTime);

  if (localStorage.currentTime) {
    durationRangeValue = localStorage.getItem('currentTime') * 100 / videoPlayer.duration;
  }
  localStorage.setItem('currentTime', (durationRangeValue * videoPlayer.duration / 100));
  videoRange.style.background = `linear-gradient(to right, $color-dark-red ${durationRangeValue}%, $color-dark-red ${durationRangeValue}%, #c4c4c4 0%, #c4c4c4 100%)`
}

function videoRanging() {
  let durationRangeValue = videoPlayer.currentTime * 100 / videoPlayer.duration || 0;
  videoRange.value = durationRangeValue;
  videoRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${durationRangeValue}%, #c4c4c4 ${durationRangeValue}%, #c4c4c4 100%)`;
  if (durationRangeValue >= 100) {
    videoIcon.style.display = 'block';
    playButton.classList.remove('active');
  }
}

let videoSpeed = 1; //normal speed
let speedInfo = document.querySelector('.video_speed');
function speedUp() {
  if (videoSpeed >= 2) {
    return;
  }
  videoPlayer.play();
  videoIcon.style.display = 'none';
  playButton.classList.add('active');
  videoPlayer.playbackRate += 0.25;
  videoSpeed = videoPlayer.playbackRate;
  speedInfo.style.display = 'flex';
  speedInfo.innerText = `${videoSpeed}x`;
}
function speedDown() {
  if (videoSpeed <= 0.25) {
    return;
  }
  videoPlayer.play();
  videoIcon.style.display = 'none';
  playButton.classList.add('active');
  videoPlayer.playbackRate -= 0.25;
  videoSpeed = videoPlayer.playbackRate;
  speedInfo.style.display = 'flex';
  speedInfo.innerText = `${videoSpeed}x`;
}

window.onkeydown = function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    return false;
  }
};


window.addEventListener('scroll', () => {
  coords = videoSection.getBoundingClientRect();
})

document.addEventListener('keydown', (e) => {
  if (coords.top >= coords.height * 80 / 100 * -1 && coords.bottom <= window.innerHeight * 150 / 100) {
    if (e.keyCode === 32) {
      toggleVideoPlay();
    }
    if (e.keyCode === 77) {
      toggleVolume();
    }
    if (e.keyCode === 70) {
      toggleVideoFullScreen();
    }
    if (e.shiftKey && e.keyCode === 188) {
      speedUp();
      setTimeout(() => {
        speedInfo.style.display = 'none';
      }, 350);
      return true;
    }
    if (e.shiftKey && e.keyCode === 190) {
      speedDown();
      setTimeout(() => {
        speedInfo.style.display = 'none';
      }, 350);
      return true;
    }
  }
});
