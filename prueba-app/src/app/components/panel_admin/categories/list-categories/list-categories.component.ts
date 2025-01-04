import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/servicios/category.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  public categories: Array<any> = [];

  constructor(
    private CategoryService:CategoryService
  ) { }

  ngOnInit(): void {
    this.get_categories();

  }

  
  get_categories(){
    this.CategoryService.get_categories().subscribe(
      res=>{
          res.data=this.categories;
      }
    )
  }
}
