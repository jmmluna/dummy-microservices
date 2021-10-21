class Session {

	isOpen() {
		let open = false;
		const jwt = localStorage.token;
		const refreshToken = localStorage.refreshToken;

		if (jwt) {
			open = true;
			this.tokenInfo = new TokenInfo(jwt, refreshToken);
		}

		return open;
	}

	open() {
		if (this.getConsentCode()) {
			this.openSessionWithConsentCode()
		}
		else {
			alert("No se puede iniciar sesión sin código de consentimiento");
			window.location.href = "http://127.0.0.1:9000";
		}
	}

	//TODO: insertar promesa, delegar en un API para la llamada
	openSessionWithConsentCode() {

		const header = new Headers();
		header.append('Content-Type', 'application/x-www-form-urlencoded');


		const requestOptions = {
			method: 'POST',
			headers: header,
			body: this.getConsentCodeAuthParameter(),
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
				const refreshToken = sessionInfo.refresh_token;
				const tokenExpiration = sessionInfo.expires_in;
				this.tokenInfo = new TokenInfo(token, refreshToken);
				this.saveToken({ token, refreshToken, tokenExpiration });

			})
			.catch((error) => {
				console.log('error', error);
			}
			);
	}

	saveToken(tokenInfo) {
		localStorage.setItem("token", tokenInfo.token);
		localStorage.setItem("refreshToken", tokenInfo.refreshToken);
		localStorage.setItem("tokenExpiration", tokenInfo.tokenExpiration);
	}

	getConsentCode() {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());
		return params.code;

	}

	getConsentCodeAuthParameter() {

		const urlencoded = new URLSearchParams();
		urlencoded.append('client_id', 'dummy-backend-client');
		urlencoded.append('client_secret', '23bf00c4-5c05-4d5a-9a35-35b72ec6c03f');
		urlencoded.append('code', this.getConsentCode());
		urlencoded.append('grant_type', 'authorization_code');
		urlencoded.append('redirect_uri', 'http://127.0.0.1/dummy-dashboard');

		return urlencoded;

	}

	getTokenInfo() {
		return this.tokenInfo;
	}

}