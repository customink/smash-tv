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

function addSlides(departments) {
  return new Promise((resolve, reject) => {
    var promises = departments.map((department) => {
      var url = `https://circuit.in.customink.com/rss/wows/departments/${department}.xml`;
      return fetchWows(url);
    });

    Promise.all(promises).then(wows => {
      var merged = [].concat.apply([], wows);

      $('.slides section').remove();
      merged.forEach((wow) => {
        var title = $('<h2>').html("Wow " + wow.target);
        var p = $('<p>').html(wow.description);
        var slide = $('<section>').append(title).append(p)
        $('.slides').append(slide);
      });

      resolve();
    })
  })
}
