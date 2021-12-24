export interface selectorElement {

    /**
     * Propiedad que define si un elementos tiene un tipo de MIME válido.
     * Se reconocen como MIME válido los siguientes:
     * - audio/mpeg
     * - audio/wav
     * - audio/x-wav
     * - audio/aiff
     * - audio/mp4
     * - video/mp4
     */
    valid:  boolean;
    /** Ruta absoluta del elemento. */
    path:   string;
    /** Nombre del elemento (sin extensión) */
    name:   string;
    /** En caso de que se trate de un elemento inválido, el tipo MIME se adjuntará.
     * Existen elementos que contienen música y el códec es válido, pero el contenedor o el MIME
     * no son reconocidos como elementos de audio.
     * 
     * El tipo de MIME application/octet-stream **puede** contener audio.
     */
    MIME?:  string;
    /** Contenido de la etiqueta. */
    tag?:   string;
    
}

export interface validFile extends selectorElement {
    
    valid: true;

}

export interface invalidFile extends selectorElement {
    
    valid: false;
    MIME: string;

}

export interface fileWithTag extends selectorElement {
    
    tag: string;

};