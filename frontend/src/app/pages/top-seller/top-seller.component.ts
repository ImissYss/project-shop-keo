import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-top-seller',
  templateUrl: './top-seller.component.html',
  styleUrls: ['./top-seller.component.scss']
})
export class TopSellerComponent implements OnInit {

  topSellerProduct: any[];
  sort: string = "sold,desc";
  pageSize = 20;
  page = 1;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProduct(this.sort, this.pageSize, this.page -1).subscribe(
      (data) => {
        const {products} = data;
        this.topSellerProduct = products;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
