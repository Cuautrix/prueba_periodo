import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public token:any;
  public user_Data:any={};
  constructor( public router:Router) { }

  ngOnInit(): void {
   this.token= localStorage.getItem('token');
   this.user_Data = JSON.parse(localStorage.getItem('user_data') || '{}');
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/inicio']);
    this.token= localStorage.getItem('token');
  }
}
