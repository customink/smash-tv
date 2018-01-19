import $ from 'jquery';
import _ from 'lodash';
import queryString from 'query-string';

function departmentUrls() {
  const parsed = queryString.parse(location.search, { arrayFormat: 'bracket' });
  let departments = ["164-engineering", "58-software-engineering"];
  if (!_.isEmpty(parsed.d)) { departments =  parsed.d; }
  return departments.map(department => {
    return `https://circuit.in.customink.com/rss/wows/departments/${department}.xml`;
  })
}

function fetchWows(url) {
  return new Promise((resolve, reject) => {
    $.get(url, function(data) {
      let $xml = $(data);
      var wows = [];
      $xml.find('item').each((index, element) => {
        var target = $(element).find('targets').find('target');
        var description = $(element).find('description').text();
        wows.push({
          target: target.text(),
          description: description
        })
      });
      resolve(wows);
    });
  });
}

function clearSlides() {
  $('.slides section').remove();
}

function addSlide(wow) {
  var title = $('<h2>').html("Wow " + wow.target);
  var p = $('<p>').html(wow.description);
  var slide = $('<section>').append(title).append(p)
  $('.slides').append(slide);
}

export default function refreshSlides() {
  let urls = departmentUrls();
  console.log(urls);
  return new Promise((resolve, reject) => {
    var promises = urls.map((url) => { return fetchWows(url); });

    Promise.all(promises).then(wows => {
      wows = [].concat.apply([], wows);
      wows = _.shuffle(wows);
      clearSlides();
      wows.forEach((wow) => { addSlide(wow) })
      resolve();
    })
  })
}
