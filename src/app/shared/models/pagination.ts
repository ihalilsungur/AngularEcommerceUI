import { Product } from "../../shop/models/product";

export class Pagination {
  pageIndex:number;
  pageSize:number;
  count:number;
  data: Product[]
}
