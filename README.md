<center>
<img src="./build/icon.png" width="100">
<h1>Solis Tagger</h1>
</center>

Solis Tagger es un etiquetador ID3v2 para añadir metadatos a cualquier elemento mp3, forma parte del módulo de etiquetado de Solis.

Está desarrollado con electron para que pueda ser usado en cualquier plataforma. La interfaz está basada en Angular usando componentes de Solis Falco UI y el paquete de [iconos de Solis](https://github.com/marcosrg9/Solis-Falco-Icons).

## ⚠️ Versión alpha

El funcionamiento base de la aplicación está preparado, pero todavía faltan muchos detalles que arreglar e implementar.

## 📦 Builds

Puede encontrar las versiones compiladas para todas las plataformas [desde este enlace](https://github.com/marcosrg9/Solis-Falco-Icons/releases).

## ⚙️ Funcionamiento

Implementa la funcionalidad Drag&Drop en la ruta load (primera pantalla) y comprueba si dicho archivo es MP3 y puede ser etiquetado.

El servidor recoge la ruta, retira la extensión y busca en iTunes por el nombre del elemento (archivo), de todas las coincidencias, realiza un filtrado con el [coeficiente de Dice](https://es.wikipedia.org/wiki/Coeficiente_de_Sorensen-Dice), de esto se encarga el módulo [string-similarity](https://www.npmjs.com/package/string-similarity), en esta versión, el algoritmo debe devolver un resultado no inferior a 0.6, todas las coincidencias que no alcancen este nivel, serán descartadas. En futuras versiones, el usuario tendrá la opción de establecer el nivel de similaridad mínimo.

La inferfaz gráfica se adapta al modo oscuro del sistema si este se encuentra activado, por defecto en modo claro.