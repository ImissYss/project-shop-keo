import {Image} from "./image";
import {Category} from "./category";
import {MetaTags} from "./MetaTags";
import {MetaTagsName} from "./MetaTagsName";


export class Product {
  code: string;
  productId: number;
  productName: string;
  rating: number;
  productPrice: number;
  sold: number;
  viewCount?: number;
  category?: Category;
  productTutorial: string;
  moreInformation: string;
  countRating?: number;
  discount: number;
  reviews?: any[];
  productStatus?:number;
  productDescription:string;
  information?: string;
  imageProducts: Array<Image>;
  count: number;
  countLike?: number;
  createTime: Date;
  categoryName: string;
  updateTime: string;
  titleSeo: string;
  metaTags: MetaTags[];
  metaTagNames: MetaTagsName[];
}
