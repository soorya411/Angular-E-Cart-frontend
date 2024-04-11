import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor (private api:ApiService){}
search(event:any){
  this.api.searchTerm.next(event.target.value)
  console.log(event.target.value);
  
}
}
