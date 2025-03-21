import { User } from "../../domain/model/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { collection, doc, getDoc, getDocs, getFirestore, limit, query, setDoc, where } from "firebase/firestore";

const firebase = getFirestore();
const USER_COLLECTION = "Users";

export class FirebaseUserRepository implements UserRepository {

    async create(user: User): Promise<boolean> {

        try {
            console.log(user)

            if (!user.id)
                return Promise.reject("Id de usuario invalido");

            const docRef = doc(firebase, `${USER_COLLECTION}/${user.id}`);
            const familyGroup = user.familyGroup;

            await setDoc(docRef, {
                name: user.name, email: user.email, familyGroup: {
                    id: familyGroup.id,
                    name: familyGroup.name,
                    color: familyGroup.color,
                    teacher: familyGroup.teacher,
                    anfitrion: familyGroup.anfitrion,
                    leaders: familyGroup.leaders || "",
                    meetingTime: familyGroup.meetingTime,
                    meetingDay: familyGroup.meetingDay
                }, rol: user.rol, status: user.status
            })
            return Promise.resolve(true)
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getById(id: string): Promise<User | null> {

        try {
            if (!id)
                return null

            const docRef = doc(firebase, USER_COLLECTION, id)
            const user = await getDoc(docRef)

            if (!user.exists)
                throw Error("No se encontro ningun usuario con el id" + id)

            return Promise.resolve(new User(
                user.id,
                user.data()?.name,
                user.data()?.email,
                user.data()?.familyGroup,
                user.data()?.rol,
                user.data()?.status
            ))
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getByRolAndFamilyGroup(rol: string, familyGroup: string): Promise<User | null> {
        try {
            const querySnap = query(collection(
                firebase, USER_COLLECTION),
                where("rol", "==", rol),
                where("familyGroup", "==", familyGroup),
                where("status", "==", 'ACTIVE'),
                limit(1))
            const docs = await getDocs(querySnap)
            const doc = docs.docs[0]

            console.log("Doc: ",doc)
            if(!doc){
                throw Error
            }
            return new User(
                doc.id,
                doc.data()?.name,
                doc.data()?.email,
                doc.data()?.familyGroup,
                doc.data()?.rol,
                doc.data()?.status
            )

        } catch (error) {
            return null
        }
    }
}