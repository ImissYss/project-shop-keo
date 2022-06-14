import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../models/category";
import {fakeAsync} from "@angular/core/testing";
import {CategoryService} from "../../services/category.service";
import Swal from "sweetalert2";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  categoryParents: Category[] = [];
  categories: Category[] = [];
  submitted = false;
  close: boolean = false;
  deleted: boolean = false;

  dialogCategory: boolean = false;
  header: string = '';
  type: string = '';

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private productService: ProductService) {
    this.form = this.fb.group({
      categoryId: [''],
      categoryName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]],
      titleSeo: ['', Validators.required],
      metaTags: this.fb.array([
        this.initTagProperty()
      ]),
      metaTagNames: this.fb.array([
        this.initTagName()
      ]),
      categoryParent: [''],
      createTime: ['']
    })
  }

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
  ngOnInit(): void {

    this.categoryService.getAllCateForEdit().subscribe(
      (data) => {
        this.categories = data;
      }
    )

    this.categoryService.getCategoryParent().subscribe(
      (data) => {
        this.categoryParents = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  get f(): {[Key: string]: AbstractControl}{
    return this.form.controls;
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

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  editCategory(category: any){
    this.type = 'EDIT';
    console.log("chinh sua category");
    console.log(category);
    this.header = "Chỉnh sửa tên danh mục";
    this.dialogCategory = true;
    this.form.patchValue(category);
    this.clearFormArray(this.fa);
    this.clearFormArray(this.TagName);
    category.metaTags.forEach((m, index) => {
      this.fa.push(this.fb.group(
        {
          tagId: this.fb.control(m.tagId),
          property: this.fb.control(m.property),
          content: this.fb.control(m.content)
        }
      ))
    })
    category.metaTagNames.forEach((m, index) => {
      this.TagName.push(this.fb.group(
        {
          tagNameId: this.fb.control(m.tagNameId),
          name: this.fb.control(m.name),
          content: this.fb.control(m.content)
        }
      ))
    })

    this.close = true;
  }
  properties: any[] = ['og:title','og:description']

  names: any[] = ['keywords','author', 'description', 'twitter:title']

  createCategory(){
    this.close = true;
    this.dialogCategory = true;
    this.header = "Tạo danh mục sản phẩm";
    this.type = 'CREATE';
  }
  onReset(){
    this.form.reset();
  }
  cancel(){
    this.dialogCategory = false;
    this.form.reset();
    this.close = false;
  }
  deleteCategory(category_id: any){
    Swal.fire({
      title: 'Bạn có chắc muốn xóa danh mục này?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      denyButtonText: `Không xóa`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category_id).subscribe(
          (data) => {

          }
        );
        this.categories = this.categories.filter(n => n.categoryId !== category_id);
        this.categoryParents = this.categoryParents.filter(c => c.categoryId !== category_id);
        Swal.fire('Đã xóa danh mục!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Danh mục không được xóa', '', 'info')
      }
    })
  }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    if (this.form.value['categoryParent'] === ""){
      this.form.value['categoryParent'] = null;
    }
    if (this.type === 'CREATE'){
      this.categoryService.addCategory(this.form.value).subscribe(
        (data) => {
          this.form.reset();
          this.dialogCategory = false;
          if (data.categoryParent === null){
            this.categoryParents.push(data);
          }
          this.categories.push(data);
          Swal.fire({
            title: "Success",
            text: "add category success",
            icon: "success"
          })
        },
        (error) => {
          Swal.fire({
            title: "Error",
            text: "add category failed",
            icon: "error"
          })
        }
      )
    }
    if (this.type === 'EDIT'){
      this.dialogCategory = false;
      Swal.fire({
        title: 'Bạn có chắc muốn chỉnh sửa sản phẩm này?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Chỉnh sửa',
        denyButtonText: `Không chỉnh sửa`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoryService.updateCategory(this.form.value).subscribe(
            (data) => {
              this.categories = this.categories.filter(n => n.categoryId !== data.categoryId);
              this.categories.push(data);
              this.dialogCategory = false;
              this.form.reset();
              Swal.fire('Danh mục đã được chỉnh sửa!', '', 'success');
            }
          )
        } else if (result.isDenied) {
          Swal.fire('Danh mục không được chỉnh sửa', '', 'info');
          this.form.reset();
        }
      })
    }
  }
}
