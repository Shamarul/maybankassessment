import {GOOGLE_API_KEY} from '../configs/Api'

/*---- Token Refresher ----*/
async function refresher() {
  let stringHttpStatus;
  const token = sessionStorage.getItem('token');
  let body = {};
  let response = {};

  try {
      body.method = 'POST';
      body.body = {};
      body.headers = {
        'apiToken': token,
        'Content-Type': 'application/json',
      };
      /* .... */
  } catch (err) {
    console.log(new Date().toISOString(), '[Services.refresher]', 'Error:', err);
    response.httpstatus = 400;
    return response;
  }
}

/*---- Attempt ----*/
async function Attempt(method, api, props, dataBody) {
  const token = sessionStorage.getItem('token');
  let body = {};
  let response = {};

  try {
    if (method === 'GET') {
      body.method = method;
      body.headers = {
        apiToken: token,
        'Content-Type': 'application/json',
      };
      response = api(body, props);
      return response;
    } else if (method === 'POST' || method === 'DELETE' || method === 'PUT') {
      body.method = method;
      body.body = JSON.stringify(dataBody);
      body.headers = {
        apiToken: token,
        'Content-Type': 'application/json',
      };
      response = api(body, props);
      return response;
    } else if (method === 'IO') {
      response = await api(token);
      response.httpstatus = 200;
      return response;
    } else if (method === 'LOGIN') {
      body.method = 'POST';
      /* ...... */
      return response;
    } 
  } catch (err) {
    console.log(new Date().toISOString(), '[Services.Attempt]', 'Error:', err);
    response.httpstatus = 400;
    return response;
  }
}

/*---- Services ----*/
async function Services(method, api, props, dataBody) {
  let response = {};
  let refreshStatus = {};
  let stringHttpStatus;
  
  try {
    response = await Attempt(method, api, props, dataBody);

    stringHttpStatus = response?.httpstatus.toString();
    if (stringHttpStatus.charAt(0) === '2') {
      return response;
    } else {
        refreshStatus = await refresher();
        response = await Attempt(method, api, props, dataBody);
        return response;
    }
  } catch (err) {
    console.log(new Date().toISOString(), '[Services]', 'Error:', err);
    response.httpstatus = 400;
    return response;
  }
}

export default Services;
