import {Component, OnChanges, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Infoshop} from "../../models/infoshop";
import {Image} from "../../models/image";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {UploadFilesService} from "../../services/uploadFiles.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {ImageService} from "../../services/image.service";
import {ShopInfoService} from "../../services/shopInfo.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-info-shop',
  templateUrl: './info-shop.component.html',
  styleUrls: ['./info-shop.component.scss']
})
export class InfoShopComponent implements OnInit {

  infoShopDialog:boolean = false;
  header: string;
  form: FormGroup;
  images: Image[] = [];
  infoShop: Infoshop[] = [];

  closeAble: boolean = true;

  imageEdit : Image[] = [];
  imageEditBanner: Image[] = [];
  submitted: boolean = false;
  type: string = '';
  isAdd: boolean;

  selectedFiles?: FileList | '';
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(private fb: FormBuilder,
              private shopInfoService: ShopInfoService,
              private dialogService: DialogService,
              private uploadService: UploadFilesService,
              private messageService: MessageService,
              private confirmService: ConfirmationService,
              private imageService: ImageService) {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      logo: [Image[''], Validators.required],
      description: ['', Validators.required],
      introduce: [''],
      phone: ['', Validators.required],
      gmail: ['', Validators.required],
      address: ['', Validators.required],
      linkFanpage: ['', Validators.required],
      linkMessage: ['', Validators.required],
      linkGoogleMap: ['', Validators.required],
      imgDescription: [Image[''], Validators.required],
      linkShoppe: [''],
      linkMap: ['', Validators.required],
      linkZalo: ['']
    })

  }

  ngOnInit(): void {
    this.shopInfoService.getInfoShop().subscribe(
      (data) => {
        this.infoShop = data;
        if (data.length > 0){
          this.isAdd = false;
        }else{
          this.isAdd = true;
        }
      },
      (error) => {
        console.log(error);
      }
    )
    this.imageService.getImageByStatus("0").subscribe(
      (data) => {
        if (data instanceof Array){
          this.images = data;
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
  onSubmit(){
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    if (this.type == 'CREATE'){
      this.shopInfoService.createInfoShop(this.form.value).subscribe(
        (data) => {
          console.log(data);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Thêm sản phẩm thành công'});
          this.infoShop.push(data);
          this.form.reset();
          this.images = this.images.filter(i => data.logo.forEach(i2 => i !== i2));
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Không thêm được sản phẩm'});
        }
      );

    }else if (this.type == 'EDIT'){
      this.infoShopDialog = false;
      Swal.fire({
        title: 'Bạn có chắc muốn chỉnh sửa thông tin về shop?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Chỉnh sửa',
        denyButtonText: `Không chỉnh sửa`,
      }).then((result) => {
        if (result.isConfirmed){
          if (this.idn.length > 0){
            this.idn.forEach(i => {
              this.form.value['logo'] = this.form.value['logo'].filter(ip => ip.id !== i);
              this.form.value['imgDescription'] = this.form.value['imgDescription'].filter(ip => ip.id !== i);
            })
          }
          this.shopInfoService.updateInfoShop(this.form.value).subscribe(
            (data) => {
              this.infoShop = this.infoShop.filter(i => i.id !== data.id);
              this.infoShop.push(data);
              data.logo.forEach(i => {
                this.images = this.images.filter(i2 => i2.id !== i.id);
              })
              this.infoShopDialog = false;
              this.form.reset();
              Swal.fire('Thông tin về shop đã được chỉnh sửa!', '', 'success');
            },
            (error) =>{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'update sản phẩm thành công'});
            }
          )
        }else if (result.isDenied){
          Swal.fire('Bài viết không được chỉnh sửa', '', 'info')
        }
      })

    }
  }

  onReset(): void{
    this.submitted = false;
    this.form.reset();
  }

  get f(): {[key: string]: AbstractControl}{
    return this.form.controls;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = "upload file thành công";
              this.images.push(event.body);
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }

  openNew(){
    this.infoShopDialog = true;
    this.type = 'CREATE';
    this.submitted = false;
    this.header = 'Thêm thông tin về shop';
  }

  openEdit(info){
    this.closeAble = false;
    this.submitted = false;
    this.deleted = false;
    this.type = 'EDIT';
    this.header = 'Thay đổi thông tin về shop';
    this.infoShopDialog = true;
    this.form.patchValue(info);
    this.imageEdit = this.form.value['logo'];
    this.imageEditBanner = this.form.value['imgDescription'];

  }

  deleted: boolean = false;
  cancel(){
    this.infoShopDialog  = false;
  }

  idn: any[] = [];
  deleteImageOfProduct(event, id:number){
    this.confirmService.confirm({
      target: event.target,
      message: 'Bạn có chắc muốn xóa ảnh này?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.idn = this.idn.concat(id);
        this.imageService.deleteImageOfProduct(id).subscribe(
          (message) => {
            console.log(message);
            this.deleted = true;
            this.imageEdit = this.imageEdit.filter(i => i.id !== id);
            this.form.value['logo'] = this.form.value['logo'].filter(i => i.id !== id);
            this.images = this.images.filter(i => i.id !== id);
          }
        );
      },
      reject: () => {
        //reject action
      }
    });
  }
}
