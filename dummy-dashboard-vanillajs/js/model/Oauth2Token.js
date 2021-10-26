class Oauth2Token {

	constructor(params) {
		this.token = params.token;
		this.tokenJson = this.parseJwt(params.token);
		this.refreshToken = params.refreshToken;
		this.tokenExpiration = params.tokenExpiration;
	}

	getIss() {
		return this.tokenJson.iss;
	}

	getToken() {
		return this.token;
	}

	getExpiration() {
		return this.tokenExpiration;
	}

	getRefreshToken() {
		return this.refreshToken;
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

	parseJwt(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	}
}