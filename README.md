# 🛍️ API RESTful - Gestión de Productos

Este proyecto es una API básica construida con **Node.js** y **Express**, diseñada para gestionar un listado de productos en una tienda. Esta API permite gestionar productos en una tienda virtual. Cada producto puede pertenecer a una **categoría**, lo que permite clasificarlos y consultarlos más fácilmente.

---

## 🎯 Objetivo

Desarrollar una API RESTful que permita realizar operaciones CRUD (crear, leer, actualizar y eliminar) sobre productos de una tienda.

---

## ⚙️ Tecnologías y dependencias utilizadas

- Node.js
- Express.js
- mysql2
- bcrypt
- zod
- cors
- dotenv
- jsonwebtoken

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/EvelynSabillon/DisenoDigitalTarea2-1.git
   cd DisenoDigitalTarea2-1
   ```

2. **Instalar Node.js**  
   Descarga e instala Node.js desde [nodejs.org](https://nodejs.org/).

3. **Instalar las dependencias**
   ```bash
   npm install
   ```

4. **Instalar Express (si es necesario)**
   ```bash
   npm install express
   ```

5. **Instalar Docker (si es necesario)**
   Descarga e instala Docker desde [Docker](https://www.docker.com/).

6. **Levantar el contenedor**
   Desde la raíz del proyecto donde se encuentra el archivo `docker-compose.yml`, ejecuta:
   ```bash
   docker compose up -d 
   ```

7. **Ejecutar la API**
   ```bash
   npm run dev
   ```
   Esto iniciará el servidor en: [http://localhost:3000](http://localhost:3000)

---

## 📦 Modelo de Datos

### Producto

```json
{
  "id": 1,
  "nombre": "Laptop",
  "precio": 599.99,
  "descripcion": "Laptop moderna con 8GB RAM y 256GB SSD",
  "disponible": true,
  "fecha_ingreso": "2025-07-06T14:00:00.000Z",
  "categoriaId": 2
}
```

### Categoría

```json
{
  "id": 2,
  "nombre": "Tecnología"
}
```


---

## 📚 Rutas disponibles y funcionalidad

- **GET /productos**  
  Devuelve todos los productos.  
  Incluye un contador de cuántos productos existen.

- **GET /productos/disponibles**  
  Devuelve solo los productos disponibles (`disponible: true`).  
  Muestra el total y cuántos están disponibles.

- **GET /productos/:id**  
  Retorna un producto específico según su ID.

- **POST /productos**  
  Crea un nuevo producto.  
  Requiere: `nombre`, `precio`, `descripcion`, `disponible`.

- **PUT /productos/:id**  
  Actualiza un producto existente según su ID.  
  Requiere los mismos campos que el POST.

- **DELETE /productos/:id**  
  Elimina un producto según su ID.


---

## 🧩 Nuevas Rutas para Categorías

| Método | Ruta                   | Descripción                        |
|--------|------------------------|------------------------------------|
| GET    | `/categorias`          | Lista todas las categorías         |
| GET    | `/categorias/:id`      | Obtiene una categoría por ID       |
| POST   | `/categorias`          | Crea una nueva categoría           |
| PUT    | `/categorias/:id`      | Edita una categoría existente      |
| DELETE | `/categorias/:id`      | Elimina una categoría por ID       |


---


## 📂 Estructura del proyecto

```bash
📁 config/                
  └── db.js       
📁 controllers/           
  └── auth.controller.js
  └── categorias.controller.js 
  └── productos.controller.js        
📁 middlewares/           
  └── isAuth.js
📁 models/                
  └── auth.js
  └── categorias.js 
  └── productos.js         
📁 routes/
  └── auth.routes.js
  └── categorias.routes.js  
  └── productos.routes.js      
  └── categorias.routes.js
📁 schemas/ 
  └── categorias.js
  └── productos.js      
📁 tiendita-docker/    
  └── 📁 init/         
      └── init.sql        # Archivo de inicialización de la base de datos MySQL. 
  └── docker-compose.yml  # Archivo de configuración de contenedor Docker necesario para el proyecto.
📄 api.http               # Pruebas de la API 
📄 index.js               # Código principal del servidor
📄 package.json           # Dependencias y scripts
📄 package-lock.json      # Control de versiones de dependencias
📄 README.md              # Documentación del proyecto
📄 .env.example           # Archivo de ejemplo para variables de entorno
```

---

## 📝 Notas adicionales

- El ID de los productos se genera automáticamente con base en el valor más alto actual.
- El campo `fecha_ingreso` se asigna automáticamente al momento de la creación.
- Se recomienda usar la extensión **REST Client** en VSCode para probar la API desde el archivo `api.http`.

## ✅ Validaciones importantes

- El nombre de la categoría debe ser obligatorio y único.
- Al crear un producto, `categoriaId` debe existir.
- No se puede eliminar una categoría si tiene productos asignados.

---