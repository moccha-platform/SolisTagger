import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SwitchComponent {
    /**
     * Define el estado del deslizador.
     * **Compatible con ngModel.**
     *
     *
     * Ejemplo:
     *
     *     [(enabled)]="status.cache"
     */
    enabled: boolean;
    /**
     * Define el icono que se muestra mientras el deslizador está activado.
     * @example
          <app-switch [activeIcon]="'display'"</app-switch>
     */
    activeIcon: string;
    /**
     * Define el icono que se muestra mientras el deslizador está desactivado.
     * @example
          <app-switch [inactiveIcon]="'display_disconnect'"</app-switch>
     */
    inactiveIcon: string;
    /**
     * Evento de salida del modelo.
     */
    enabledChange: EventEmitter<any>;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SwitchComponent, "app-switch", never, { "enabled": "enabled"; "activeIcon": "activeIcon"; "inactiveIcon": "inactiveIcon"; }, { "enabledChange": "enabledChange"; }, never, never>;
}
