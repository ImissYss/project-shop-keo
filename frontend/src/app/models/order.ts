import {Address} from "./address";
import {ProductInOrder} from "./productInOrder";
import {OrderStatus} from "../enums/OrderStatus";

export class Order {
  orderId: number;
  buyerEmail: string;
  buyerName: string;
  buyerPhone: string;
  userPhoneReceive: string;
  userNameReceive: string;
  cdw: string;
  specialAddress: string;
  products: ProductInOrder[];
  orderAmount: string;
  orderStatus: number;
  createTime: Date;
  updateTime: string;

  // constructor(orderId: number, buyerEmail:string, buyerName: string, buyerPhone: string, address: Address, pages: ProductInOrder[],
  //             orderAmount: string, orderStatus: number, createTime: Date, updateTime: string) {
  //   this.orderId = orderId;
  //   this.buyerEmail = buyerEmail;
  //   this.buyerPhone = buyerPhone;
  //   this.buyerName = buyerName;
  //   this.address = address;
  //   this.pages = pages;
  //   this.orderAmount = orderAmount;
  //   this.orderStatus = orderStatus;
  //   this.createTime = createTime;
  //   this.updateTime = updateTime;
  // }
}
