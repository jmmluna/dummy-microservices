async function start() {
		
  const session = new Session();
  if(session.isOpen()) {
		const oauth2Token = session.getOauth2Token();		
		showTokenInfo(oauth2Token);	
   }
   else {
		const oauth2Token = await session.open();		
		showTokenInfo(oauth2Token);	
   }	
}


start();