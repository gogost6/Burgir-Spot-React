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

export interface RegisterData {
    email: string;
    password: string;
    repassword: string;
    telephone: string;
    username: string;
}

export interface LoginData {
    [k: string]: FormDataEntryValue;
}

export interface EditProfileData {
    username: string;
    telephone: string;
    email:string;
    oldTelephone: string;
    oldUsername:string;
    oldEmail: string;
}

export interface EditPasswordData {
    _id: string;
    email: string;
    username: string;
    telephone: string;
    createdBurgirs: string[];
    likedBurgirs: string[];
    isLogged: boolean;
    oldPassword: string;
    newPassword: string;
}