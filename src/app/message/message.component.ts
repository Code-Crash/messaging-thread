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
  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;

  constructor(private service: SharedService) {
    this.onProfileSelect(this.selected);
    this.service.users = this.users; // Set Users to service
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

}
