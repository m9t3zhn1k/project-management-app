import { Directive, Input, ElementRef, Renderer2, OnChanges } from '@angular/core';
import { ITask } from '@app/shared/models';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appBoardSearch]',
})
export class BoardSearchDirective implements OnChanges {
  @Input() task: ITask = new ITask();

  @Input() searchTerm: string | null = '';

  constructor(private userService: UserService, private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.setVisibility();
  }

  setVisibility(): void {
    if (!this.searchTerm) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'column__task--hide');
    } else {
      const searchTerm = this.searchTerm ?? '';
      const usersIds = [this.task.userId, ...this.task.users];
      const arr: string[] = usersIds.map((userId) => this.userService.getUserById(userId).name);
      arr.push(this.task.title);
      arr.push(this.task.description);
      const result = arr.filter((value) => new RegExp(searchTerm, 'gi').test(value));
      if (!result.length) {
        this.renderer.addClass(this.elementRef.nativeElement, 'column__task--hide');
      }
    }
  }
}
