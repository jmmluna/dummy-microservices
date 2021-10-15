package es.juntadeandalucia.agapa.cinta.ws1.demows1;

import java.net.InetSocketAddress;
import java.net.Proxy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import feign.Client;

public class FeignProxyConfiguration {

	@Value("${proxy.user}")
	private String PROXY_USER;
	@Value("${proxy.password}")
	private String PROXY_PASSWORD;
	@Value("${proxy.hostname}")
	private String PROXY_HOSTNAME;
	@Value("${proxy.port}")
	private Integer PROXY_PORT;
	
	@Bean
	public Client feignClient() {

		return new Client.Proxied(null, null,
				new Proxy(Proxy.Type.HTTP, new InetSocketAddress(PROXY_HOSTNAME, PROXY_PORT)),
				PROXY_USER, PROXY_PASSWORD);
	}

}
