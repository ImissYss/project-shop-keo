import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Address} from "../../models/address";
import {AddressService} from "../../services/address.service";
import {ReadingJsonService} from "../../services/reading-json.service";

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  tinh: string = '';
  huyen: string = '';
  xa: string = '';
  sonha: string = '';
  customerName: string = '';
  customerPhone: string = '';
  address: any;
  province: string[] = [];
  district: string[] = [];
  warn: string[] = [];
  isSubmitted:boolean = false;



  infoAddress: string = "";

  @Output() closeDialog = new EventEmitter();

  constructor(private _readingJSONService: ReadingJsonService,
              private addressService: AddressService,
              private eRef: ElementRef,
              ) {
    this._readingJSONService.getJSON().subscribe(
      (data) => {
        this.address = data;
      }
    )
  }

  validDistrict: boolean = true;
  validWarn: boolean = true;
  chooseP: boolean = false;
  chooseD: boolean = false;
  chooseW: boolean = false;

  ngOnInit(): void {

  }
  createAddress(){
    this.infoAddress = this.tinh + "," + this.huyen + "," + this.xa
    let address: Address = new Address(this.customerName, this.customerPhone, this.infoAddress, this.sonha);
    this.addressService.createAddress(address).subscribe(
      (data) => {
        this.closeDialog.emit();
      },
      (error) => {
        console.log(error);
      }
    )
    console.log(address);
    this.closeDialog.emit();
  }
  addressDialog: boolean = false;
  filterString: string = '';
  selectProvince(){
    this.addressDialog = true;
    this.chooseP = true;
    this.address.data.forEach(item => {
      this.province.push(item.name);
    })
  }
  selectDistrict(){
    this.addressDialog = true;
    this.chooseD = true;
    this.filterString = '';
  }
  selectWarn(){
    this.addressDialog = true;
    this.chooseW = true;
    this.filterString = '';
  }

  chooseProvince(province: any){
    if (this.tinh !== '' && this.tinh !== province){
      this.huyen = '';
      this.xa = '';
    }
    this.tinh = province;
    this.chooseP = false;
    this.district = [];
    this.address.data.filter(item => item.name === this.tinh)[0].level2s.forEach(i => {
      this.district.push(i.name);
    })
    this.addressDialog = false;
    this.validDistrict = false;

  }
  chooseDistrict(district: any){

    if (this.huyen !== '' && this.huyen !== district){
      this.xa = ''
    }
    this.huyen = district;
    this.chooseD = false;
    this.warn = [];
    this.address.data.filter(item => item.name === this.tinh)[0].level2s.filter(it => it.name === this.huyen)[0].level3s.forEach(i => {
      this.warn.push(i.name);
    })
    this.addressDialog = false;
    this.validWarn = false;

  }
  chooseWarn(warn: any){
    this.xa = warn;
    this.chooseW = false;
    this.addressDialog = false;
  }

  closeDialog1(){
    this.addressDialog = false;
  }
  returnVs(){
    this.closeDialog.emit();
    this.customerName = '';
    this.customerPhone = '';
    this.tinh = '';
    this.huyen= '';
    this.xa = '';
    this.sonha = '';
  }

}
