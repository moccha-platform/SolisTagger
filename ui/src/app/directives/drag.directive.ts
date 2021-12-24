import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() fileOver = new EventEmitter<boolean>();
  @Output() fileDrop = new EventEmitter<FileList>();

  @HostListener('drop', ['$event']) drop(event:DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      if (event.dataTransfer.files.length > 0) this.fileDrop.emit(event.dataTransfer.files);
    }
  }

  @HostListener('dragover', ['$event']) dragOver(event:DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver.emit(true);
  }
  
  @HostListener('dragleave', ['$event']) dragLeave(event:DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver.emit(false);
  }

}
