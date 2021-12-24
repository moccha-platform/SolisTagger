<div align="center">
<img src="./assets/icon.png" width="100">
<h1>Solis Tagger</h1>
</div>

Solis Tagger es un etiquetador ID3v2 para añadir metadatos a cualquier elemento mp3, forma parte del módulo de etiquetado de Solis.

Está desarrollado con electron para que pueda ser usado en cualquier plataforma. La interfaz está basada en Angular usando componentes de Solis Falco UI y el paquete de [iconos de Solis](https://github.com/marcosrg9/Solis-Falco-Icons).

# 🔥 Rama dev

En la rama dev se está llevando a cabo un rediseño completo de la aplicación.

A continuación se detalla lo que se ha llevado a cabo hasta ahora:

- <strong>Rediseño completo del proceso principal</strong>:
    - Ahora se usa TypeScript como lenguaje principal.
    - Se ha reducido el número de dependencias.
    - Se está implementando un sistema de actualizaciones.
    - Se está implementando el almacenamiento en caché de las descargas de etiquetas.
    - IPC mejorado, ahora se sincroniza con el router de Angular.
    - Los elementos del sistema de archivos ahora se distinguen por el tipo MIME en vez de la extensión.
- <strong>Rediseño completo del renderizado e interfaz de usuario</strong>:
    - Sistema de internacionalización añadido.
        - Español.
        - Inglés (EEUU).
    - Drag&Drop de múltiples elementos (debe mejorar).
        - Si se arrastra una carpeta, realiza una búsqueda dentro para añadir al etiquetador todos los elementos compatibles.
    - Se está implementando el multi-etiquetado.
    - Menú de configuración añadido.
        - <strong>Búsqueda</strong>: Opciones de filtrado de búsqueda.
        - <strong>Etiquetador</strong>: Parámetros y exclusión de metadatos del etiquetado. 
        - <strong>Apariencia</strong>: Modo de color y color de acento preferido.
        - <strong>Idioma</strong>: Idioma preferido de la aplicación.
        - <strong>Caché</strong>: Elementos en caché (artistas, carátulas y etiquetas)
        - <strong>APIs</strong>: Opciones de exclusión de uso de APIs (Deezer y/o iTunes).
        - <strong>Actualizaciones</strong>: Servicio de actualizaciones de la aplicación.
        - <strong>Atribuciones</strong>: Lista de los colaboradores principales del proyecto.
    - Rediseño de la interfaz.
    - Esquema de colores automático/manual implementado.
    - Nuevo esquema de color añadido (oscuro).
        > El modo oscuro anterior (blanco sobre fondo negro) se llama ahora ``deep dark``, el nuevo modo oscuro es blanco sobre fondo azul oscuro. Se puede elegir sobre estos dos en modo automático o bien manual.
    - Uso del módulo UIKit.