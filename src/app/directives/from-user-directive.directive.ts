import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appFromUserDirective]',
  exportAs: 'appFromUserDirective'
})
export class FromUserDirectiveDirective {
  @Input() appFromUserDirective: object;
  constructor() { }
}
