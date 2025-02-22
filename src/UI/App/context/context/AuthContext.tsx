import { createContext } from "react";
import { FamilyGroup } from "../../../../Core/Users/application/types/FamilyGroup";

export interface ILoggedUser {
    name: string,
    email: string,
    isLogged: boolean,
    token: string,
    familyGroup: FamilyGroup
}

export interface IAuthContext {
    loggedUser: ILoggedUser,
    login: (value: ILoggedUser) => void;
    logout: () => void
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
