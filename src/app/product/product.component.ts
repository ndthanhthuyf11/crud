import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { IProduct } from '../interfaces/iproduct';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any;
  errMessage: string ="";
  selectedProduct?: any;
  product: Product = new Product();
  // name?: string = "";
  // price?: number;

  constructor(private _service: DataService,
              private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this._service.getProducts().subscribe({
      next: data => this.products = data,
      error: err => this.errMessage = err
    })
  }

  //  onSelectedProduct(product: any){
  //   this.selectedProduct = product;
  //   console.log(this.selectedProduct);
  //   this.name = this.selectedProduct.name;
  //   this.price = this.selectedProduct.price;
  // }

  // submit(){
  //   this.product = 
  //     {
  //       name: this.selectedProduct.name, 
  //       price: this.selectedProduct.price
  //     }
  //     console.log(this.product);
  //     this._service.postProduct(this.product);
  // }
  submitData(form: NgForm){
    console.log("Form data:", form.value);
    console.log("Model", this.product);
    if(this.product._id == ''){
      this._service.postProduct(this.product).subscribe(res => {
        let resData = JSON.parse(JSON.stringify(res)); 
        // console.log("res", res)
        if(resData.message === 'success'){
          // alert("Success!");
          this._toastr.success("Insert được rồi nè!", "Insert");
          this.onReset(form);
          this.getProducts();
        }
        else {
          alert("Error!")
        }
      })
    }
    else {
      this._service.updateProduct(this.product._id, this.product).subscribe( res =>{
        let resData = JSON.parse(JSON.stringify(res)); 
        if(resData.message === 'success'){
          alert("Updated!");
          this.onReset(form);
          this.getProducts();
        }
        else {
          alert("Update failed.")
        }
      })
    }
  }
  edit(data: Product){
    this.product = data;
    console.log(this.product);
  }

  delete(id: any, form: NgForm){
    if(confirm("Are you sure to delete this product?")==true){
    this._service.deleteProduct(id).subscribe( res =>{
      let resData = JSON.parse(JSON.stringify(res)); 
      if(resData.message === 'success'){
        // alert("Deleted!");
        this._toastr.warning("Insert được rồi nè!", "Insert");
        this.onReset(form);
        this.getProducts();

      }
      else {
        alert(resData.message);
      }
    })
  }
  }

  onReset(form?: NgForm) {
    if (form){
      form.reset();
      this.product = new Product();
    }
  }

}


