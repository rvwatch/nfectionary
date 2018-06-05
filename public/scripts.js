$('#submit').on('click', getToken);

async function getToken(event) {
  event.preventDefault();
  const name = $('#name').val();
  const email = $('#email').val();
  const token = await fetchToken(name, email);
  
  $('.token-display').text(token);
  $('#name').val('');
  $('#email').val('');
}

async function fetchToken(name, email) {
  const url = '/authenticate';
  const options = {
    method: 'POST',
    body: JSON.stringify({name, email}),
    headers: {
      'content-type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    const body = await response.json();

    return body.token;
  } catch (error) {
    return error;
  }
}