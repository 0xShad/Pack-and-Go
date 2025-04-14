import { Document } from "mongoose"


export interface IUser {
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface UserDocumentModel extends IUser, Document {}