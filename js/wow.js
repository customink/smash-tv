import $ from 'jquery';
import _ from 'lodash';
import queryString from 'query-string';

function departmentUrls() {
  const parsed = queryString.parse(location.search, { arrayFormat: 'bracket' });
  if (_.isEmpty(parsed.d)) {
    throw("RSS feed is required");
  }
  return parsed.d;
}

function fetchWows(url) {
  return new Promise((resolve, reject) => {
    $.get(url, function(data) {
      let $xml = $(data);
      var wows = [];
      $xml.find('item').each((index, element) => {
        var targets = [];
        $(element).find('targets').find('target').each((index, target) => {
          targets.push({
            name: $(target).find('name').text(),
            image: decodeHtml($(target).find('image').text()).trim(),
          });
        });
        var description = $(element).find('description').text();
        wows.push({
          targets: targets,
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
  var names = wow.targets.map(function(target){
    return target.name;
  }).join(",");
  var images = wow.targets.map(function(target){
    return target.image? $('<img>').attr('src', target.image): false;
  });
  var title = $('<h2>').html("Wow " + names);
  var p = $('<p>').html(wow.description);
  var slide = $('<section>').append(images).append(title).append(p)
  $('.slides').append(slide);
}

function decodeHtml(html) {
  var parser = new DOMParser;
  var dom = parser.parseFromString(html, 'text/html')
  var txt = document.createElement("textarea");
  return dom.body.textContent;
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
