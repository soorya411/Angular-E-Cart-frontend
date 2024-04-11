import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "https://angular-e-cart-backend.onrender.com"
  searchTerm = new BehaviorSubject("") //to hold the search term

  constructor(private http: HttpClient) { }
  register(user: any) {
    return this.http.post(`${this.baseUrl}/user/register`, user)
  }
  login(user: any) {
    return this.http.post(`${this.baseUrl}/user/login`, user)
  }
  getAllProducts() {
    return this.http.get(`${this.baseUrl}/all-products`)
  }
  getAProduct(id: any) {
    return this.http.get(`${this.baseUrl}/view-product/${id}`)

  }

  appendToken() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`);
    }
    return { headers };
  }

  addToWishlist(product: any) {
    return this.http.post(`${this.baseUrl}/wishlist`, product, this.appendToken())
  }

  getwishlist() {
    return this.http.get(`${this.baseUrl}/get-wishlist`, this.appendToken())
  }

  deleteWishlist(id: any) {
    return this.http.delete(`${this.baseUrl}/delete-wishlist/${id}`, this.appendToken())
  }

  addToCart(product: any) {
    return this.http.post(`${this.baseUrl}/add-cart`, product, this.appendToken())
  }

  getCart() {
    return this.http.get(`${this.baseUrl}/get-cart`, this.appendToken())
  }

  deleteCart(id: any) {
    return this.http.delete(`${this.baseUrl}/delete-cart/${id}`, this.appendToken())

  }
  incrementCart(id: any) {
    return this.http.get(`${this.baseUrl}/increment-cart/${id}`, this.appendToken())
  }
  decrementCart(id: any) {
    return this.http.get(`${this.baseUrl}/decrement-cart/${id}`, this.appendToken())
  }
}
