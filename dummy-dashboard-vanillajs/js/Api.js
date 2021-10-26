const KEYCLOAK_PORT = 8080;
const KEYCLOAK_HOST = 'localhost';
const CLIENT_ID = 'dummy-backend-client';
const CLIENT_SECRET = '23bf00c4-5c05-4d5a-9a35-35b72ec6c03f';
const REDIRECT_LOGGED_IN = 'http://127.0.0.1/dummy-dashboard';
const REALM = 'dummy-realm';

class Api {

	getAccessToken(consentCode) {

		const header = new Headers();
		header.append('Content-Type', 'application/x-www-form-urlencoded');


		const requestOptions = {
			method: 'POST',
			headers: header,
			body: this.getAuthorizationParameter(consentCode),
			redirect: 'follow',
		};

		return new Promise((resolve, reject) => {
			fetch(
				`http://${KEYCLOAK_HOST}:${KEYCLOAK_PORT}/auth/realms/${REALM}/protocol/openid-connect/token`,
				requestOptions
			)
				.then((response) => response.text())
				.then((result) => {
					const sessionInfo = JSON.parse(result);
					const params = { token: sessionInfo.access_token, refreshToken: sessionInfo.refresh_token, tokenExpiration: sessionInfo.expires_in };
					resolve(new Oauth2Token(params));
				})
				.catch((error) => {
					reject(error);
				});
		});

	}

	getAuthorizationParameter(consentCode) {

		const urlencoded = new URLSearchParams();
		urlencoded.append('client_id', CLIENT_ID);
		urlencoded.append('client_secret', CLIENT_SECRET);
		urlencoded.append('code', consentCode);
		urlencoded.append('grant_type', 'authorization_code');
		urlencoded.append('redirect_uri', REDIRECT_LOGGED_IN);

		return urlencoded;

	}

	getUserInfo(oauth2Token) {
		const url = `${oauth2Token.getIss()}/protocol/openid-connect/userinfo`;
		const headers = new Headers();
		headers.append('Authorization', 'Bearer ' + oauth2Token.getToken());

		const requestOptions = {
			method: 'GET',
			headers: headers,
		};

		return new Promise((resolve, reject) => {
			fetch(url, requestOptions)
				.then((response) => response.text())
				.then((result) => {
					resolve(result)
				})

				.catch((error) => {
					reject(error)
				});
		});
	}

	logout(oauth2Token) {

		const headers = new Headers();
		headers.append('Authorization', 'Bearer ' + oauth2Token.getToken());
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		const url = `${oauth2Token.getIss()}/protocol/openid-connect/logout`;

		const requestOptions = {
			method: 'POST',
			headers: headers,
			body: this.getLogoutParameter(oauth2Token),
			redirect: 'follow',
		};

		return new Promise((resolve, reject) => {

			fetch(url, requestOptions)
				.then((response) => {
					resolve(true);
				})
				.catch((error) => {
					reject(error);
				});

		})
	}

	getLogoutParameter(oauth2Token) {
		const urlencoded = new URLSearchParams();
		urlencoded.append('client_id', CLIENT_ID);
		urlencoded.append('client_secret', CLIENT_SECRET);
		urlencoded.append('refresh_token', oauth2Token.getRefreshToken());

		return urlencoded;

	}

	getRefreshToken(oauth2Token) {		
		const url = `${oauth2Token.getIss()}/protocol/openid-connect/token`;
		const headers = new Headers();

		const requestOptions = {
			method: 'POST',
			headers: headers,
			body: this.getRefreshTokenParameter(oauth2Token),
		};

		return new Promise((resolve, reject) => {

			fetch(url, requestOptions)
				.then((response) => response.text())
				.then((result) => {
					console.log(result)
					resolve({});
				})

				.catch((error) => {
					reject(error);
				});
		})

	}


	getRefreshTokenParameter(oauth2Token) {

		const urlencoded = new URLSearchParams();
		urlencoded.append('client_id', CLIENT_ID);
		urlencoded.append('client_secret', CLIENT_SECRET);
		urlencoded.append('refresh_token', oauth2Token.getRefreshToken());
		urlencoded.append('grant_type', 'refresh_token');

		return urlencoded;

	}
}