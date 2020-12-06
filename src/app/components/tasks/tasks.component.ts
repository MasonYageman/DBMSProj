import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Task} from "../../Interfaces/Task"
import {Category} from "../../Interfaces/Category";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    const things = db.collection('things').valueChanges();
    things.subscribe(console.log);
  }



  panelOpenState: boolean;
  userId: string;
  started: false;

  items: Observable<Category[]>;

  theme = false;
  @Input() indexForProj: number;




  task: any;
  tasks: any[];
  ngOnInit(): void {
  }



  onCreate(){

    let title = "";


        if (title !== '' && description !== '' ) {
          if (title !== null || description !== null || data.priority === 0) {
            this.project[this.indexForProj].tasks.push({
              id: '' + date.getTime(),
              title: title,
              description: description,
              completed: false,

            });
          }

        }






        if (title !== '' && description !== '' ) {
          if (data.title !== null || data.description !== null || data.priority === 0) {
            this.firebaseService.addTask(this.project[this.indexForProj].tasks, this.project[this.indexForProj].id);
          }}

      });

}
