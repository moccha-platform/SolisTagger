import { Renderer } from './models/renderer.model';

export let renderer: Renderer;

export const launchRenderer = () => {
    renderer = new Renderer();
}