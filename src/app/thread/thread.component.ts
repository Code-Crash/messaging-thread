import { Component, Input } from '@angular/core';
import { SharedService } from '../common/shared.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent {
  @Input() threads: any[];
  @Input() message: object;
  @Input() from: object;
  @Input() to: object;
  constructor(private service: SharedService) { }

  getFromUser(message) {
    return this.service.getFromUser(message);
  }

  getToUser(message) {
    return this.service.getToUser(message);
  }

}
