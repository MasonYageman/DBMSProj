import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';

import {HttpClientModule} from "@angular/common/http";

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';

import { AddSubCatComponent } from './components/add-sub-cat/add-sub-cat.component';
import * as corsModule from 'cors';
import {AddParentCatComponent} from "./components/add-parent-cat/add-parent-cat.component";
import { ParentCategoriesComponent } from './components/parent-categories/parent-categories.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';


const cors = corsModule({origin:true});
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    DeleteButtonComponent,
    AddParentCatComponent,
    AddSubCatComponent,
    ParentCategoriesComponent,
    SubCategoriesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
