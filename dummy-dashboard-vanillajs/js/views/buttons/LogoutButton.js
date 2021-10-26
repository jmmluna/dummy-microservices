const LOGOUT_BUTTON_ID = 'logoutButton';
const LOGOUT_REDIRECT_URI = 'http://127.0.0.1/dummy-dashboard/logout.html';

class LogoutButton {

	constructor(oauth2Token) {
		this.api = new Api();
		this.oauth2Token = oauth2Token;
//		window.addEventListener('load', this.registerElement.bind(this));
		this.registerElement();
	}

	registerElement() {		
		this._element = document.getElementById(LOGOUT_BUTTON_ID);
		this._element.onclick = this.execute.bind(this);
	};

	async execute() {
		try {
			const exit = await this.api.logout(this.oauth2Token);
			if (exit) {
				localStorage.clear();
				window.location.href = LOGOUT_REDIRECT_URI;
			}
		}
		catch (error) {
			alert(error)
		}

	}
}
