import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {ProductDTO} from "../../models/dto/ProductDTO";
import {Random} from "../../common/random";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  rating: number = 4;
  name: string;
  countRating: number = 0;
  defaultImage = "https://thucphamoishii.s3.amazonaws.com/anh-lazy-tp.jpg"

  @Input() product: ProductDTO;
  @Input() productSame: boolean;
  // Biến này chỉ định chế độ xem hiển thị số lượt xem sản phẩm
  @Input() viewCount : boolean;
  loaded: boolean;

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.name = this.categoryService.custom(this.product.productName);
    if (this.product.sold < 10){
      this.product.sold = Random.getRandomInt(20,130);
    }
  }

  scrollTop(nameProduct: string, id: any){
    this.router.navigate(['/san-pham', this.categoryService.custom(nameProduct), id])
  }

}
