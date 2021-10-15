package es.juntadeandalucia.agapa.cinta.ws1.demows1;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class Demows1Application {	
	private static final Logger LOGGER = LoggerFactory.getLogger(Demows1Application.class);
	
	public static void main(String[] args) {		
		SpringApplication.run(Demows1Application.class, args);
		
		LOGGER.info("***************DUMMY 1 WEB SERVICE*******************");
		
	}
	
}
