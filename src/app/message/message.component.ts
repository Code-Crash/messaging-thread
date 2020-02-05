import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../common/shared.service';
import { MatDrawer } from '@angular/material/sidenav';
import USERS from '../samples/users';
import MESSAGES from '../samples/messages';
import THREAD_MESSAGES from '../samples/thread';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  users = USERS;
  currentUser = this.users.find((user) => user.id === 1);
  messages = [];
  selected = USERS[1];
  threads = [];
  currentMessage = {};
  currentFrom = {};
  currentTo = {};
  message: Message;

  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;

  constructor(private service: SharedService) {
    this.onProfileSelect(this.selected);
    this.service.users = this.users; // Set Users to service
    this.reset();
  }


  reset() {
    this.message = {
      id: null,
      from_id: null,
      to_id: null,
      text: '',
      thread: false,
    };
  }

  ngOnInit() {
    this.service.setDrawer(this.drawer);
  }

  onProfileSelect(profile) {
    this.selected = profile;
    if (this.selected.id === 2 && this.currentUser.id === 1) {
      this.messages = MESSAGES;
    } else {
      this.messages = [];
    }
  }

  toggleDrawer(message) {
    if (message && message.thread) {
      this.threads = THREAD_MESSAGES.filter((thread) => thread.msg_id === message.id);
      this.currentMessage = message;
      this.currentFrom = this.users.find((user) => user.id === message.from_id);
      this.currentTo = this.users.find((user) => user.id === message.to_id);
      this.service.toggle();
    } else {
      this.threads = [];
      this.currentMessage = {};
      this.currentFrom = {};
      this.currentTo = {};
      this.service.toggle();
    }
  }

  getFromUser(message) {
    return this.service.getFromUser(message);
  }

  getToUser(message) {
    return this.service.getToUser(message);
  }

  idValidator(id, type: string): boolean {
    let ids = [];
    if (type === 'message') {
      ids = this.messages.filter((msg) => msg.id === id);
    } else if (type === 'user') {
      ids = this.users.filter((user) => user.id === id);
    } else {
      ids = this.users.filter((user) => user.id === id);
    }

    if (ids.length) {
      return false;
    } else {
      return true;
    }
  }

  idGenerator(type: string): number {
    const id = Math.floor((Math.random() * 10000) + 1);
    const isValid = this.idValidator(id, type);
    if (isValid) {
      return id;
    } else {
      return this.idGenerator(type);
    }
  }

  onPost(message: Message): void {
    message.id = this.idGenerator('message');
    message.from_id = this.currentUser.id;
    message.to_id = this.selected.id;
    message.thread = false;
    message._created_at = new Date().toISOString();
    message._updated_at = new Date().toISOString();
    this.messages.push(message);
    this.reset();
  }

}


/**
 * @description This is a Message Model
 */
interface Message {
  id: number;
  from_id: number;
  to_id: number;
  text: string;
  thread: boolean;
  _created_at?: string;
  _updated_at?: string;
}
