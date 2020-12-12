import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Task} from "../../Interfaces/Task"
import {Category} from "../../Interfaces/Category";
import {takeWhile} from "rxjs/operators";
import {FirebaseService} from "../../services/firebaseService.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private db: AngularFirestore,
              public firebaseService: FirebaseService
  ) {

  }


  category: Array<Category>;
  items: Observable<Category[]>;


  @Input() indexForSubCategory: number;


  task: any;
  tasks: any[];

  ngOnInit(): void {

    this.getData();
  }


  getData() {

    this.items = this.firebaseService.getCategories();
    this.items
      .pipe()
      .subscribe((result => {
        this.category = result;
        console.log(result);
        console.log(this.category);

      }));

  }




  completeTask(task) {
  //  this.firebaseService.completeTask(this.category[this.indexForSubCategory].id, task);
  }


  onCreate() {


    let title: '', description: '';
    let priority: "";
    let resultTitle = prompt("Task Title", title);
    let resultDescription = prompt("Task Description", description);
    let resultPriority = prompt("Task Priority", priority);
    const date: Date = new Date();
    let tempDueDate = prompt("Enter date in 'mm/dd/yyyy' format:")

    if (title !== '' && description !== '' && priority !== '' && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(tempDueDate)) {
        this.category[this.indexForSubCategory].tasks.push({
          id: '' + date.getTime(),
          title: title,
          description: description,
          completed: false,
          priority: Number(priority),
          dueDate: tempDueDate,

        });

      //this.firebaseService.addTask(this.category[this.indexForSubCategory].tasks,
        //this.category[0].CategoryId);
    }
    else
      alert("Task not filled out correctly! please try again.")


  }



  queueByNew(){
    this.category[this.indexForSubCategory].tasks.sort((n1, n2) => {
      if (n1.id < n2.id) {
        return 1;
      }

      if (n1.id > n2.id) {
        return -1;
      }

      return 0;
    });
  }


  queueByOld(){
    this.category[this.indexForSubCategory].tasks.sort((n1, n2) => {
      if (n1.id > n2.id) {
        return 1;
      }

      if (n1.id < n2.id) {
        return -1;
      }

      return 0;
    });
  }





}



