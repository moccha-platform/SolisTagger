import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
interface params {
    separator?: 'right' | 'left' | 'top' | 'bottom';
}
export declare class SidebarComponent implements OnInit {
    params: params;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SidebarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SidebarComponent, "app-sidebar", never, { "params": "params"; }, {}, never, ["*"]>;
}
export {};
