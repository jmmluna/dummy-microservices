# dummy-microservices
Proyecto de muestra para la implementación de una arquitectura de microservicios

# Objetivo
Este proyecto pretende plasmar la estructura mínima necesaria para dar un comportamiento reducido de lo que sería una arquitectura de microservicios. 

# Arquitectura
La arquitectura de microservicios dummy está formada por los siguientes:

- Un Servidor de registro y descubrimiento, **Eureka**
- Un microservicio **Demo1ws**.
- Un microservicio **Demo2ws**
- Un servicio centralizado para los microservicios, **API Gateway**. Las peticiones se centralizan a través del api gateway mediante el path: **/api/{service-name}**. El acceso al microservicio será a través del gateway usando Eureka para el auto-descubrimiento por el propio nombre del servicio.
- Un servidor de identidad, **Keycloak**

# Cliente dummy-dashboard-vanillajs
Este proyecto es un cliente web simple (html y js) implementado en **vanillajs**, con la única finalidad de realizar las pruebas oportunas contra la arquitectura de microservicios. 
El despliegue de este cliente se ha realizado en un Apache (XAMP) y para facilitar la integración del proyecto web junto al resto de componentes, se ha definido en el **httpd.conf** el siguiente alias:
```
	Alias /dummy-dashboard "{PATH}\dummy-microservices\dummy-dashboard-vanillajs"
    <Directory "{PATH}\dummy-microservices\dummy-dashboard-vanillajs">
    Options Indexes FollowSymLinks Includes ExecCGI
    AllowOverride All
    Require all granted
    </Directory>
```    


# Desarrollo
Para levantar cada proyecto se usa maven de la siguiente manera:
```
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port={PORT} --eurekaServerUrl=http://{HOST}:{PORT}/eureka" 

```

Usar el parámetro -f si se quiere especificar el path del proyecto.
```

start mvn spring-boot:run -f {PATH} -Dspring-boot.run.arguments="--server.port=8085 --eurekaServerUrl=http://{HOST}:{PORT}/eureka" 

```
## Script completo 

Para facilitar y automatizar la ejecución de todos los integrantes de la arquitectura **dummy**, se ha creado el siguiente script (start-dev.bat) para levantar todos los proyectos a la vez:
```
REM *******************KEYCLOAK****************************
start {PATH}\keycloak-15.0.2\bin\standalone

REM *******************APACHE****************************
start {PATH}\apache_start.bat

REM ****************EUREKA SERVER******************************
start mvn spring-boot:run -f .\eureka-server -Dspring-boot.run.arguments="--server.port=8085 --eurekaServerUrl=http://localhost:8085/eureka" 

REM ****************API GATEWAY******************************
start mvn spring-boot:run -f .\gateway -Dspring-boot.run.arguments="--server.port=9000 --eurekaServerUrl=http://localhost:8085/eureka" 

REM ****************DUMMY WEB SERVICE 1******************************
start mvn spring-boot:run -f .\demows1 -Dspring-boot.run.arguments="--server.port=9001 --eurekaServerUrl=http://localhost:8085/eureka" 

REM ****************DUMMY WEB SERVICE 2******************************
start mvn spring-boot:run -f .\demows2 -Dspring-boot.run.arguments="--server.port=9002 --eurekaServerUrl=http://localhost:8085/eureka" 


```