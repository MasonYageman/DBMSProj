import {subCategory} from "./Category";
import { Task } from "./task";

export class Category{

  title:string;
  subCategories: Array<Category>
  tasks: Array<Task>;
  id:string;
  constructor(){

  }
}
