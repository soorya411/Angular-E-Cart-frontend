import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product: any = {}
  constructor(private route: ActivatedRoute, private api: ApiService) { }
  ngOnInit(): void {
    this.viewProduct()
  }
  viewProduct() {
    //to get product id
    this.route.params.subscribe((res: any) => {
      console.log(res);
      //destructure
      const { id } = res
      console.log(id);
      //get product details
      this.api.getAProduct(id).subscribe((res: any) => {
        console.log(res);
        this.product = res
      })
    })
  }

  addToWishlist() {
    if (sessionStorage.getItem('token')) {
      this.api.addToWishlist(this.product).subscribe({
        next:(res:any)=>{


          alert("Added to wishlist")
        },
        error:(err)=>{
          alert("Already added to wishlist")
        }
      })
    }
    else {
      alert("Please login")
    }
  }
  addToCart(product:any){
    Object.assign(product,{quantity:1})
    console.log(product);
    this.api.addToCart(product).subscribe((res:any)=>{
      console.log(res);
      alert(res)
    })

  }
  }
