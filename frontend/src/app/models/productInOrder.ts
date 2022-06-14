import {Image} from "./image";
import {Product} from "./product";

export class ProductInOrder{
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  count: number;
  discount: number;
  productStock: number;
  imageProducts: String;
  status: boolean;
  productCode: string;

  constructor(productInfo: Product, quantity = 1) {
    this.productId = productInfo.productId;
    this.productName = productInfo.productName;
    this.productPrice = productInfo.productPrice;
    this.count = quantity;
    this.productStock = productInfo.count;
    this.discount = productInfo.discount;
    this.productCode = productInfo.code;
    this.imageProducts = productInfo.imageProducts[0].url;
  }
}
