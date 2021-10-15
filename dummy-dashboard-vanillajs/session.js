const KEYCLOAK_URL = 'http://127.0.0.1:8080';
const REALM_NAME = 'dummy-realm';
const LOGOUT_REDIRECT_URI = 'http://127.0.0.1/dummy-dashboard/logout.html';
	
//const token = localStorage.getItem("token");
if(localStorage.token)
  showToken(localStorage.token);
else
  loadToken();



//----------------------------------------------------------
function loadToken() {

  const header = new Headers();
  header.append('Content-Type', 'application/x-www-form-urlencoded');


  const requestOptions = {
    method: 'POST',
    headers: header,
    body: getConsentCodeAuthParameter(),
    redirect: 'follow',
  };

  fetch(
    'http://127.0.0.1:8080/auth/realms/dummy-realm/protocol/openid-connect/token',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const sessionInfo = JSON.parse(result);
      const token = sessionInfo.access_token;
      showToken(token);
      saveToken(token);
    })    
    .catch((error) => {
      console.log('error', error);
      logout();
    }
    );
}

function logout() {
  alert("Logout");

  const headers = new Headers();
  
  if (localStorage.token) {
    headers.append('Authorization', 'Bearer ' + localStorage.token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }
  else {
    alert("No se puede hacer logout, no se encuentra el token!!")
    return;
  }

  //const url = `http://${KEYCLOAK_URL}/auth/realms/${REALM_NAME}/protocol/openid-connect/logout?redirect_uri=${LOGOUT_REDIRECT_URI}`;
  const url = `http://${KEYCLOAK_URL}/auth/realms/${REALM_NAME}/protocol/openid-connect/logout`;
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: getLogoutParameter(),
    redirect: 'follow',       
  };

  fetch(url, requestOptions)
    .then((response) => console.log(response))   
    .catch((error) => {
      console.log('error', error);
    }
    );
}




function getAuthParameter() {

  const urlencoded = new URLSearchParams();
  urlencoded.append('client_id', 'dummy-backend-client');
  urlencoded.append('client_secret', '23bf00c4-5c05-4d5a-9a35-35b72ec6c03f');
  urlencoded.append('username', 'jmmluna');
  urlencoded.append('password', 'jmmluna');
  urlencoded.append('grant_type', 'password');
  urlencoded.append('scope', 'openid');
  
  return urlencoded;

}

function getConsentCodeAuthParameter() {

  const urlencoded = new URLSearchParams();
  urlencoded.append('client_id', 'dummy-backend-client');
  urlencoded.append('client_secret', '23bf00c4-5c05-4d5a-9a35-35b72ec6c03f');
  urlencoded.append('code', getConsentCode());
  urlencoded.append('grant_type', 'authorization_code');
  urlencoded.append('redirect_uri', 'http://127.0.0.1/dummy-dashboard');
  
  return urlencoded;

}

function getLogoutParameter() {

  const urlencoded = new URLSearchParams();
  urlencoded.append('client_id', 'dummy-backend-client');
  urlencoded.append('client_secret', '23bf00c4-5c05-4d5a-9a35-35b72ec6c03f');  
  urlencoded.append('redirect_uri', LOGOUT_REDIRECT_URI);
  
  return urlencoded;

}

function getConsentCode() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params.code;

}

function saveToken(token) {
  localStorage.setItem("token", token);
}


function showToken(token) {
  //const session = JSON.parse(info);  
  document.getElementById("token").innerHTML=token;
  const tokenInfo = parseJwt(token);
  

  //alert(JSON.stringify(tokenInfo));

  document.getElementById("name").innerHTML=tokenInfo.name;
  document.getElementById("userName").innerHTML=tokenInfo.preferred_username;
  document.getElementById("email").innerHTML=tokenInfo.email;
  document.getElementById("roles").innerHTML=tokenInfo.realm_access.roles;
  document.getElementById("age").innerHTML=tokenInfo.age;
    
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}



//--------------------------


