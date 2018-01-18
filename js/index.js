import $ from 'jquery';
import _ from 'lodash';
import Reveal from 'reveal.js';
import refreshSlides from './wow.js'

document.addEventListener("DOMContentLoaded", function(event) {

  Reveal.configure({
    dependencies: [],
    progress: false,
    controls: false,
    controlsBackArrows: 'hidden',
    autoSlide: 12000,
    loop: true
  });

  let departments = ["164-engineering", "66-operations-technology", "107-web-operations"];
  let urls = departments.map(department => {
   return `https://circuit.in.customink.com/rss/wows/departments/${department}.xml`;
  })

  Reveal.addEventListener('slidechanged', function( event ) {
    if (Reveal.isLastSlide()) {
      refreshSlides(urls);
    }
  });

 refreshSlides(urls).then(() => {
   Reveal.initialize();
 })

});
