import { BasketItem } from "./basket-item"
import {v4 as uuidv4} from "uuid";

export class Basket {
  id= uuidv4();
  basketItems: BasketItem[]=[];
}
