function fetchWows(url) {
  return new Promise((resolve, reject) => {
    $.get(url, function(data) {
      $xml = $(data);
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

function refreshSlides(urls) {
  return new Promise((resolve, reject) => {
    var promises = urls.map((url) => { return fetchWows(url); });

    Promise.all(promises).then(wows => {
      wows = [].concat.apply([], wows);
      clearSlides();
      wows.forEach((wow) => { addSlide(wow) })
      resolve();
    })
  })
}
