
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FamilyGroupService } from '../../../../Core/Adapters/FamilyGroupService';
import { UserService } from '../../../../Core/Adapters/UserService';
import { useToast } from '../../../App/hooks';
import { FamilyGroup } from '../../../../Core/FamilyGroups/domain/model/FamilyGroup';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { UserRequest } from '../../../../Core/Users/application/dtos/request/UserRequest';
import { useLoading } from '../../../App/hooks';

const initialState = {
    name: '',
    email: '',
    password: '',
    familyGroup: null,
    rol: ''
}

export const useRegister = () => {

    const familyGroupService = FamilyGroupService;
    const userService = UserService;
    const toast = useToast()
    const navigate = useNavigate()
    const loading = useLoading()
    const [familyGroups, setFamilyGroups] = useState<FamilyGroup[]>([]);
    const [user, setUser] = useState<UserRequest>(initialState)

    useEffect(() => {
        const getAllFamilyGroups = async () => {
            const response = await familyGroupService.getAll.execute();

            if (!response.success)
                return;

            setFamilyGroups(response?.data)
        }

        getAllFamilyGroups()
    }, [familyGroupService.getAll])


    const handleOnChange = (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
        console.log(e)
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(user.name === '')
            return toast?.show('warn', 'Alerta','Debes de ingresar tu Nombre')
        if(user.rol === '')
            return toast?.show('warn', 'Alerta','Debes de seleccionar tu cargo')
        if(!user.familyGroup)
            return toast?.show('warn', 'Alerta','Debes de seleccionar Grupo Familiar')
        if(user.email === '')
            return toast?.show('warn', 'Alerta','Debes de ingresar un email')
        if(user.password === '')
            return toast?.show('warn','Alerta', 'Debes de ingresar un contraseña')
        
        registerUser()
    }

    const registerUser = async () => {
        console.log("User to save: ",user)
        loading?.start()
        const response = await userService.create.execute(user)

        loading?.stop()
        if (!response.success) {
            return toast?.show('error', 'Error', response.message);
        }
        toast?.show('success', 'Exito', 'Usuario registrado exitosamente')
        navigate("/login")
    }
    return {
        user,
        handleOnChange,
        handleRegister,
        familyGroups
    }
}
