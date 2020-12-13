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

  currentCategoryId:string;

  @Input() indexForSubCategory: number;





   ngOnInit() {
    this.currentCategoryId = "Tasks Due today and Overdue Tasks";
    this.getAllData();



  }

  //gets all catagories from database
  //
  //
  getAllData() {

    this.items = this.firebaseService.getAllCategories();
    this.items
      .pipe()
      .subscribe((result => {
        this.category = result;
        console.log(result);
        console.log(this.category);
        if(this.currentCategoryId !=="Tasks Due today and Overdue Tasks")
        {
          this.tempTasks= [];


          for( let cat of this.category){

            if(cat.CategoryId === this.currentCategoryId || cat.ParentId === this.currentCategoryId)
              this.tempTasks = this.tempTasks.concat(cat.tasks);

          }

          //priority descending
          this.sortByPriority();
        }
        if(this.currentCategoryId==="Tasks Due today and Overdue Tasks"){
          this.combineTasks();
        }

      }));

  }


  //changes category when a category button is pressed
  //
  //

  onSelectCategory(event){
    this.tempTasks= [];
    this.currentCategoryId=event;

    for( let cat of this.category){

      if(cat.CategoryId === event || cat.ParentId === event)
        this.tempTasks = this.tempTasks.concat(cat.tasks);

    }

    //priority descending
    this.sortByPriority();

  }


  //takes all tasks from each category and loads them into a local task array
  //
  //

  combineTasks(){


      console.log(this.category);
      this.tempTasks= [];
      const date: Date = new Date()
      let today: string;
      today = '' + (date.getMonth()+1)+ "/" + (date.getDate()+1) + "/" + date.getFullYear();

      for( let cat of this.category){
        this.tempTasks = this.tempTasks.concat(cat.tasks);

      }

      this.tempTasks = this.tempTasks.filter(task=> task.dueDate <= today);
      this.sortByPriority();


  }


refreshTaskList(){
  this.tempTasks= [];
  for( let cat of this.category){

    if(cat.CategoryId === this.currentCategoryId || cat.ParentId === this.currentCategoryId)
      this.tempTasks = this.tempTasks.concat(cat.tasks);

  }
}
  //deletes task
  //
  //
  deleteTask(categoryId,task){
     if(task.title === "Deleted task")
       return;
    this.firebaseService.deleteTask(categoryId,task);

  }


  //completes task
  //
  //
  completeTask(task) {
    if(task.completed === true)
      return;
    else
    this.firebaseService.completeTask(task.categoryId, task);
    this.tempTasks= [];
    for( let cat of this.category){

      if(cat.CategoryId === this.currentCategoryId || cat.ParentId === this.currentCategoryId)
        this.tempTasks = this.tempTasks.concat(cat.tasks);

    }
  }

  //creates task and puts it on db
  //
  //
  onCreate() {

    let arr =["1","2","3","4",'4'];
    let title: '', description: '';
    let priority: "";
    let dueDate = ""
    let resultTitle = prompt("Task Title", title);

    let resultDescription = prompt("Task Description", description);

    let resultPriority = prompt("Task Priority: Enter value 1-4", priority);

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


        }
      }



    }
    else
      alert("Task not filled out correctly! please try again.");

    this.tempTasks= [];
    for( let cat of this.category){

      if(cat.CategoryId === this.currentCategoryId || cat.ParentId === this.currentCategoryId)
        this.tempTasks = this.tempTasks.concat(cat.tasks);

    }


  }


  //shows tasks due today
  //
  //

  queueByToday(){
    console.log(this.category);

    this.tempTasks= [];
    const date: Date = new Date()
    let today: string;
    today = '' + (date.getMonth()+1)+ "/" + (date.getDate()) + "/" + date.getFullYear();

    for( let cat of this.category){

      if(cat.CategoryId === this.currentCategoryId || cat.ParentId === this.currentCategoryId)
        this.tempTasks = this.tempTasks.concat(cat.tasks);

    }

    this.tempTasks = this.tempTasks.filter(task=> task.dueDate <= today);
    this.sortByPriority();
  }

  //shows tasks due tomorrow
  //
  //

  queueByTomorrow(){

    this.tempTasks= [];
    const date: Date = new Date()
    let today: string;
    today = '' + (date.getMonth()+1)+ "/" + (date.getDate()+1) + "/" + date.getFullYear();

    for( let cat of this.category){

      if(cat.CategoryId === this.currentCategoryId || cat.ParentId === this.currentCategoryId)
        this.tempTasks = this.tempTasks.concat(cat.tasks);

    }

    this.tempTasks = this.tempTasks.filter(task=> task.dueDate <= today);
    this.sortByPriority();
  }

  //shows tasks due next week
  //
  //

  queueByWeek(){
    console.log("CHANGING QUEUE!!");
    this.tempTasks= [];
    const date: Date = new Date()
    let today: string;
    today = '' + (date.getMonth()+1)+ "/" + (date.getDate()+7) + "/" + date.getFullYear();

    for( let cat of this.category){

      if(cat.CategoryId === this.currentCategoryId || cat.ParentId === this.currentCategoryId)
        this.tempTasks = this.tempTasks.concat(cat.tasks);

    }

    this.tempTasks = this.tempTasks.filter(task=> task.dueDate <= today);
    this.sortByPriority();
  }


  //shows tasks due today
  //
  //

  queueByAll(){
    this.tempTasks= [];


    for( let cat of this.category){

      if(cat.CategoryId === this.currentCategoryId || cat.ParentId === this.currentCategoryId)
        this.tempTasks = this.tempTasks.concat(cat.tasks);

    }

    this.sortByPriority();
  }


  //sorts a filtered list by priority 1-4
  //
  //

  sortByPriority(){
    console.log(this.category);
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



