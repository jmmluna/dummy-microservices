function showTokenInfo(tokenInfo) {	
	document.getElementById("token").innerHTML = tokenInfo.getToken();
	document.getElementById("tokenExpiration").innerHTML = tokenInfo.getExpiration() + " segundos";	
	document.getElementById("issuer").innerHTML = tokenInfo.getIss();
	document.getElementById("name").innerHTML = tokenInfo.getName();
	document.getElementById("userName").innerHTML = tokenInfo.getUserName();
	document.getElementById("email").innerHTML = tokenInfo.getEmail();
	document.getElementById("roles").innerHTML = tokenInfo.getRoles();
	document.getElementById("age").innerHTML = tokenInfo.getAge();
	
	
	const logoutButton = new LogoutButton(tokenInfo);
	const userInfoButton = new UserInfoButton(tokenInfo);
	const refreshTokenButton = new RefreshTokenButton(tokenInfo);
}