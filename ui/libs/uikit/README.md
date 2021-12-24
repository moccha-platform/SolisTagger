<img src="assets/uikit-md-banner.png" alt="Solis UI Kit ngx">

<center>
El kit de interfaz basado en componentes para Angular provee una librería de componentes ya preparados para su uso.
</center>

## Importando
Para comenzar a usar el kit, debe instalarlo como dependencia.
UIKit no está disponible a través npm, para usarlo deberá descargar el proyecto (o un paquete compilado) y establecer un enlace simbólico como referencia a la librería.

⚠️ Si está intentando usar la librería descargada como una release, deberá saltarse el proceso de compilación.

### Compilar
Para compilar la librería manualmente deberá situarse en el directorio de esta.
Posteriormente deberá ejecutar el comando de compilación:

    ng build

### Enlace simbólico

Para que la librería pueda ser importada como si se tratara de un módulo proveniente de npmjs deberá enlazarlo:

    npm link ../uikit/dist/uikit

Donde "```../uikit/dist/uikit```" sería la ruta relativa hasta el directorio de salida de la librería ya compilada.

Evidentemente deberá ejecutar este comando dentro del proyecto de Angular donde desea importar la librería.

### Uso

Abra el ```app.module.ts``` del proyecto consumidor e inserte lo siguiente siguiendo el esquema del fichero:

```TypeScript
import { UikitModule } from 'libs/uikit';

@NgModule([
    ...
    imports: [
        UikitModule
    ],
    ...
])
```

Finalmente podrá empezar a usar los componentes del UIKit de Solis dentro de ese módulo:

# Componentes
Los componentes pueden ser usados como el usuario desee. Sin embargo están preparados para comportarse de una forma específica. Es decir, cuando ciertos elementos son anidados, las reglas CSS actúan para que la interfaz se comporte de la forma esperada.

## Sidebar
El sidebar permite contener elementos dentro de el, similar a las barras laterales de las aplicaciones.

Es usado normalmente con los ```list-item```, aunque se puede insertar cualquier elemento.

**Parámetros**<br>

    { separator: 'right' | 'left' | 'top' | 'bottom' }

El separador añade un borde al lado especificado.

**Ejemplo de uso**

```HTML
<app-sidebar [params]="{ separator: 'right' }">
    ...
</app-sidebar>
```

## Switch
El switch es básicamente un conmutador. Cuando se pulsa sobre él, emite un evento de cambio.

Puede ser usado como ngModel:

```
```