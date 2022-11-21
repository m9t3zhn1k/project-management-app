import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask, IUser } from '@app/shared/models';
import { mockUsers } from '@app/mocks';
import { TaskService } from '@app/projects/services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnChanges {
  @Input() isModalVisible: boolean = false;

  @Output() isModalVisibleChange = new EventEmitter<boolean>();

  @Input() taskToEdit: ITask = new ITask();

  modalTitle: string = '';

  taskForm: FormGroup = new FormGroup({
    taskTitle: new FormControl<string>('', [Validators.required]),
    taskDescription: new FormControl<string>(''),
    taskUser: new FormControl<string>(''),
  });

  userList: IUser[] = [];

  selectedUsers: IUser[] = [];

  selected: string = '';

  constructor(private taskService: TaskService) {
    // TODO: get users from userservice
  }

  ngOnChanges(): void {
    // TODO: mock off
    this.userList = [...mockUsers];
    this.selectedUsers = [];
    this.taskToEdit.users.forEach((userId) => {
      const user: IUser | undefined = this.userList.find((item) => item._id === userId);
      if (user) {
        this.userList = this.userList.filter((item) => item._id !== userId);
        this.selectedUsers.push(user);
      }
    });
    this.modalTitle = this.taskToEdit.title ? 'Task edit' : 'Create new task';
    this.taskForm.controls.taskTitle.setValue(this.taskToEdit.title ?? '');
    this.taskForm.controls.taskDescription.setValue(this.taskToEdit.description ?? '');
    this.selected = this.taskToEdit.title ? this.taskToEdit.userId : '';
  }

  closeModal(): void {
    this.isModalVisibleChange.emit(false);
  }

  submitForm(): void {
    const resultTask = this.taskToEdit;
    resultTask.title = this.taskForm.controls.taskTitle.value;
    resultTask.description = this.taskForm.controls.taskDescription.value;
    resultTask.users = this.selectedUsers.map((user) => user._id);
    this.closeModal();
    this.taskService.saveTask(resultTask);
  }

  selectUser(): void {
    const userId: string = this.taskForm.controls.taskUser.value;
    if (userId === '-') return;
    const user: IUser | undefined = this.userList.find((item) => item._id === userId);
    if (user) {
      this.userList = this.userList.filter((item) => item._id !== userId);
      this.selectedUsers.push(user);
    }
    this.selected = '-';
  }

  removeUser(event: Event, userId: string): void {
    event.preventDefault();
    const user: IUser | undefined = this.selectedUsers.find((item) => item._id === userId);
    if (user) {
      this.selectedUsers = this.selectedUsers.filter((item) => item._id !== userId);
      this.userList.push(user);
    }
  }
}
