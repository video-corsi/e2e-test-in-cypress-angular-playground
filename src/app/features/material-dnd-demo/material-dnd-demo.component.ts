import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { map } from 'rxjs';

export type User = {
  id: number;
  name: string;
}

@Component({
  selector: 'app-material-dnd-demo',
  template: `
    <p>material-dnd-demo works!</p>
    <div cdkDropList class="my-list" (cdkDropListDropped)="drop($event)">
      <div class="my-item" *ngFor="let user of users" cdkDrag>{{user}}</div>
    </div>

  `,
  styleUrls: ['./material-dnd-demo.component.css']
})
export class MaterialDndDemoComponent implements OnInit {
  users$ = inject(HttpClient)
    .get<User[]>('https://jsonplaceholder.typicode.com/users')
    .pipe(
      map(items => items.map(item => item.name))
    )
  users: string[] = [];

  ngOnInit() {
    this.users$.subscribe(res => this.users = res)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
  }
}


