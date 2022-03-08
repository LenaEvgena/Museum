function compareSlide() {
  var x, i;
  /*find all elements with an "overlay" class:*/
  x = document.getElementsByClassName('explore_overlay');
  for (i = 0; i < x.length; i++) {
    /*once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the imagesCompare function:*/
    imagesCompare(x[i]);
  }

  function imagesCompare(img) {
    var slider, img, clicked = 0, w, h;
    /*get the width and height of the img element*/
    w = img.offsetWidth;
    h = img.offsetHeight;

    /*set the width of the img element to 50%:*/
    img.style.width = (w * 61.1 / 100) + "px";

    slider = document.querySelector('.explore_slider-pic');` `
    /*position the slider in the middle:*/
    slider.style.top = (h * 49 / 100) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w * 61.1 / 100) - (slider.offsetWidth / 2) + "px";

    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("mousedown", slideIsReady);

    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", slideIsFinish);

    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideIsReady);

    /*and released (for touch screens:*/
    window.addEventListener("touchstop", slideIsFinish);

    function slideIsReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMoving);
      window.addEventListener("touchmove", slideMoving);
    }

    function slideIsFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }

    function slideMoving(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;

      /*get the cursor's x position:*/
      pos = getCursorPosition(e)

      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;

      /*execute a function that will resize the overlay image according to the cursor:*/
      startSlide(pos);
    }

    function getCursorPosition(e) {
      var a, x = 0;
      e = e || window.event;

      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();

      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;

      /*consider any page scrolling:*/
      x = x - window.pageXOffset;

      return x;
    }
    function startSlide(x) {
      /*resize the image:*/
      img.style.width = x + "px";

      /*position the slider:*/
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}

compareSlide();
