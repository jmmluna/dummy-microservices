
class Session {
	
	constructor() {
		this.api = new Api();
	}		
	
	isOpen() {
		let open = false;
		const token = localStorage.token;		
		
		if (token) {
			open = true;
			const params = { token, refreshToken: localStorage.refreshToken, tokenExpiration: localStorage.tokenExpiration };
			this.oauth2Token = new Oauth2Token(params);
		}

		return open;
	}

	async open() {
		if (this.getConsentCode()) {
			await this.openSessionWithConsentCode();
			return this.getOauth2Token();
		}
		else {
			alert("No se puede iniciar sesión sin código de consentimiento");
			window.location.href = "http://127.0.0.1:9000";
		}
	}

	async openSessionWithConsentCode() {
		
		this.oauth2Token = await this.api.getAccessToken(this.getConsentCode());		
		this.saveToken();
	}

	saveToken() {		
		localStorage.setItem("token", this.oauth2Token.getToken());
		localStorage.setItem("refreshToken", this.oauth2Token.getRefreshToken());
		localStorage.setItem("tokenExpiration", this.oauth2Token.getExpiration());		
	}

	getConsentCode() {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());
		return params.code;

	}

	getOauth2Token() {
		return this.oauth2Token;
	}

}