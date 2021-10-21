class TokenInfo {
	
	constructor(jwt, refreshToken) {
		this.jwt = jwt;
		this.tokenJson = parseJwt(jwt);
		this.refreshToken = refreshToken;
	}
	
	getIss() {
		return this.tokenJson.iss;
	}
	
	getJwt() {
		return this.jwt;
	}
	
	getExpiration() {
		return localStorage.tokenExpiration
	}
	
	getRefreshToken() {
		return this.getRefreshToken;
	}
	
	getName() {
		return this.tokenJson.name;
	}
	
	getUserName() {
		return this.tokenJson.preferred_username;
	}
	
	getEmail() {
		return this.tokenJson.email;
	}
	
	getRoles() {
		return this.tokenJson.realm_access.roles;
	}
	
	getAge() {
		return this.tokenJson.age;
	}
	
}