import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable()
export class SharedService {

    private drawer: MatDrawer;
    threads: any;
    users = [];

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

    getFromUser(message) {
        if (message && message.from_id) {
            return this.users.find((user) => user.id === message.from_id);
        } else {
            return {};
        }
    }

    getToUser(message) {
        if (message && message.to_id) {
            return this.users.find((user) => user.id === message.to_id);
        } else {
            return {};
        }
    }

}
