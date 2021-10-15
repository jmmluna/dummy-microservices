package es.juntadeandalucia.agapa.cinta.ws2.demows2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableEurekaClient
public class Demows2Application {

	public static void main(String[] args) {
		SpringApplication.run(Demows2Application.class, args);
	}
	
	@GetMapping("/")	
	public String entrypointDefault() {
		return "Demo servicio web 2";
	}
	
	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Desde Servicio web 2 ----....Hello %s!", name);
	}

}
