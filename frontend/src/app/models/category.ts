export class Category {
  categoryId: string;
  categoryName: string;
  createTime?: string;
  updateTime?: string;
  children: Category[];

  constructor(categoryId: string) {
    this.categoryId = categoryId;
  }
}
