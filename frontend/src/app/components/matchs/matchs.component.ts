import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IpcService } from 'src/app/services/ipc.service';

interface matchs {
  data:Object[];
  total:number
}

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.css']
})
export class MatchsComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput') fileInput:ElementRef

  matchs:matchs;
  noMatchs:boolean = false;
  currentMatch:any;
  searching = true;
  editMode = false;
  TagHelp = false;
  findingCover = false;
  details = false;
  confirmation = false;

  constructor( public ipc:IpcService,
               private cdRef:ChangeDetectorRef,
               private router:Router,
               private sanitizer:DomSanitizer) {

    this.matchs = {
      data:[],
      total: 0
    };

    console.log(this.matchs);
    this.currentMatch = null;

    // Solicita todo el conjunto de datos
    // Refactorizado, ahora se recibe datos desde el evento newTag
    //this.ipc.send('getData');

    // Recepción del flujo de nuevas etiquetas.
    this.ipc.on('newTag', (event:Object, data:any) => {

  
      /*
        BUG Pantalla de búsqueda no se visualiza.
      */




      console.log(data);
      
      if (!this.matchs) {
        this.matchs = {
          data: [],
          total: 0
        };
      }
      if (data.total == 0) {
        this.noMatchs = true;
        this.searching = false;
      } else {
        this.searching = false;
        this.matchs.data.push(data);
        this.matchs.total ++;
        console.log(this.matchs.total);
      }
      this.cdRef.detectChanges();
    });
    
    // Señal de coincidencias no encontradas
    this.ipc.on('noMatchs', () => {
      this.noMatchs = true;
      this.searching = false;
      this.cdRef.detectChanges();
    })

    // Recepción de todo el conjunto de etiquetas
    this.ipc.on('data', (event:Object, data:any) => {
      console.log("evento data");
      if (data == "noMatchs" || data.total == 0) {
        this.noMatchs = true;
        this.searching = false;
      } else {
        console.log(data);
        this.matchs = data;
        this.searching = false;
      }
      this.cdRef.detectChanges();
      return;
    })
  }

  // Proceso de selección de carátula
  openFileDialog() {
    this.ipc.send('selectCover');
    this.ipc.on('FindingCover', () => {
      this.findingCover = true;
      this.cdRef.detectChanges();
    })
    this.ipc.on('AbortSelectCover', () => {
      this.findingCover = false;
      this.ipc.removeAllListeners('AbortSelectCover');
      this.ipc.removeAllListeners('coverPath');
      this.ipc.removeAllListeners('FindingCover');
      this.cdRef.detectChanges();
    })
    this.ipc.on('coverPath', (event:Object, a:any) => {
      if (a === this.currentMatch.album.cover_base64) {
        alert("Misma carátula seleccionada");
      } else {
        const img = "data:image/png;base64, " + a;
        this.currentMatch.album.cover_medium = this.sanitizer.bypassSecurityTrustResourceUrl(img);
        this.currentMatch.album.cover_big = this.sanitizer.bypassSecurityTrustResourceUrl(img);
        this.currentMatch.album.cover_base64 = a;
      }
      this.findingCover = false;
      this.cdRef.detectChanges();
      this.ipc.removeAllListeners('coverPath');
      this.ipc.removeAllListeners('FindingCover');
      this.ipc.removeAllListeners('AbortSelectCover');
    })
  }

  // Función de asignación de datos de entrada de texto
  output(event, a) {
    switch (a) {
      case "TrackTitle":
        this.currentMatch.title = event;
        return;
      case "ArtistName":
        this.currentMatch.artist.name = event;
        return;
      case "AlbumTitle":
        this.currentMatch.album.title = event;
        return;
      case "Genre":
        this.currentMatch.genre = event;
        return;
      case "Date":
        this.currentMatch.album.date = event;
        return;
      case "TrackAlbumCount":
        this.currentMatch.album.track_count = event;
        return;
      case "TrackCount":
        this.currentMatch.number = event;
      case "BPM":
        this.currentMatch.bpm = event;
        return;
    } 
  }

  // Muestra el modal de confirmación
  confirm(a:boolean) {
    if (a) {
      this.confirmation = true;
      this.cdRef.detectChanges();
      return;
    } else {
      this.confirmation = false;
      this.cdRef.detectChanges();
      return;
    }
    this.confirmation = true;
    this.cdRef.detectChanges();
  }

  // Mostrar detalles
  toggleDetails() {
    this.details = !this.details;
    this.editMode = false;
    this.TagHelp = false;
    this.cdRef.detectChanges();
  }

  // Intercambiar visibilidad del panel de edición.
  editSwitch() {
    this.editMode = !this.editMode;
    this.details = false;
    this.cdRef.detectChanges();
  }
  
  // Cerrar detalles
  closeDetails() {
    this.details = false;
    this.cdRef.detectChanges();
  }

  // Cambiar la coincidencia actual.
  ChangeCurrentMatch(a:number) {
    this.currentMatch = null;
    //this.cdRef.detectChanges();
    this.currentMatch = this.matchs.data[a];
    this.currentMatch.index = a;
    this.editMode = false;
    this.cdRef.detectChanges();
  }

  // Activar/Desactivar atributo de etiqueta personalizada.
  Custom() {
    if (this.currentMatch.customTag) {
      this.currentMatch.customTag = false;
    } else {
      this.currentMatch.customTag = true;
    }
    this.TagHelp = false;
    this.cdRef.detectChanges();
  }

  // Generar etiqueta personalizada
  GenPlaceholder() {
    if (!this.matchs || this.matchs.total == 0 || !this.matchs.total) {
      this.matchs = {
        data: [],
        total: 0
      }
    }
    const data = {
      album: {
          cover_big: "./../../../assets/placeholder_cover.svg",
          cover_medium: "./../../../assets/placeholder_cover.svg",
          cover_small: "./../../../assets/placeholder_cover.svg",
          cover_xl: "./../../../assets/placeholder_cover.svg",
          cover_base64: "",
          title: "Album"
      },
      artist: {
          name: "Artista",
          picture: "",
          picture_big: "",
          picture_medium: "",
          picture_small: "",
          picture_xl: ""
      },
      title: "Título",
      genre: "",
      bpm: 0,
      customTag: true
  }
    this.matchs.data.unshift(data);
    this.matchs.total = this.matchs.data.length;
    this.noMatchs = false;
    if (this.matchs.total == 1) {
      //this.ChangeCurrentMatch(0);
    }
    this.cdRef.detectChanges();
  }

  tag() {
    this.ipc.send('tag', this.currentMatch);
    //this.router.navigate(['login'])
    this.confirmation = false;
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.ipc.send('findData');
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.currentMatch = null;
    this.matchs = null;
    this.searching = true;
    this.ipc.removeAllListeners('data');
    this.cdRef.detectChanges();
  }

}
