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
  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;

  constructor(private service: SharedService) {
    this.onProfileSelect(this.selected);
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
      this.service.toggle();
    } else {
      this.threads = [];
      this.service.toggle();
    }
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
