import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore/lite";
import { firebaseApp } from "../../../Config/FirebaseConfiguration";
import { FamilyGroup } from "../../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../../domain/repository/FamilyGroupRepository";

const firebase = firebaseApp;
const COLLECTION_NAME = "Family_Groups";

export class FirebaseFamilyGroupRepository implements FamilyGroupRepository {

    async create(familyGroup: FamilyGroup): Promise<boolean> {
        try {
            const docRef = collection(firebase, COLLECTION_NAME)
            await addDoc(docRef, familyGroup)
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async getAll(): Promise<FamilyGroup[]> {
        const response = await getDocs(collection(firebase, COLLECTION_NAME));

        const familyGroups: FamilyGroup[] = response.docs.map(doc => new FamilyGroup(
            doc.id,
            doc.data().name,
            doc.data().color,
            doc.data().teacher,
            doc.data().anfitrion,
            doc.data().leaders,
            doc.data().meetingTime,
            doc.data().meetingDay
        ))
        return Promise.resolve(familyGroups)
    }

    async getById(id: string): Promise<FamilyGroup | null> {
        const docRef = doc(firebase,COLLECTION_NAME, id);
        const group = await getDoc(docRef)
        if(!group.exists)
            return Promise.reject("No se encontro el grupo con id: "+id)

        return Promise.resolve(new FamilyGroup(
            group.id,
            group.data()?.name,
            group.data()?.color,
            group.data()?.teacher,
            group.data()?.anfitrion,
            group.data()?.leaders,
            group.data()?.meetingTime,
            group.data()?.meetingDay
        ))
    }

    async update(familyGroup: Partial<FamilyGroup>): Promise<boolean> {
        try {
            if (!familyGroup.id)
                throw Error("El id no es valido")


            const docRef = doc(firebase, COLLECTION_NAME, familyGroup?.id)
            await updateDoc(docRef, familyGroup)
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async delete(id: string): Promise<boolean> {
        try {
            const docRef = doc(firebase, COLLECTION_NAME, id);
            await deleteDoc(docRef)
            return true
        } catch (error) {
            console.log(error)
            return false;
        }
    }

}
