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
