package es.juntadeandalucia.agapa.cinta.ws1.demows1;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "DUMMY-WS-2")
public interface Demows2Client {

	@GetMapping(path = "/hello", consumes = "application/json")
	public String getHelloMessage();
}
