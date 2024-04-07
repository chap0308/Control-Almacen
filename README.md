#ENV:
- DB_HOST = localhost
- DB_USER = root
- DB_PASS = root
- DB_NAME = bd_almacen3

- EMAIL_HOST = sandbox.smtp.mailtrap.io
- EMAIL_PORT = 2525
- EMIAL_USER = 
- EMAIL_PASS = 

- APP_URL = http://localhost:3000

# Control_Almacen
## Comandos para levantar el proyecto:

1. Para xampp: Entrar a su cmd y escribir lo siguiente

```bash

$ cd "Ruta en donde está guardado el proyecto"

$ cd public

$ php -S localhost:3000

```

2. Otra forma: Usar la terminal integrada de VSCode o las terminales de sus sistemas operativos( Windows: PowerShell, Mac: Shell)

```bash

$ cd "Ruta en donde está guardado el proyecto"

$ cd public

$ php -S localhost:3000

```
3. Finalmente entrar a http://localhost:3000

4. Ir a includes/.env.template y seguir las instrucciones

5. Para hacer modificaciones en los archivos de javaScript(src/js/app.js) usar el siguiente comando (Descargar nodeJs para que funcione)

```bash

$ npx gulp

```

6. IMPORTANTE: Ir a la ruta del archivo src/js y buscar en las carpetas app.js, buscadorInventario.js y entrada.js la palabra "fetch" usando CTRL+F y escribir fetch. Luego descomentar el los codigos parecidos a //! const url =`${location.origin}/api/productos`; y comentar el codigo parecido a const url = '/api/productos'; Hacer eso en todos los url de los archivos mencionados.  Luego usar "npx gulp" para actualizar los cambios en la terminal de VSCode (Recuerda descargar node para usar este comando)

## Usar `${location.origin}/api/productos` para desarrollo
## Usar '/api/productos' para produccion (para el deployment)

# RECUERDA TENER COMPOSER INSTALADO PARA LAS LIBRERIAS Y PARA COLOCAR UNA NUEVA LIBRERIA, SOLO DEBEMOS IR A composer.json y colocar la libreria:
```json
    "require": {
        "phpmailer/phpmailer": "^6.8",
        "vlucas/phpdotenv": "^5.5"
    }
```
# RECORDAR: para cada nuevo autload que escribas usar: composer update

# Usuario admin:

- user: juan_123@correo.com
- password: 123456789

# Usuario trabajador:

- user: pepe123@correo.com
- password: 123456


