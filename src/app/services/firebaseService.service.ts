import { Injectable } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {Category} from '../interfaces/Category';
import { map, take } from 'rxjs/operators';
import {Task} from '../interfaces/task';
import firebase from 'firebase/app';
import 'firebase/firestore';






@Injectable({
  providedIn: 'root'
})
export class FirebaseService {




  categoryCollection: AngularFirestoreCollection<Category>;
  items: Observable<Category[]>;


  constructor(public db: AngularFirestore) {


  }



  getAllCategories() {
    //   return this.db.collection('Users', ref=> ref.where('uid','==',this.userId))
    //     .snapshotChanges();
    this.categoryCollection = this.db.collection('Categories');

    this.items = this.categoryCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        console.log(a.payload.doc.data())
        const data = a.payload.doc.data() as Category;

      //  data.id = a.payload.doc.id;
        console.log(data);
        return data;
      });
    }));
    return this.items;
  }





  deleteCategories(data) {
    return this.db.collection('/Categories').doc(data).delete();


  }

/*
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


  }*/
  updateEmptyTasks( taskToEmpty) {

    console.log(taskToEmpty);


    return this.db.collection('/Categories').doc("No Category").update({
      tasks: firebase.firestore.FieldValue.arrayUnion({
        completed: taskToEmpty.completed,
        description: taskToEmpty.description,
        categoryId: taskToEmpty.categoryId,
        id: taskToEmpty.id,
        title: taskToEmpty.title,
        priority: taskToEmpty.priority,
        dueDate: taskToEmpty.dueDate,

      })

    });

  }
  /*updateTasks(categoryID, taskToDelete, editTask) {

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
*/
 /* completeTask(categoryId, task) {
    console.log(categoryId);
    console.log(task);
    this.deleteTask(categoryId, task);
    return this.db.collection('Users/' + this.userId + '/projects').doc(projectID).update({
      tasks: firebase.firestore.FieldValue.arrayUnion({
        completed: true,
        description: task.description,
        editing: task.editing,
        id: task.id,
        title: task.title,
        priority: task.priority,
        countdownTimer: task.countdownTimer,
      })

    });
  }*/

  addTask(task: Task[], id: string) {

    this.db.collection('/Categories').doc(id).set({
      tasks: task,
    }, {merge: true});

  }

  addCategory(title,parentId) {

    const date: Date = new Date();
    const ranNum = Math.floor(Math.random() * 1000000).toString();
    this.db.doc('/Categories/' + title).set({
      ParentId: parentId,
      CategoryId: title,
      title: title,
      tasks: Array<Task>({
        id: '' + date.getTime(),
        title: 'Whats your first task?',
        completed: false,
        dueDate: "12/12/2020",
        description: 'click the add the new task button',

        categoryId:title,
        priority: 1,


      })
    }, {merge: true});

    console.log(this.db.doc('/categories/' + title).get());


  }


}
