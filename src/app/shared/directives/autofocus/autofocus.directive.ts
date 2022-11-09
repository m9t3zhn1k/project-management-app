import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutofocusDirective implements OnInit {
  private readonly focus: boolean = true;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    if (this.focus) {
      window.setTimeout((): void => this.el.nativeElement.focus());
    }
  }
}
