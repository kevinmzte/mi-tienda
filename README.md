# Mi Tienda

Sistema web de gestión comercial desarrollado con Next.js, TypeScript y Tailwind CSS.

## Descripción

Mi Tienda es una aplicación diseñada para pequeños negocios que necesitan administrar su catálogo de productos de forma sencilla. El sistema incluye un panel administrativo para gestionar productos, pedidos y clientes, además de un catálogo público orientado a la visualización de productos por parte de los clientes.

## Funcionalidades

### Autenticación

* Registro de cuenta.
* Inicio de sesión.
* Protección de rutas mediante AuthGuard.
* Validación de credenciales.

### Gestión de productos

* Crear productos.
* Editar productos.
* Eliminar productos.
* Cargar imágenes.
* Gestión de stock.
* Gestión de categorías.
* Descripciones detalladas.

### Panel de control

* Dashboard principal.
* Resumen de actividad.
* Productos con bajo stock.
* Acceso rápido a módulos del sistema.

### Pedidos

* Visualización de pedidos.
* Gestión de estados.
* Seguimiento de pedidos pendientes.

### Catálogo público

* Visualización de productos.
* Diseño adaptable para dispositivos móviles.
* Compartición mediante URL.

### WhatsApp

* Acceso directo al contacto comercial mediante WhatsApp.

## Tecnologías utilizadas

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React
* LocalStorage (persistencia local)

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd mi-tienda
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## Estado actual

Actualmente el sistema utiliza LocalStorage para almacenar la información de usuarios, productos y pedidos.

Esto permite realizar pruebas locales, pero el catálogo público solo funciona correctamente en el mismo navegador donde fueron creados los datos.

## Mejoras futuras

* Integración con Supabase.
* Base de datos persistente.
* Catálogo público real.
* Gestión avanzada de pedidos.
* Integración completa con WhatsApp Business.
* Estadísticas de ventas.
* Gestión de clientes.
* Pasarela de pagos.
* Personalización de temas y colores.

## Autor

Proyecto desarrollado por Kevin Mazacote Silva como práctica de desarrollo web utilizando Next.js y TypeScript.
