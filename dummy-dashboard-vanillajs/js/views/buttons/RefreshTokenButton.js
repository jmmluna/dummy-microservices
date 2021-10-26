const REFRESH_BUTTON_ID = 'refreshTokenButton';

class RefreshTokenButton {

	constructor(oauth2Token) {
		this.api = new Api();
		this.oauth2Token = oauth2Token;
		this.registerElement();
	}

	registerElement() {		
		this._element = document.getElementById(REFRESH_BUTTON_ID);
		this._element.onclick = this.execute.bind(this);
	};

	async execute() {
		try {
			const refreshToken = await this.api.getRefreshToken(this.oauth2Token);
			
		}
		catch (error) {
			alert(error)
		}

	}
}
