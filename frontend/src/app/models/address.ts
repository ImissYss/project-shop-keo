import {FormGroup} from "@angular/forms";

export class Address{
  id: number;
  username: string;
  phone: string;
  cdw: string;
  specificAdd: string;

  constructor(username, phone, cdw, specificAdd) {
    this.username = username;
    this.phone = phone;
    this.cdw =cdw;
    this.specificAdd = specificAdd;
  }
}
