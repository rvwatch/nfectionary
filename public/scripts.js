$('#submit').on('click', getToken);

async function getToken(e) {
  e.preventDefault();
  const name = $('#name').val();
  const email = $('#email').val();
  const token = await fetchToken(name, email);
  console.log('token', token);
  $('.token-display').innerText(token);
  $('#name').val('');
  $('#email').val('');
}

async function fetchToken(name, email) {
  const url = 'http://localhost:5000/authenticate';
  const options = {
    method: 'POST',
    body: JSON.stringify({name, email}),
    headers: {
      'content-type': 'application/json'
    }
  }

  try {
    const response = await fetch(url, options);
    const body = await response.json();
    console.log(body);
    if (response.status === 200) {
      return body.token
    } else {
      return body.message
    }
  } catch (error) {
    return error
  }
}