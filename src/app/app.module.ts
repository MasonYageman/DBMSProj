import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';


// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyBbf7yzX3F72ehsgmo7lJ-mFifGOQlnesU",
  authDomain: "task-list-b6cf2.firebaseapp.com",
  databaseURL: "https://task-list-b6cf2-default-rtdb.firebaseio.com",
  projectId: "task-list-b6cf2",
  storageBucket: "task-list-b6cf2.appspot.com",
  messagingSenderId: "1035927997350",
  appId: "1:1035927997350:web:8124e041d808e8c6641d67",
  measurementId: "G-QXVHQD269X"

};
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
