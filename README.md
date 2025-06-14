# Mi Proyecto IA – Dashboard de E-commerce

![Node.js](https://img.shields.io/badge/Node.js-v20.19.2-green)
![Express](https://img.shields.io/badge/Express-v4.18.2-orange)
![EJS](https://img.shields.io/badge/EJS-Templating-blue)
![MariaDB](https://img.shields.io/badge/MariaDB-v10.11-blueviolet)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.x-teal)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

---

## 📋 Índice

- [Mi Proyecto IA – Dashboard de E-commerce](#mi-proyecto-ia--dashboard-de-e-commerce)
  - [📋 Índice](#-índice)
  - [📝 Descripción](#-descripción)
  - [🛠️ Tecnologías](#️-tecnologías)
  - [🚀 Instalación](#-instalación)
    - [3.1. Clonar el repositorio](#31-clonar-el-repositorio)
    - [3.2. Instalar dependencias](#32-instalar-dependencias)
    - [3.3. Configurar base de datos en local](#33-configurar-base-de-datos-en-local)
  - [▶️ Puesta en marcha](#️-puesta-en-marcha)
  - [🎯 Uso de la aplicación](#-uso-de-la-aplicación)
  - [📂 Estructura del proyecto](#-estructura-del-proyecto)
  - [🔗 Rutas principales](#-rutas-principales)
  - [🤝 Créditos y licencia](#-créditos-y-licencia)

---

## 📝 Descripción

“**Mi Proyecto IA**” es una aplicación web tipo dashboard para gestionar productos de una tienda en línea. Incluye:

- Autenticación de usuario (login, registro, logout) con hashing de contraseñas (bcrypt) y sesiones (express-session).  
- Conexión a MariaDB para almacenar usuarios, categorías y productos.  
- Interfaz de usuario creada con **Tailwind CSS** y plantillas **EJS**.  
- Componentes dinámicos:  
  - Acordeón para listar productos y categorías.  
  - Carrousel de imágenes.  
  - Tabla de productos en `products.ejs`.  
  - Formulario de contacto que muestra un mensaje de “Gracias” tras enviar.  
- Backend en **Node.js** con **Express**.

---

## 🛠️ Tecnologías

- **Node.js** (v20+)  
- **Express** (v4.x)  
- **EJS** (Sistema de plantillas)  
- **mysql2** (driver para MariaDB/MySQL)  
- **bcryptjs** (hash de contraseñas)  
- **express-session** (gestión de sesiones)  
- **Tailwind CSS** (v3.x)  
- **MariaDB** (v10.x)  
- **JavaScript ES6+**

---

## 🚀 Instalación

### 3.1. Clonar el repositorio

```bash
git clone https://github.com/devneda/digitalizacion.git
cd digitalizacion
```

### 3.2. Instalar dependencias

Dentro de la carpeta del proyecto, ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias listadas en `package.json`, incluyendo:

- express
- ejs
- mysql2
- bcryptjs
- express-session

### 3.3. Configurar base de datos en local

1. **Abrir consola de MariaDB/MySQL** (en Windows):

   - Presiona `Win + R`, escribe `cmd` y presiona Enter.  
   - En la terminal, ejecuta:
     ```bash
     mysql -u root -p
     ```
     y te pedirá la contraseña de tu usuario `root`.

2. **Crear la base de datos y tablas**:

   Suponiendo que tu archivo `db.sql` está en la raíz del proyecto (`digitalizacion/db.sql`), dentro de la consola de MySQL ejecuta:

   ```sql
   SOURCE C:/ruta/a/tu/proyecto/digitalizacion/db.sql;
   ```

   > **Nota**: Ajusta la ruta al archivo `db.sql`. Si estás en Windows, usa la ruta completa, por ejemplo:  
   > `SOURCE C:/Users/tuUsuario/Projects/digitalizacion/db.sql;`

   Esto creará la base de datos `proyecto_ia` y las tablas necesarias (`users`, `categories`, `products`, etc.) con datos de ejemplo insertados.

3. **(Opcional) Ajustar plugin de autenticación**:

   Si tu MariaDB arroja error de handshake, en la consola MySQL ejecuta:

   ```sql
   USE mysql;
   UPDATE user
     SET plugin = 'mysql_native_password',
         password = PASSWORD('root')
     WHERE User = 'root' AND Host = 'localhost';
   FLUSH PRIVILEGES;
   ```

   Luego reinicia el servicio de MariaDB para aplicar cambios.

---

## ▶️ Puesta en marcha

1. **Configura la contraseña de la BD**  
   - Abre `server.js` y verifica que en `dbConfig` la propiedad `password` coincida con la contraseña de tu usuario MySQL/MariaDB (por defecto, `root` en ejemplos).

2. **Inicia el servidor**  
   ```bash
   npm start
   ```
   Verás en consola:
   ```
   Servidor ejecutándose en http://localhost:3000
   ```

3. **Accede a la aplicación**  
   - Abre tu navegador y navega a [http://localhost:3000](http://localhost:3000).  
   - Primero, registra un usuario nuevo en `/register`.  
   - Luego, inicia sesión en `/login`.

---

## 🎯 Uso de la aplicación

1. ### Dashboard (`/`)
   - **Acordeón**: Muestra el conteo de productos y categorías. Al desplegar cada panel, aparecen las listas de nombres desde la base de datos.  
   - **Carrousel**: Tres imágenes que rotan horizontalmente.  
   - **Tarjetas de productos**: Grid que muestra imagen, nombre, descripción y precio de cada producto.  
   - **Avatar**: Iniciales del usuario en la esquina superior derecha. Al hacer clic, despliega menú con “Mi Perfil”, “Ajustes” y “Cerrar sesión”.

2. ### Productos (`/products`)
   - **Tabla de productos**: Muestra todos los productos guardados en la base de datos.  
   - Columnas:  
     - Imagen (miniatura)  
     - Nombre  
     - Descripción (recortada)  
     - Precio (€)

3. ### Contacto (`/contact`)
   - **Formulario de contacto**: Campos para Nombre completo, Email, Asunto y Descripción del problema.  
   - Al pulsar “Enviar”, hace `POST /contact` y redirige a `/?info=contacto_ok`.  
   - El Dashboard detecta este querystring y muestra un recuadro verde con “¡Gracias! Hemos recibido tu mensaje de contacto.”

4. ### Perfil y Ajustes (`/profile`, `/settings`)
   - Son placeholders por defecto (muestran un mensaje básico).  
   - Se pueden ampliar para mostrar datos del usuario o permitir cambios de contraseña.

---

## 📂 Estructura del proyecto

```
digitalizacion/
├── db.sql
├── package.json
├── server.js
├── public/
│   ├── images/
│   │   ├── favicon.png
│   │   ├── placeholder.png
│   │   ├── slide1.png
│   │   ├── slide2.png
│   │   └── slide3.png
│   └── js/
│       └── main.js
└── views/
    ├── login.ejs
    ├── register.ejs
    ├── dashboard.ejs
    ├── formulario.ejs
    └── products.ejs
```

- **db.sql**: Script para crear la base de datos `proyecto_ia`, tablas y datos de ejemplo.  
- **server.js**:  
  - Configuración de Express y sesiones.  
  - Conexión a MariaDB con `mysql2/promise`.  
  - Rutas:  
    - `/login`, `/register`, `/logout` (autenticación)  
    - `/` (dashboard protegido)  
    - `/products` (tabla de productos)  
    - `/contact` (formulario de contacto)  
    - `/profile`, `/settings` (placeholders)  
- **public/images/**:  
  - `favicon.png` (icono de la aplicación).  
  - `slide1.png`, `slide2.png`, `slide3.png` (imágenes del carrousel).  
  - `placeholder.png` (imagen genérica si falta URL de producto).  
- **public/js/main.js**:  
  - Toggle de contraseña (login/registro).  
  - Dropdown del avatar.  
  - Lógica del acordeón.  
  - Funcionamiento del carrousel.  
- **views/** (plantillas EJS):  
  - `login.ejs` (formulario de login con diseño en dos paneles).  
  - `register.ejs` (formulario de registro con diseño en dos paneles).  
  - `dashboard.ejs` (acordeón, carrousel y tarjetas de productos).  
  - `formulario.ejs` (formulario de contacto).  
  - `products.ejs` (tabla con todos los productos).

---

## 🔗 Rutas principales

| Ruta           | Método | Descripción                                                                                |
|----------------|:------:|--------------------------------------------------------------------------------------------|
| `/login`       | GET    | Muestra la vista de login (`login.ejs`).                                                   |
| `/login`       | POST   | Valida credenciales, crea sesión y redirige a `/`.                                         |
| `/register`    | GET    | Muestra la vista de registro (`register.ejs`).                                             |
| `/register`    | POST   | Crea nuevo usuario en la tabla `users` (bcrypt hashing).                                     |
| `/logout`      | POST   | Destruye sesión y redirige a `/login`.                                                      |
| `/contact`     | GET    | Muestra formulario de contacto (`formulario.ejs`).                                         |
| `/contact`     | POST   | Procesa datos de contacto y redirige a `/?info=contacto_ok`.                                 |
| `/products`    | GET    | Protegido: lista todos los productos en `products.ejs`.                                    |
| `/profile`     | GET    | Protegido: muestra “Perfil de usuario” (placeholder).                                      |
| `/settings`    | GET    | Protegido: muestra “Ajustes de usuario” (placeholder).                                     |
| `/`            | GET    | Dashboard protegido: acordeón, carrousel y tarjetas de productos (`dashboard.ejs`).          |

> 🔒 **Protección de rutas**: `/`, `/products`, `/profile` y `/settings` comprueban `if (!req.session.userId)` y redirigen a `/login` si no hay sesión activa.

---

## 🤝 Créditos y licencia

- **Autor**: Equipo de desarrollo (Devneda)  
- **Repositorio**: [https://github.com/devneda/digitalizacion](https://github.com/devneda/digitalizacion)  
- **Licencia**: MIT License  

> ¡Gracias por usar “Mi Proyecto IA”! Si tienes dudas o sugerencias, abre un issue o PR en GitHub.  
