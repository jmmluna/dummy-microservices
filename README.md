# dummy-microservices
Proyecto de muestra para la implementación de una arquitectura de microservicios

# Objectivo
Este proyecto pretende plasmar la estructura mínima necesaria para dar un comportamiento reducido de lo que sería una arquitectura de microservicios. 

# Arquitectura
La arquitectura de microservicios dummy está formada por los siguientes:

- Un Servidor de registro y descubrimiento, **Eureka**
- Un microservicio **Demo1ws**.
- Un microservicio **Demo2ws**
- Un servicio centralizado para los microservicios, **API Gateway**. Las peticiones se centralizan a través del api gateway mediante el path: **/api/{service-name}**. El acceso al microservicio será a través del gateway usando Eureka para el auto-descubrimiento por el propio nombre del servicio.
- Un servidor de identidad, **Keycloak**

# Cliente dummy-dashboard-vanillajs
Cliente web de pueba implementado en **vanillajs** para probar la arquitectura de microservicios.

# Para desarrollo
Ejecutar para cada proyecto:
```
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port={PORT} --eurekaServerUrl=http://{HOST}:{PORT}/eureka" 

```

Usar el parámetro -f si se quiere especificar el path del proyecto, de esta manera se puede hacer un script automático para levantar todos los proyectos a la vez:

```
REM ****************EUREKA SERVER******************************
start mvn spring-boot:run -f .\eureka-server -Dspring-boot.run.arguments="--server.port=8085 --eurekaServerUrl=http://localhost:8085/eureka" 

REM ****************API GATEWAY******************************
start mvn spring-boot:run -f .\gateway -Dspring-boot.run.arguments="--server.port=9000 --eurekaServerUrl=http://localhost:8085/eureka" 

REM ****************DUMMY WEB SERVICE 1******************************
start mvn spring-boot:run -f .\demows1 -Dspring-boot.run.arguments="--server.port=9001 --eurekaServerUrl=http://localhost:8085/eureka" 

REM ****************DUMMY WEB SERVICE 2******************************
start mvn spring-boot:run -f .\demows2 -Dspring-boot.run.arguments="--server.port=9002 --eurekaServerUrl=http://localhost:8085/eureka" 

```