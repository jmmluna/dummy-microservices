
//----------------------------------------------------------
//function openSessionWithConsentCode() {
//
//	const header = new Headers();
//	header.append('Content-Type', 'application/x-www-form-urlencoded');
//
//
//	const requestOptions = {
//		method: 'POST',
//		headers: header,
//		body: getConsentCodeAuthParameter(),
//		redirect: 'follow',
//	};
//
//	fetch(
//		'http://127.0.0.1:8080/auth/realms/dummy-realm/protocol/openid-connect/token',
//		requestOptions
//	)
//		.then((response) => response.text())
//		.then((result) => {
//			const sessionInfo = JSON.parse(result);
//			const token = sessionInfo.access_token;
//			const refreshToken = sessionInfo.refresh_token;
//			const tokenExpiration = sessionInfo.expires_in;
//
//
//			showTokenInfo({token, tokenExpiration});
//			saveToken({ token, refreshToken, tokenExpiration });
//
//			
////			  "expires_in": 36000,
////			  "refresh_expires_in": 1800,
////			  "refresh_token": 
////			  "token_type": "Bearer",
////			  "id_token": 
//			
//
//
////			alert(result)
//		})
//		.catch((error) => {
//			console.log('error', error);
//			//logout();
//		}
//		);
//}


function getRefreshToken() {
	const url = 'http://localhost:8080/auth/realms/dummy-realm/protocol/openid-connect/token';
	const headers = new Headers();

	//	if (localStorage.token) {
	//		headers.append('Authorization', 'Bearer ' + localStorage.token);
	//	}

	const requestOptions = {
		method: 'POST',
		headers: headers,
		body: getRefreshTokenParameter(),
	};

	fetch(url, requestOptions)
		.then((response) => response.text())
		.then((result) => {
			console.log(result)
		})

		.catch((error) => {
			console.log('error', error);
		}
		);
}




function getUserInfo() {
	const url = 'http://localhost:8080/auth/realms/dummy-realm/protocol/openid-connect/userinfo';
	const headers = new Headers();

	if (localStorage.token) {
		headers.append('Authorization', 'Bearer ' + localStorage.token);
	}

	const requestOptions = {
		method: 'GET',
		headers: headers,
	};

	fetch(url, requestOptions)
		.then((response) => response.text())
		.then((result) => {
			console.log(result)
		})

		.catch((error) => {
			console.log('error', error);
		}
		);
}

function logout() {

	const headers = new Headers();

	if (localStorage.token) {
		headers.append('Authorization', 'Bearer ' + localStorage.token);
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
	}
	else {
		alert("No se puede hacer logout, no se encuentra el token!!");
		//window.location.href = LOGOUT_REDIRECT_URI;
		return;
	}


	const url = `${KEYCLOAK_URL}/auth/realms/${REALM_NAME}/protocol/openid-connect/logout`;

	const requestOptions = {
		method: 'POST',
		headers: headers,
		body: getLogoutParameter(),
		redirect: 'follow',
	};

	fetch(url, requestOptions)
		.then((response) => {			
			localStorage.clear();
			window.location.href = LOGOUT_REDIRECT_URI;
		})
		.catch((error) => {
			console.log('error', error);
		}
	);
}




function getRefreshTokenParameter() {

	const urlencoded = new URLSearchParams();
	urlencoded.append('client_id', 'dummy-backend-client');
	urlencoded.append('client_secret', '23bf00c4-5c05-4d5a-9a35-35b72ec6c03f');
	urlencoded.append('refresh_token', localStorage.refreshToken);
	urlencoded.append('grant_type', 'refresh_token');

	return urlencoded;

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

//function getConsentCodeAuthParameter() {
//
//	const urlencoded = new URLSearchParams();
//	urlencoded.append('client_id', 'dummy-backend-client');
//	urlencoded.append('client_secret', '23bf00c4-5c05-4d5a-9a35-35b72ec6c03f');
//	urlencoded.append('code', getConsentCode());
//	urlencoded.append('grant_type', 'authorization_code');
//	urlencoded.append('redirect_uri', 'http://127.0.0.1/dummy-dashboard');
//
//	return urlencoded;
//
//}

function getLogoutParameter() {

	const urlencoded = new URLSearchParams();
	urlencoded.append('client_id', 'dummy-backend-client');
	urlencoded.append('client_secret', '23bf00c4-5c05-4d5a-9a35-35b72ec6c03f');
	urlencoded.append('refresh_token', localStorage.refreshToken);
//	urlencoded.append('redirect_uri', LOGOUT_REDIRECT_URI);

	return urlencoded;

}

/*function getConsentCode() {
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	return params.code;

}*/

function saveToken(tokenInfo) {
	localStorage.setItem("token", tokenInfo.token);
	localStorage.setItem("refreshToken", tokenInfo.refreshToken);
	localStorage.setItem("tokenExpiration", tokenInfo.tokenExpiration);
	
}

function showTokenInfo(tokenInfo) {
	document.getElementById("token").innerHTML = tokenInfo.getJwt();
	document.getElementById("tokenExpiration").innerHTML = tokenInfo.getExpiration() + " segundos";	
	document.getElementById("issuer").innerHTML = tokenInfo.getIss();
	document.getElementById("name").innerHTML = tokenInfo.getName();
	document.getElementById("userName").innerHTML = tokenInfo.getUserName();
	document.getElementById("email").innerHTML = tokenInfo.getEmail();
	document.getElementById("roles").innerHTML = tokenInfo.getRoles();
	document.getElementById("age").innerHTML = tokenInfo.getAge();
}


function getTokenInfo(token) {	
	return parseJwt(token);
}

function getTokenIssuer() {
	
}


function parseJwt(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}



//--------------------------


