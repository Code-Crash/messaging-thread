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

    idValidator(id, type: string, objects: any[]): boolean {
        let ids = [];
        // if (type === 'message') {
        //     ids = objects.filter((object) => object.id === id);
        // } else if (type === 'user') {
        //     ids = objects.filter((user) => user.id === id);
        // } else if (type === 'thread') {
        //     ids = objects.filter((user) => user.id === id);
        // } else {
        //     ids = objects.filter((user) => user.id === id);
        // }
        ids = objects.filter((object) => object.id === id);
        if (ids.length) {
            return false;
        } else {
            return true;
        }
    }

    idGenerator(type: string, objects: any[]): number {
        const id = Math.floor((Math.random() * 10000) + 1);
        const isValid = this.idValidator(id, type, objects);
        if (isValid) {
            return id;
        } else {
            return this.idGenerator(type, objects);
        }
    }

}
