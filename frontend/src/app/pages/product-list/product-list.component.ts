import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {ProductDTO} from "../../models/dto/ProductDTO";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  @Input()products: ProductDTO[];
  productSameDiv = true;
  @Input() totalPages: number;
  @Input() page: number;
  @Input() count: number;
  @Input() pageSize: number;
  @Input() title: string;

  @Output() changePage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  handlePageChange(event: number): void{
    this.changePage.emit(event);
  }

}
