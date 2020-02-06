import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
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
export class MessageComponent implements OnInit, AfterViewChecked {
  users = USERS;
  currentUser = this.users.find((user) => user.id === 1);
  messages = [];
  selected = USERS[1];
  threads = [];
  currentMessage = {};
  message: Message;

  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;
  @ViewChild('scroll', { static: true }) private scrollable: ElementRef;

  constructor(private service: SharedService) {
    this.onProfileSelect(this.selected);
    this.service.users = this.users; // Set Users to service
    this.reset();
  }

  scroll(): void {
    try {
      this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
    } catch (err) {
      console.log('Scroll Error:', err);
    }
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
    this.scroll();
  }

  ngAfterViewChecked() {
    this.scroll();
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
    this.threads = THREAD_MESSAGES.filter((thread) => thread.msg_id === message.id);
    this.currentMessage = message;
    this.service.toggle();
  }

  getFromUser(message) {
    return this.service.getFromUser(message);
  }

  getToUser(message) {
    return this.service.getToUser(message);
  }

  onPostMessage(message: Message): void {
    message.id = this.service.idGenerator('message', this.messages);
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
