import { browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../Config/FirebaseConfiguration";
import { AuthUserRequest } from "../../application/dtos/request/AuthUserRequest";
import { AuthUserService } from "../../application/dtos/response/AuthUserResponse";
import { IAuthUserService } from "../../application/interface/IAuthUserService";

const auth = firebaseAuth;

export class FirebaseAuthService implements IAuthUserService {

    async login(user: AuthUserRequest): Promise<AuthUserService | null> {
        try {
            const persistance = user.keepLogged ? browserLocalPersistence : browserSessionPersistence
            await setPersistence(auth, persistance)
            
            const loggedUser = await signInWithEmailAndPassword(auth, user.email, user.password);
            const token = await loggedUser.user.getIdToken()
            return { id: loggedUser.user.uid, token: token }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async signUp(user: AuthUserRequest): Promise<AuthUserService | null> {
        try {
            const createdUser = await createUserWithEmailAndPassword(auth, user.email, user.password);
            console.log(createdUser)
            return { id: createdUser.user.uid, token: "" }
        } catch (error) {
            return null;
        }
    }

}