import { Component, OnInit } from '@angular/core';
import {Address} from "../../models/address";

import {MessageService} from "primeng/api";
import {AddressService} from "../../services/address.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  addresses: Address[] = [];
  addressIdDelete: number;

  constructor(private addressService: AddressService,
              private messageService: MessageService,
              ) { }

  ngOnInit(): void {
    this.addressService.getAllAddress().subscribe(
      (data) => {
        this.addresses = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onReject(){
    this.messageService.clear('c');
  }

  onConfirm(){
    this.addressService.deleteAddress(this.addressIdDelete).subscribe(
      (message) => {
        this.addresses = this.addresses.filter(a => a.id != this.addressIdDelete);
        this.messageService.clear('c');
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Delete success'});
      },
      (error)=> {
        console.log(error);
      }
    )
  }

  showConfirm(addressId: number){
    this.addressIdDelete = addressId;
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
  }

}
