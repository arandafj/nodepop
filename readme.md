# DevOps
- Para realizar la práctica del *módulo DevOps* se ha desplegado la aplicación en una instancia de AWS. La Url es:
  http://ec2-23-23-33-66.compute-1.amazonaws.com 

- Contenido a través de IP http://23.23.33.66 ó a través de dominio http://fjaranda.com

- Ficheros estáticos:
  http://ec2-23-23-33-66.compute-1.amazonaws.com/images/anuncios/bici.jpg
  http://ec2-23-23-33-66.compute-1.amazonaws.com/images/anuncios/iphone.png


#nodepop

API que proporciona servicios a aplicaciones móviles iOS y Android. 
Utiliza una base de datos MongoDB con las colecciones *Anuncios*, *Usuarios* y *Tokens*. Y para maximizar el rendimiento implementa cluster. 

## Modos de arranque

###Iniciar instancia
 ```
 $nodemon
 ```
 ```
 $npm start  
 ```

###Iniciar en modo desarrollo
 ```
 $npm run dev
 ```

### Inicializar la Base de Datos
Script que permite inicializar la BD con datos de pruebas para las colecciones *anuncios* y *usuarios*. 
  
```
$npm run installDB
```

##Servicios que proporciona la API
En todos los servicios opcionalmente se puede especificar el idioma de los mensajes de error con el parámetro *lang* (*es* español o *en* inglés). Por defecto los mensajes se muestran en español.

###Registro [POST]

Requiere los siguientes parámetros en el body (x-www-form-urlencoded):

- **nombre** 
- **email** 
- **clave**  

```
Método: POST
/apiv1/usuarios/register?lang=en
```
El *email* esta indexado y la *clave* se guarda en un hash. 

###Autenticación [POST]

Requiere en el body los parámetros:

- **email**
- **password**

```
Método: POST
/apiv1/usuarios/authenticate
```

La autenticación se realiza mediante JSON Web Token. 

###Lista de anuncios [GET]

Para usar este servicio hay que estar autenticado. Se pueden aplicar los siguientes parámetros opcionales:

- **tags**   [work, lifestyle, motor, mobile]
- **venta**  [true o false]
- **precio** [10-50, 10- , -50 ó 50]
- **nombre** [término de búsqueda]
- **start**  [número por el que empezara]
- **limit**  [número máximo que devolverá]
- **sort**   [ordena resultado]

Parámetro obligatorio:

- **token**

```
Método: GET
/apiv1/anuncios/lista
```

Llamada de ejemplo: 

```
http://localhost:3000/apiv1/anuncios/lista?&tags=mobile&venta=false&start=0&limit=2&precio=-50&nombre=ne&sort=precio&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJjbGF2ZSI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJub21icmUiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJjbGF2ZSI6dHJ1ZSwiZW1haWwiOnRydWUsIm5vbWJyZSI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9fdiI6MCwiY2xhdmUiOiJhNjY1YTQ1OTIwNDIyZjlkNDE3ZTQ4NjdlZmRjNGZiOGEwNGExZjNmZmYxZmEwN2U5OThlODZmN2Y3YTI3YWUzIiwiZW1haWwiOiJwcnVlYmFAcHJ1ZWJhLmNvbSIsIm5vbWJyZSI6InBydWViYSIsIl9pZCI6IjU3MjlkM2UxMGQxZDUzNGEwM2Q0NWQ3ZiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ2MjM1OTI0MCwiZXhwIjoxNDYyMzYwNjgwfQ.IOlDgBT9MmvVXlEj4u-1qPbeuAaEY5qZ4c-9FMGmE_I
```

###Guardar token de Push [POST]
Para usar este servicio no hay que estar autenticado. Recibe los siguientes parámetros en el body (x-www-form-urlencoded): 

- **plataforma** [iOS ó Android]
- **token**      [obligatorio]
- **usuario**    [opcional]

```
Método: POST
/apiv1/tokenPush
```

###Lista de tags [GET]

No hace falta estar autenticado en este caso. Devuelve una lista de los tags disponibles.

```
Método: GET
/apiv1/anuncios/tags
```

#### Carpeta de Imagenes [GET]

No es necesario estar autenticado, y nos devuelve la imagen del anuncio especificado.

```
Método: GET
/anuncios/<nombre_imagen>
```



