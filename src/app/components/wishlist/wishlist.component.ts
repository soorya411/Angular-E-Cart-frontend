import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  constructor(private api:ApiService){}
  wishlistArray:any=[];
  ngOnInit(): void {
    this.getwishlistProduct()
  }
getwishlistProduct(){
  this.api.getwishlist().subscribe({
    next:(res:any)=>{
      console.log(res);
   this.wishlistArray=res
    },
    error:(err:any)=>{
      console.log("error",err);
      
    }
  })
}

deleteWishlistProduct(id:any){
  this.api.deleteWishlist(id).subscribe((res:any)=>{
    alert("Deleted Successfully...")
    this.getwishlistProduct()
  })
}
}
