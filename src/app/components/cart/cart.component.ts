import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any[] = []//To hold cart product

  totalPrice = 0;

  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false
  makepaymentStatus = false
  ngOnInit(): void {

    this.initConfig();
    this.getCartProduct()
    this.getCartTotal()
  }
  constructor(private api: ApiService) { }

  getCartProduct() {
    this.api.getCart().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res
        this.getCartTotal()
      },
      error: (err => {
        console.log(err);

      })
    })

  }
  deleteCartProduct(id: any) {
    this.api.deleteCart(id).subscribe((res: any) => {

      console.log(res);
      this.getCartProduct()
      alert("product deleted successfully")

    })
  }
  getCartTotal() {
    let total = 0
    this.products.forEach((item: any) => {
      total += item.grandTotal
      this.totalPrice = Math.ceil(total)
    })
  }
  cartIncrement(id: any) {
    this.api.incrementCart(id).subscribe((res: any) => {
      this.products = res
      this.getCartTotal()
    })
  }

  cartDecrement(id: any) {
    this.api.decrementCart(id).subscribe((res: any) => {
      this.products = res
      this.getCartTotal()
    })
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
  makepayment() {
    this.makepaymentStatus = true
  }
}
