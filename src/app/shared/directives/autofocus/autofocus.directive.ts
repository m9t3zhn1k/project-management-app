import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutofocusDirective implements OnInit {
  @Input() appAutoFocus?: boolean | string;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    if (!this.appAutoFocus) {
      window.setTimeout((): void => this.el.nativeElement.focus());
    }
  }
}
