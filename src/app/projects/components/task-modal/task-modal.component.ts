import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask, IUser } from '@app/shared/models';
import { mockUsers } from '@app/mocks';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnChanges {
  @Input() isModalVisible: boolean = false;

  @Input() task: ITask = new ITask();

  modalTitle: string = '';

  taskForm: FormGroup = new FormGroup({
    taskTitle: new FormControl<string>('', [Validators.required]),
    taskDescription: new FormControl<string>(''),
    taskUser: new FormControl<string>(''),
  });

  userList: IUser[] = [];

  selected: string = '';

  constructor() {
    // TODO: get users from userservice
    this.userList = mockUsers;
  }

  ngOnChanges(): void {
    this.modalTitle = this.task.title ? 'Task edit' : 'Create new task';
    this.taskForm.controls['taskTitle'].setValue(this.task.title ?? '');
    this.taskForm.controls['taskDescription'].setValue(this.task.description ?? '');
    this.selected = this.task.title ? this.task.userId : '';
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  submitForm(): void {
    // TODO: save changes
    this.closeModal();
  }
}
