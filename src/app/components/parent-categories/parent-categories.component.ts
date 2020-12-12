import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirebaseService} from "../../services/firebaseService.service";
import {Category} from "../../Interfaces/Category";
import {Observable} from "rxjs";

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
}
