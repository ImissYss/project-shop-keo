import {FormGroup} from "@angular/forms";

export class Image {
  id: number;
  name: string;
  url: string;
  imageStatus: number;

  constructor(form: FormGroup) {
    this.id = form.get("id")?.value;
    this.name = form.get("name")?.value;
    this.url = form.get("url")?.value;
  }

}
