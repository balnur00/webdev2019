import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { TaskList, Task } from '../shared/models/model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  public tasksList: TaskList[] = [];
  public tasks: Task[] = [];
  public taskList: TaskList;
  public task: Task;
  public name: any;
  public tname: any;
  public createdAt: any;
  public dueOn: any;
  public status: any;
  public id: any;
  ngOnInit() {
    this.provider.getTasksList().then(res => {
      this.tasksList = res;
      console.log(this.tasksList);
    });
  }

  getTaskFromList(tasklist: TaskList) {
    this.provider.getTasks(tasklist.id).then(res => {
      this.tasks = res;
      console.log(res);
    });
  }

  updateTaskList(tl: TaskList) {
    this.provider.updateTaskList(tl).then(res => {
      console.log(tl.name + ' updated');
    });
  }

  deleteTaskList(tl: TaskList) {
    this.provider.deleteTaskList(tl).then(res => {
      console.log(tl.name + ' deleted');
      this.provider.getTasksList().then(r => {
        this.tasksList = r;
      });
    });
  }
  createTaskList() {
    if (this.name !== '') {
      this.provider.createTaskList(this.name).then(res => {
        this.name = '';
        this.tasksList.push(res);
      });
    }
  }
  updateTask(task: Task) {
    this.provider.updateTask(task).then(res => {});
  }
  deleteTask(task: Task) {
    this.provider.deleteTask(task).then(res => {
      this.provider.getTasks(task.task_list.id).then(r => {
        this.tasks = r;
      });
    });
  }
  createTask() {
    if (this.tname !== '') {
      this.provider.createTask(this.tname, this.createdAt, this.dueOn, this.status, this.id).then(res => {
        this.tname = '';
        this.status = '';
        this.id = '';
      });
    }
  }
}
