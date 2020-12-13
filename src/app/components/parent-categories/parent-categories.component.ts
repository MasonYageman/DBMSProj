import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirebaseService} from "../../services/firebaseService.service";
import {Category} from "../../Interfaces/Category";
import {Observable} from "rxjs";
import {Task} from "../../Interfaces/Task";


@Component({
  selector: 'app-parent-categories',
  templateUrl: './parent-categories.component.html',
  styleUrls: ['./parent-categories.component.scss']
})
export class ParentCategoriesComponent implements OnInit {

  constructor(private db: AngularFirestore,
              public firebaseService: FirebaseService
  ) {

  }


  category: Array<Category>;
  items: Observable<Category[]>;
  tempTasks: Array<Task>

  @Input() indexForSubCategory: number;


  task: any;
  tasks: any[];
  @Output() selectCategory: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {

    this.getData();
  }


  getData() {

    this.items = this.firebaseService.getAllCategories();
    this.items
      .pipe()
      .subscribe((result => {
        this.category = result;
        console.log(result);
        console.log(this.category);

          this.category.sort((n1, n2) => {
            if (n1.ParentId < n2.ParentId) {
              return 1;
            }

            if (n1.CategoryId > n2.CategoryId) {
              return -1;
            }

            return 0;
          });

      }));

  }


  onSelectCat(catId) {

    this.selectCategory.emit(catId);
    console.log(catId);

  }


  deletCategory(catId){
    this.tempTasks = [];
    for( let cat of this.category){
      if(cat.CategoryId === catId || cat.ParentId === catId){
        for( let task of cat.tasks){
          task.categoryId ="Empty";
          this.firebaseService.updateEmptyTasks(task);

        }
        this.firebaseService.deleteCategories(cat.CategoryId);
      }
    }
    this.onSelectCat("No Category");
  }
}
