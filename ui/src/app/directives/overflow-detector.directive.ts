import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[OverflowDetector]'
})
export class OverflowDetectorDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    
    const e = this.elementRef.nativeElement as HTMLDivElement;
    if (e.offsetWidth < e.scrollWidth) {
      this.renderer.addClass(e.parentElement, 'overflowGrads');
      this.renderer.addClass(e, 'overflow');
      this.renderer.setStyle(e, 'animation-duration', '8s')
    } else {
      this.renderer.addClass(e, 'centered');
    }
  }
}
