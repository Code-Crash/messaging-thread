import { Component, Input } from '@angular/core';

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
  constructor() { }
}
