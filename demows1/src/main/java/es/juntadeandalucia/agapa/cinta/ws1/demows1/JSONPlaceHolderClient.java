package es.juntadeandalucia.agapa.cinta.ws1.demows1;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient( name="JSONPlaceHolder", url ="http://jsonplaceholder.typicode.com", configuration = FeignProxyConfiguration.class )
public interface JSONPlaceHolderClient {

	@GetMapping(path = "/todos/2", consumes = "application/json")
	public String getFirstElement();
}
