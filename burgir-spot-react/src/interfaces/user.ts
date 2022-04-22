export interface User {
    _id: string;
    email: string;
    username: string;
    telephone: string;
    hashedPassword: string;
    createdBurgirs: [];
    likedBurgirs: [];
    isLogged: boolean;
    isAdmin: boolean;
}