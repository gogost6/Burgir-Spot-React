import { User } from "./user";

export interface Burgir {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    meat: string;
    vegetables: string[];
    spices: string[];
    sauses: string[];
    bonus: string[];
    description: string;
    date: Date;
    imgUrl: string;
    owner: User;
    likes: string[];
    comments: string[];
    singlePrice: number;
}

export interface OrderBurgir {
    quantity: number;
    description: string;
    price: number;
    name: string;
    imgUrl: string;
    _id: string;
    totalPrice?: number;
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
