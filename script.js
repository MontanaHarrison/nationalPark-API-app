const apiKey = 'Iwmd2ckiKXFZBnfJPgX8DE09fNYC6Rox94IEjknl';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function getParks(stateCode, limit) {
  const params = {
    stateCode,
    limit,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(responseJson =>
        displayResults(responseJson))
      .catch(error => alert('Error. Try again later.'));
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#park-list').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#park-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <br>
      <p>${responseJson.data[i].description}<p>
      <br>
      <a href="${responseJson.data[i].url}">Check out the website!</a>
      </li>
      <hr>`
  )};
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateSearch = $('#state').val();
    const maxResults = $('#max').val();
    getParks(stateSearch, maxResults);
  });
}

$(watchForm);