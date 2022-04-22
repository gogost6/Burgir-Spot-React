import { User } from "./user";

export interface Burgir {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    meat: string;
    vegetables: [];
    spices: [];
    sauses: [];
    bonus: [];
    description: string;
    date: Date;
    imgUrl: string;
    owner: User;
    likes: [];
    comments: [];
    singlePrice: number;
}

export interface OrderBurgir {
    quantity: number;
    totalPrice: number;
    singlePrice: number;
    description: string;
    price: number;
    name: string;
    imgUrl: string;
    _id: string;
}

export interface BurgirQuantity {
    quantity: number;
    name: string;
}

export interface InitialBurgir {
    bonus: string[];
    description: string;
    imgUrl: string;
    meat: string;
    name: string;
    price: number;
    sauses: string[];
    spices: string[];
    vegetables: string[];
}
