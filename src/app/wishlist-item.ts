import { Products } from "./products";
import { User } from "./user";

export class WishlistItem {
    id?:String;
    product!:Products;
    user!:User;
}
