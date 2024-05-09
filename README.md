# Project API REST con FastApi

## Tabla de Contenidos
1. Descripción
2. Requisitos
3. Instalación
4. Uso
5. API Endpoints
6. Estructura del Proyecto

> [!IMPORTANT] 
>## Descripción
>Este proyecto de prueba fue creado para explorar y demostrar diversas funcionalidades de Express, >manejando la gestión de usuarios básica (CRUD). La estructura modular del código permite una fácil >expansión y adaptación a necesidades futuras.

## Requisitos

- Node.js: Express es un marco de aplicación web para Node.js, por lo que necesitarás tener Node.js instalado en tu sistema.
- NPM (Node Package Manager): Viene con Node.js y te permite instalar y administrar paquetes de Node.js.
- Express: Puedes instalar Express con NPM utilizando el comando npm install express.


## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio**: Primero, necesitas clonar el repositorio en tu máquina local. Puedes hacerlo utilizando el siguiente comando en tu terminal:
    
    ```
    git clone https://github.com/DeiviHerreraDiaz09/Documentation-TECHNOLOGIES.git
    ```

2. **Instalar las dependencias**: Una vez que hayas clonado el repositorio, navega hasta el directorio del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:
    
    ```
    npm install
    ```
    
3. **Ejecutar el servidor**: Finalmente, puedes iniciar el servidor ejecutando el siguiente comando en tu terminal:

    ```
    npm run dev
    ```
    > [!TIP]
    >¡Y eso es todo! Ahora deberías tener el servidor corriendo en http://localhost:3000.

## Uso

Para iniciar el proyecto, simplemente ejecuta el siguiente comando en tu terminal:
```
npm run dev
```

Esto iniciará el servidor de Express y permitirá que accedas a las API y servicios. Asegúrate de tener todas las dependencias instaladas.

Una vez que el servidor esté en funcionamiento, puedes acceder a las rutas definidas en los routers de /api/v1 para interactuar con las diferentes funcionalidades del proyecto.

##  API Endpoints

| Usuarios                |
| ----------------------- |
| GET /users/: Obtiene la lista de usuarios.|
| GET /users?id=X: Obtiene un usuario por ID por medio de Query dinámica.|
| GET /users/{id}: Obtiene un usuario por ID por medio de Parámetro de URL. |
| POST /users/: Agrega un nuevo usuario al Array.| 
| PUT /users/{id}: Actualiza un usuario por ID. | 
| DELETE /users/{id}: Elimina un usuario por ID. |  

## Estructura del Proyecto
```
project-root/
│
├── app/
│   ├── middlewares
│   ├── routes
│   ├── schemas
│   └── services
│
├── doc
│
├── .editorconfig
│
├── .eslintrc.json
│
├── .gitignore
│
├── index.js  
│
├── package-lock.json  
│
├── package.json
│
└── README.md
```
