
const KEYCLOAK_URL = 'http://127.0.0.1:8080';
const REALM_NAME = 'dummy-realm';
const LOGOUT_REDIRECT_URI = 'http://127.0.0.1/dummy-dashboard/logout.html';


const session = new Session();
if(session.isOpen()) {
	const tokenInfo = session.getTokenInfo();		
	showTokenInfo(tokenInfo);	
}
else {
	session.open();
}
	


/*if (localStorage.token) {
	
	
	const tokenInfo = new TokenInfo(localStorage.token);
	
		
	showTokenInfo({token:localStorage.token, tokenExpiration:localStorage.tokenExpiration});
	}
else if (getConsentCode())
	openSessionWithConsentCode();
else
	window.location.href = "http://127.0.0.1:9000";*/