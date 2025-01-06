import { DishDto } from "./response/menu"


export interface CartItem{
    dish : DishDto,
    quantity : number
}


export interface CartState{
    cartList : CartItem[]
    total : number
    loading : boolean
    error : string | null
}
