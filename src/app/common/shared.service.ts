import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable()
export class SharedService {

    private drawer: MatDrawer;
    threads: any;

    /**
     * @description Set the drawer instance
     * @param drawer - Your Mat Drawer
     */
    setDrawer(drawer: MatDrawer) {
        this.drawer = drawer;
    }

    /**
     * @description Toggle the drawer with values
     */
    toggle(msg?: any[]): void {
        this.threads = msg || [];
        this.drawer.toggle();
    }

}
