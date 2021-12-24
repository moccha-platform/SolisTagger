import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'urlToImg64',
  pure: false
})
export class UrlToImg64Pipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer,
              private http: HttpClient) { }

  transform(value: string): SafeResourceUrl {
    return this.http.get(value, { responseType: 'arraybuffer' })
      .pipe(
        map((data) => {
          return 'data:image/jpg;base64,'+Buffer.from(data).toString('base64');
        }))
      .subscribe(
        (a) => a,
        (err) => err
      );
  }

}
