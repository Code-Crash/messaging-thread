import { Component, Input } from '@angular/core';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent {
  @Input() threads: any[];
  @Input() message: any;
  @Input() thread: Thread;
  @Input() user: any;

  constructor(private service: SharedService) {
    this.threads = this.service.threads;
    this.reset();
  }

  reset() {
    this.thread = {
      id: null,
      msg_id: null,
      from_id: null,
      to_id: null,
      text: '',
    };
  }

  getFromUser(message) {
    return this.service.getFromUser(message);
  }

  getToUser(message) {
    return this.service.getToUser(message);
  }

  /**
   * @description This function will create a threads for a message
   * @param thread - This will be a thread instance
   */
  onPostThread(thread: Thread) {
    thread.id = this.service.idGenerator('thread', this.threads);
    thread.msg_id = this.message.id;
    thread.from_id = this.user.id;
    thread.to_id = ((this.message.from_id === this.user.id) ? this.message.to_id : this.message.from_id);
    thread._created_at = new Date().toISOString();
    thread._updated_at = new Date().toISOString();
    this.threads.push(thread);
    this.reset();
  }

}


/**
 * @description This is a Thread Model
 */
interface Thread {
  id: number;
  msg_id: number;
  from_id: number;
  to_id: number;
  text: string;
  _created_at?: string;
  _updated_at?: string;
}
