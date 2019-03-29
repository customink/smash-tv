import $ from 'jquery';
import Reveal from 'reveal.js';
import refreshSlides from './wow.js';
import { getRndBackgroundColorClass } from './util.js';

document.addEventListener("DOMContentLoaded", function(event) {

  Reveal.configure({
    dependencies: [],
    progress: false,
    controls: false,
    controlsBackArrows: 'hidden',
    autoSlide: 12000,
    loop: true
  });

  Reveal.addEventListener('slidechanged', function( event ) {
    if (Reveal.isLastSlide()) { refreshSlides(); } 
    $('body').toggleClass(getRndBackgroundColorClass());
  });

  refreshSlides().then(() => {
    Reveal.initialize();
  })

});
