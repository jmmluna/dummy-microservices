const USER_INFO_BUTTON_ID = 'userInfoButton';

class UserInfoButton {

	constructor(oauth2Token) {
		this.api = new Api();
		this.oauth2Token = oauth2Token;
		//window.addEventListener('load', this.registerElement.bind(this));
		this.registerElement();
	}

	registerElement() {		
		this._element = document.getElementById(USER_INFO_BUTTON_ID);		
		this._element.onclick = this.execute.bind(this);
	};

	async execute() {		
		const userInfo = await this.api.getUserInfo(this.oauth2Token);
		console.log(userInfo);
	}
}
