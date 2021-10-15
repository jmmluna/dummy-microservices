package es.juntadeandalucia.agapa.cinta.ws1.demows1;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Demows1Controller {
		
	@Autowired	
	private Demows2Client demows2Client;
	
	@Autowired	
	private JSONPlaceHolderClient jsonPlaceHolderClient;
	
	@GetMapping("/")
	public String defaultEntryPoint() {
		return "Micro servicio Demo 1";
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Desde Servicio web 1 *****....Hello %s!", name);
	}
	
	@GetMapping("/call")
	public String getServiceUrl() {		
		return demows2Client.getHelloMessage();
	}
	
	@GetMapping("/jsonplaceholder")
	public String getFakeRest() {		
		return jsonPlaceHolderClient.getFirstElement();
	}
	
}
