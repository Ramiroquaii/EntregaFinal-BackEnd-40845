# BackEnd - Comision - 40845
Coder HouseCurso - Curso BackEnd

*Alumno:* **RAMIRO O. VECHIOLA**

*Profesor:* **RAFAEL OCHOA**

*Tutor Personal:*  
**Anderson Ocaña** (Hasta Finalizar el Curso)  
**Estanislao Valdez** (hasta el 21/03/2023)  
**Michel Douglas Ezequiel Chamarez Richards** (hasta el 02/01/2023)

# ENTREGA PROYECTO FINAL
TIEMPO LIMITE 29/05/2023

**Para ejecutar comando: node server.js**  
**Posibilidad de configurar por comando el puerto de ejecución del servidor:**  
**node server.js --serverPort 8181 o node server.js -p 8181**  

>>WOKRFLOW A TRAVES DE LA APLICACION:  
Iniciado en localhost:PORT/ se cargara la vista de login de usuarios.  
Usuarios existentes en la base de datos MongoAtlas: Ramiro (admin) - Pass: Ramiro1234 / Rafael (comun) - Pass: Rafael1234  
Se cargara la vista principal donde se saluda, se presentan los 4 botones de acciones SALIR - CARRITO - ADMINISTRAR - INFORMACION  
- SALIR vuelve al login cierra la app.  
- CARRITO simplemente muestyra el vector que contiene {Producto:_id, cantidad: x} para cada producto agregado, no se desarrollo vista o contenido adicional simplemente se visualiza en formato de texto.  
- ADMINISTRAR si se tiene el permiso de administrador se carla el panel de alta de productos (esta el CRUD pero no esta conectado al front end solo opera por ruta o postman).  
- INFORMACION cierra sesion y redirige a una vista con HANDLEBARS que muestra la informacion del servidor que se esta ejecutando.  
En la vista principal abajo de todo se carga la simulación del chat con WEBSOCKETS esnviando mensajes individuales y notificando a todos los socket conectados.

>>RUTAS DE LA APLICAICON:
- GET /registro -> Solicitud de vista de registro para cargar un nuevo usuario.
- POST /register -> Envío de datos para procesar el registro de un nuevo usuario.
- GET /info -> Vista de información con PLANTILLAS.

- POST /login -> Generación del JWT ante validación exitosa.
- GET /mainPage -> Protegida por JWT
- GET /adminPage -> Protegida por JWT

>>RUTAS DE LA API:  
De consumo libre sin autenticación, sería conveniente de todos modos incluir al menos todos los métodos PUT, POST, DELETE a la lista de protegidos y dejar solamente los métodos de consulta GET libres al público.    
Rutas de acceso para consulta GET, modificación PUT, inserción POST y eliminación DELETE que conforman el CRUD de datos de la aplicación.  

- GET /api/productos
- GET /api/productos/:id
- POST /api/productos
- DELETE /api/productos/:id
- PUT /api/productos/:id

- GET /api/mensajes
- GET /api/mensajes/:msgAutor
- POST /api/mensajes

- GET /api/carritos
- GET /api/carrito/:id
- GET /api/carrito/user/:id
- POST /api/carrito
- DELETE /api/carrito/:id
- PUT /api/carrito/:id

**Dependecias utilizadas:**  
    "bcrypt": "^5.1.0"  
    "dotenv": "^16.0.3"  
    "express": "^4.18.2"  
    "express-handlebars": "^7.0.7"  
    "express-session": "^1.17.3"  
    "jsonwebtoken": "^9.0.0"  
    "log4js": "^6.9.1"  
    "mongodb": "^5.5.0"  
    "socket.io": "^4.6.1"  
    "yargs": "^17.7.2"  
