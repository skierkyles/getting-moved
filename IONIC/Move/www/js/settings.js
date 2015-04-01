var SERVER_ADDRESS = 'http://0.0.0.0:3000';
// var SERVER_ADDRESS = 'http://tttapp.us';




// Untility Functions
function setObject(key, value) {
  window.localStorage[key] = JSON.stringify(value);
}
function getObject(key) {
  return JSON.parse(window.localStorage[key] || '{}');
}
