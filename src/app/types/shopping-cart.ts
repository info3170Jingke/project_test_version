import { CartItem } from "./CartItem";

export class ShoppingCart {
    items: CartItem[] = new Array<CartItem>();
    grossTotal: number = 0;
    itemsTotal: number = 0;

    public updateForm(src: ShoppingCart){
        this.items = src.items;
    }
}