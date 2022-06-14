import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {DialogService,DynamicDialogRef} from "primeng/dynamicdialog";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Image} from "../../models/image";
import {ConfirmationService, ConfirmEventType, MessageService, SelectItemGroup} from "primeng/api";
import {ImageService} from "../../services/image.service";
import {CategoryService} from "../../services/category.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {UploadFilesService} from "../../services/uploadFiles.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-product-admin',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListByAdminComponent implements OnInit {
  // upload image
  selectedFiles?: FileList | '';
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  products: Product[] = [];
  productCopy: Product[] = [];
  productIdEdit: number = 0;
  form: FormGroup;
  selectProducts: Product[];
  statuses: any[];
  loading: boolean = true;
  productDialog: boolean;
  type: string = '';
  header: string = '';
  submitted: boolean = false;

  /////////////
  minLengthImage = false;
  productStatuses = [{value: 1, name: 'Ngừng bán'},{value: 0, name: 'Đang bán'}]
  categories: any[];
  images: Image[] = [];
  groupedCategories: SelectItemGroup[] = [];
  /////////////

  imageEdit : Image[] = [];
  position = 'bottom';

  ref: DynamicDialogRef;

  destroy$: Subject<void> = new Subject();
  deleted: boolean = false;
  closeAble: boolean = true;

  constructor(private productService: ProductService,
              private dialogService: DialogService,
              private fb: FormBuilder,
              private imageService: ImageService,
              private categoryService: CategoryService,
              private messageService: MessageService,
              private uploadService: UploadFilesService,
              private confirmService: ConfirmationService
              ) {
    this.form = this.fb.group({
      productId: [''],
      code: ['', [Validators.required, Validators.minLength(1)]],
      productName: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(10000)]],
      discount: ['', [Validators.required, Validators.min(0)]],
      count: ['', [Validators.required, Validators.min(1)]],
      category: [''],
      countLike: [''],
      countRating: [''],
      rating: [''],
      sold: [''],
      viewCount: [''],
      createTime: [''],
      productStatus: [''],
      productTutorial: [''],
      moreInformation: [''],
      categoryName: [''],
      imageProducts: [Image[''], [Validators.required]],
      productDescription: ['', [
        Validators.required,
        Validators.minLength(20),
      ]],
      information: ['', [
        Validators.required,
        Validators.minLength(20)
      ]],
      titleSeo: ['', Validators.required],
      metaTags: this.fb.array([
        this.initTagProperty()
      ]),
      metaTagNames: this.fb.array([
        this.initTagName()
      ])
    })
  }

  properties: any[] = ['og:title','og:description']

  names: any[] = ['keywords','author', 'description', 'twitter:title']

  initTagProperty() {
    return this.fb.group({
      tagId: this.fb.control(''),
      property: this.fb.control('', Validators.required),
      content: this.fb.control('', Validators.required),
    });
  }

  initTagName() {
    return this.fb.group({
      tagNameId: this.fb.control(''),
      name: this.fb.control('', Validators.required),
      content: this.fb.control('', Validators.required),
    });
  }

  get fa() { return this.form.get('metaTags') as FormArray; }
  get TagName(){ return this.form.get('metaTagNames') as FormArray;}

  addTagName(){
    this.TagName?.push(this.initTagName());
  }

  addTagPropery(){
    this.fa?.push(this.initTagProperty());
  }

  deleteTag(event,meta: any,index: number){
    if (this.type === 'EDIT' && meta.value.tagId != ''){
      this.productService.deleteMetaTag(meta.value.tagId).subscribe(
        (data) => {
          this.deleted = true;
        },
        (error) => {
          console.log(error);
        }
      )
    }
    this.fa?.removeAt(index);
  }

  deleteTagName(event,meta: any,index: number){
    if (this.type === 'EDIT' && meta.value.tagNameId != ''){
      console.log(meta);
      this.productService.deleteMetaTagName(meta.value.tagNameId).subscribe(
        (data) => {
          this.deleted = true;
        },
        (error) => {
          console.log(error);
        }
      )
    }
    this.TagName?.removeAt(index);
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFile();
    this.imageService.getAllImage().subscribe(
      (data) => {
        this.images = data.filter((i) => i.imageStatus === 0);
      },
      (error) => {
        console.log(error);
      }
    )
    this.categoryService.getCategoryChild().subscribe(
      (data) => {
        this.categories = data;
        this.categories.forEach(c => {
          let categoryGroup: any[] = [];
          c.categoryChildren.forEach(cc => {
            categoryGroup.push({label: cc.categoryName, value: {categoryId: cc.categoryId, categoryName: cc.categoryName}});
          })
          this.groupedCategories.push({label: c.name, items: categoryGroup})
        })

      },
      (error) => {
        console.log(error);
      }
    )
    this.productService.getAllProductByAdmin().subscribe(
      (data) => {
        this.products = data;
        this.productCopy = data;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    )

    this.statuses = [
      {label: 'đang bán', value: 1},
      {label: 'ngừng bán', value: 0}
    ]

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
    this.productDialog = true;
    this.deleted = false;
    this.type = 'CREATE';
    this.submitted = false;
    this.header = 'Thêm sản phẩm';
  }

  deleteSelectedProducts(){

  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  editProduct(product: Product){
    this.submitted = false;
    this.closeAble = false;
    this.deleted = false;
    this.form.patchValue(product);
    this.form.value['categoryName'] = product.categoryName;
    this.clearFormArray(this.fa);
    this.clearFormArray(this.TagName);

    product.metaTags.forEach((m, index) => {
      this.fa.push(this.fb.group(
        {
          tagId: this.fb.control(m.tagId),
          property: this.fb.control(m.property),
          content: this.fb.control(m.content)
        }
      ))
    })
    product.metaTagNames.forEach((m, index) => {
      this.TagName.push(this.fb.group(
        {
          tagNameId: this.fb.control(m.tagNameId),
          name: this.fb.control(m.name),
          content: this.fb.control(m.content)
        }
      ))
    })
    this.type = 'EDIT';
    this.header = 'Thay đổi thông tin sản phẩm';
    this.productDialog = true;
    this.imageEdit = this.form.value['imageProducts'];

  }

  deleteProduct(id: any){
    Swal.fire({
      title: 'Bạn có chắc muốn xóa sản phẩm này?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      denyButtonText: `Không xóa`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(
          (data) => {
            console.log(data);
          }
        );
        this.products = this.products.filter(n => n.productId !== id);
        Swal.fire('Đã xóa sản phẩm!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Sản phẩm không được xóa', '', 'info')
      }
    })
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
            this.deleted = true;
            this.imageEdit = this.imageEdit.filter(i => i.id !== id);
            this.form.value['imageProducts'] = this.form.value['imageProducts'].filter(i => i.id !== id);
          }
        );
      },
      reject: () => {
        //reject action
      }
    });
  }
  cancel(){
    this.productDialog = false;
    this.closeAble = true;
    this.form.reset();
  }
  inputFunc(event){
    if (event.target.value !== '' || event.target.value){
      this.products = this.products.filter(p => p.productName.toLowerCase().indexOf(event.target.value) !== -1);
    }else {
      this.products = this.productCopy;
    }
  }

  onSubmit(){
    console.log(this.form.value);
    this.submitted = true;
    if (this.form.invalid){
      console.log("invalid")
      return;
    }
    if (this.type === 'CREATE'){
      this.productDialog = false;
      this.productService.addProduct(this.form.value).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          this.products = this.products.concat(data);
          this.form.reset();
          // this.images = this.images.filter(i => data.imageProducts.forEach(i2 => i2 !== i))
          data.imageProducts.forEach(i2 => {
            this.images = this.images.filter(i => i.id !== i2.id);
          })
          Swal.fire({
            title: "Thành công",
            text: "Thêm sản phẩm thành công",
            icon: "success"
          })
        },
        (error) => {
          Swal.fire({
            title: "Lỗi",
            text: "Thêm sản phẩm thất bại",
            icon: "error"
          })
        }
      )
    }
    if (this.type === 'EDIT'){
      this.productDialog = false;
      Swal.fire({
        title: 'Bạn có chắc muốn chỉnh sửa sản phẩm này?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Chỉnh sửa',
        denyButtonText: `Không chỉnh sửa`,
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.idn.length > 0){
            this.idn.forEach(i => {
              this.form.value['imageProducts'] = this.form.value['imageProducts'].filter(ip => ip.id !== i);
            })
          }
          this.productService.updateProduct(this.form.value).subscribe(
            (data) => {
              this.products = this.products.filter(n => n.productId !== data.productId);
              this.products.push(data);
              data.imageProducts.forEach(i => {
                this.images = this.images.filter(i2 => i2.id !== i.id);
              })
              this.productDialog = false;
              this.form.reset();
              Swal.fire('Sản phẩm đã được chỉnh sửa!', '', 'success');
            }
          )
        } else if (result.isDenied) {
          Swal.fire('Sản phẩm không được chỉnh sửa', '', 'info');
          this.form.reset();
        }
      })

    }

  }

  get f(): {[key: string]: AbstractControl}{
    return this.form.controls;
  }
  onReset(): void{
    this.submitted = false;
    this.form.reset();
  }

}
