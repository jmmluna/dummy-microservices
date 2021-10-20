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

# Configuración

El proyecto es una arquitectura de microservicios basada en **Spring Cloud**, para ello se ha configurado en el sistema las siguientes tecnologías:

 - OpenJDK 16.0.1
 - Apache Maven 3.8.2

## Keycloak ##
Una vez descargado y levantado el servidor de identidad (IS) Keycloak, se llevarán a cabo los siguientes pasos:

1. Crear un realm llamado **dummy-realm**.
2. Crear un rol llamado **dummy_user**
3. Crear un usuario y asociarle el rol anterior.
4. Importar el cliente [dummy-backend-client.json](https://github.com/jmmluna/dummy-microservices/tree/main/conf/dummy-backend-client.json).

## Cliente dummy-dashboard-vanillajs ##
Este proyecto es un cliente web simple (html y js) implementado en **vanillajs**, con la única finalidad de realizar las pruebas oportunas contra la arquitectura de microservicios. 
El despliegue de este cliente se ha realizado en un Apache (XAMP) y para facilitar la integración del proyecto web junto al resto de componentes, se ha definido en el **httpd.conf** el siguiente alias:
```
<IfModule alias_module>
    Alias /dummy-dashboard "{PATH}\dummy-microservices\dummy-dashboard-vanillajs"
    <Directory "{PATH}\dummy-microservices\dummy-dashboard-vanillajs">
    Options Indexes FollowSymLinks Includes ExecCGI
    AllowOverride All
    Require all granted
    </Directory>
</IfModule>    
```    


# Desarrollo 
Para levantar cada proyecto se usa maven de la siguiente manera:
```
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port={PORT} --eurekaServerUrl=http://{HOST}:{PORT}/eureka" 

```

Usar el parámetro -f si se quiere especificar el path del proyecto.
```

mvn spring-boot:run -f {PATH} -Dspring-boot.run.arguments="--server.port={PORT} --eurekaServerUrl=http://{HOST}:{PORT}/eureka" 

```
## Script CLI ##

Para facilitar y automatizar la ejecución de todos los integrantes de la arquitectura **dummy**, se recomienda crear el siguiente script (start-dev.bat) que permite levantar todos los proyectos simultáneamente:

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

## Script CLI Console Emulator (cmder) ##

Si se usa **cmder** para el despliegue de la arquitectua en desarrollo, se podrá definir cada componente en un tab de la consola especificando el nombre de cada uno de ellos:

```
REM *******************KEYCLOAK********************************
cmd /k {PATH}\keycloak-15.0.2\bin\standalone "-new_console:t:Keycloak"

REM *******************APACHE**********************************
cmd /k {PATH}\apache_start.bat "-new_console:t:Apache"

REM ****************EUREKA SERVER******************************
cmd /k mvn spring-boot:run -f .\eureka-server -Dspring-boot.run.arguments="--server.port=8085 --eurekaServerUrl=http://localhost:8085/eureka" "-new_console:t:Eureka"

REM ****************API GATEWAY********************************
cmd /k mvn spring-boot:run -f .\gateway -Dspring-boot.run.arguments="--server.port=9000 --eurekaServerUrl=http://localhost:8085/eureka" "-new_console:t:Gateway"

REM ****************DUMMY WEB SERVICE 1******************************
cmd /k mvn spring-boot:run -f .\demows1 -Dspring-boot.run.arguments="--server.port=9001 --eurekaServerUrl=http://localhost:8085/eureka" "-new_console:t:Demo1ws"

REM ****************DUMMY WEB SERVICE 2******************************
cmd /k mvn spring-boot:run -f .\demows2 -Dspring-boot.run.arguments="--server.port=9002 --eurekaServerUrl=http://localhost:8085/eureka" "-new_console:t:Demo2ws"

```

Se verá el despliegue tal y como se muestra a continuación:

![ScreenShot](/conf/cmder-screenshot.jpg)

# Despliegue

El despligue de la arquitectura estará basado en contenedores docker.

# MIT License

Copyright (c) 2020 José María Martínez Luna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.