import { Injectable } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {Category} from '../interfaces/Category';
import { map, take } from 'rxjs/operators';
import {Task} from '../interfaces/task';
import * as firebase from 'firebase';





@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {




  categoryCollection: AngularFirestoreCollection<Category>;
  items: Observable<Category[]>;


  constructor(public db: AngularFirestore) {


  }



  getCategories() {
    //   return this.db.collection('Users', ref=> ref.where('uid','==',this.userId))
    //     .snapshotChanges();
    this.categoryCollection = this.db.collection('categories');

    this.items = this.categoryCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Category;

        data.id = a.payload.doc.id;
        console.log(data);
        return data;
      });
    }));
    return this.items;
  }

  deleteCategories(data) {
    return this.db.collection('/categories').doc(data).delete();


  }


  deleteTask(categoryID, task) {
    console.log(categoryID);
    console.log(task);
    return this.db.collection( '/categories').doc(categoryID).update({
      tasks: firebase.firestore.FieldValue.arrayRemove({
        completed: task.completed,
        description: task.description,

        id: task.id,
        title: task.title,
        priority: task.priority,



      })
    });


  }

  updateTasks(categoryID, taskToDelete, editTask) {

    console.log(editTask);
    console.log(taskToDelete);
    this.deleteTask(categoryID, taskToDelete);
    return this.db.collection('/categories').doc(categoryID).update({
      tasks: firebase.firestore.FieldValue.arrayUnion({
        completed: editTask.completed,
        description: editTask.description,

        id: editTask.id,
        title: editTask.title,
        priority: editTask.priority,

      })

    });

  }

  addTask(task: Task[], id: string) {

    this.db.collection('/categories').doc(id).set({
      tasks: task,
    }, {merge: true});

  }

  addCategory(title) {

    const date: Date = new Date();
    const ranNum = Math.floor(Math.random() * 1000000).toString();
    this.db.doc('/projects/' + title).set({
      id: ranNum,
      title,
      tasks: Array<Task>({
        id: '' + date.getTime(),
        title: 'Whats your first task?',
        completed: false,

        description: 'click the add the new task button',


        priority: 1,


      })
    }, {merge: true});

    console.log(this.db.doc('/categories/' + ranNum).get());


  }


}
