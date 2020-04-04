import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'domSanitizer'})
export class DomSanitizerPipe implements PipeTransform {

    constructor(private domSanitizer: DomSanitizer) { }

    transform(nameImg: string, post = false): any {
        const urlImg = `background-image: url('${ nameImg }');`;

        if (post) {
            return this.domSanitizer.bypassSecurityTrustUrl( nameImg );
        }

        return this.domSanitizer.bypassSecurityTrustStyle( urlImg );
    }
}