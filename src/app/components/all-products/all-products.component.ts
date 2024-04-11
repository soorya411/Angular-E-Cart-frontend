import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts:any[]=[] //to hold all products
  searchKey:string=""
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getProducts()
    // this.searchKey=this.api.searchTerm
    this.api.searchTerm.subscribe((data:any)=>{
      this.searchKey=data
    })
  }
  getProducts() {
    this.api.getAllProducts().subscribe((products: any) => {
      console.log(products);
this.allProducts=products
    })
  }
}
