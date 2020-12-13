import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirebaseService} from "../../services/firebaseService.service";
import {Category} from "../../Interfaces/Category";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-parent-cat',
  templateUrl: './add-parent-cat.component.html',
  styleUrls: ['./add-parent-cat.component.scss']
})
export class AddParentCatComponent implements OnInit {


  category: Array<Category>;
  items: Observable<Category[]>;

  constructor(private db: AngularFirestore,
              public firebaseService: FirebaseService) {

  }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {

    this.items = this.firebaseService.getAllCategories();
    this.items
      .pipe()
      .subscribe((result => {
        this.category = result;
      }));

  }

  addCategory() {
    let count = 0;

    const title = '';
    let parentId = '';
    const result = prompt('Category Title', title);
    let resultParentId = prompt('Parent Id', title);
    if (result === null || result === '') {
      return;
    }
    if (resultParentId === null || resultParentId === '0') {
      resultParentId = "0";
    }
    for(let cat of this.category)
    {
      if(cat.CategoryId === resultParentId)
        count = count+1;
    }
    if(count ===0)
    {
      resultParentId = "0";
    }
    this.firebaseService.addCategory(result, resultParentId);


  }
}
