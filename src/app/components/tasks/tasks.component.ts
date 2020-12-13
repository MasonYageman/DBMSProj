import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Task} from "../../Interfaces/Task";
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

  tempTasks: Array<any>;
  category: Array<Category>;
  items: Observable<Category[]>;
  queryTasks: Array<Task>;
  queryCategory: Array<Category>;
  currentCategoryId:string;

  @Input() indexForSubCategory: number;





  ngOnInit(): void {


    this.getAllData();

    this.currentCategoryId="All tasks";

  }


  onSelectCategory(event){
    this.tempTasks= [];
    this.currentCategoryId=event;

    for( let cat of this.category){

      if(cat.CategoryId === event || cat.ParentId === event)
        this.tempTasks = this.tempTasks.concat(cat.tasks);

    }

    //priority descending
    this.queueByPriority();

  }


  getAllData() {

    this.items = this.firebaseService.getAllCategories();
    this.items
      .pipe()
      .subscribe((result => {
        this.category = result;
        console.log(result);
        console.log(this.category);
        this.combineTasks();
      }));

  }

  combineTasks(){
    this.tempTasks= [];
    const date: Date = new Date()
    let today: string;
    today = '' + (date.getMonth()+1)+ "/" + (date.getDate()+1) + "/" + date.getFullYear();
    console.log("THIS IS TODAYS DATE +1",today);
    for( let cat of this.category){
      this.tempTasks = this.tempTasks.concat(cat.tasks);

    }

    this.tempTasks = this.tempTasks.filter(task=> task.dueDate <= today);
  }






  completeTask(task) {
  //  this.firebaseService.completeTask(this.category[this.indexForSubCategory].id, task);
  }


  onCreate() {

    let arr =["1","2","3","4"];
    let title: '', description: '';
    let priority: "";
    let dueDate = ""
    let resultTitle = prompt("Task Title", title);

    let resultDescription = prompt("Task Description", description);

    let resultPriority = prompt("Task Priority", priority);

    const date: Date = new Date();
    let tempDueDate = prompt("Enter date in 'mm/dd/yyyy' format:", dueDate);

    console.log(resultTitle,resultDescription,resultPriority,tempDueDate,arr);

    if (resultTitle !== '' && resultDescription !== '' && resultPriority in arr && /^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/.test(tempDueDate)) {
      console.log("cleared all validations");
      for( let cat of this.category) {
        if (cat.CategoryId === this.currentCategoryId) {
          console.log(cat);
            cat.tasks.push({
            id: '' + date.getTime(),
            title: resultTitle,
            description: resultDescription,
            completed: false,
            priority: Number(resultPriority),
            dueDate: tempDueDate,
              categoryId:cat.CategoryId,

          });
          console.log(cat);
          this.firebaseService.addTask(cat.tasks,
            this.currentCategoryId);
          this.onSelectCategory(this.currentCategoryId);
        }
      }



    }
    else
      alert("Task not filled out correctly! please try again.")


  }



  queueByNew(){
    this.tempTasks.sort((n1, n2) => {
      if (n1.priority < n2.priority) {
        return 1;
      }

      if (n1.priority > n2.priority) {
        return -1;
      }

      return 0;
    });
  }


  queueByPriority(){
    this.tempTasks.sort((n1, n2) => {
      if (n1.priority > n2.priority) {
        return 1;
      }

      if (n1.priority < n2.priority) {
        return -1;
      }

      return 0;

    });

  }





}



