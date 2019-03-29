
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function decodeHtml(html) {
  var parser = new DOMParser;
  var dom = parser.parseFromString(html, 'text/html')
  var txt = document.createElement("textarea");
  return dom.body.textContent;
}

function getRndBackgroundColorClass() {
  const backgroundColorClasses = ['background-red', 'background-blue', 'background-teal', 'background-purple', 'background-gray'];
  return backgroundColorClasses[getRndInteger(0, backgroundColorClasses.length)];
}

export { getRndBackgroundColorClass, decodeHtml }