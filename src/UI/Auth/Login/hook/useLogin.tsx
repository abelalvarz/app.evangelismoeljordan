import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent } from 'react'
import { FormEvent } from 'react'
import { useToast } from '../../../App/hooks'
import { useAuth } from '../../../App/hooks'
import { UserService } from '../../../../Core/Adapters/UserService'
import { AuthUserRequest } from '../../../../Core/Users/application/dtos/request/AuthUserRequest'
import { useLoading } from '../../../App/hooks'

const initialState: AuthUserRequest = {
    email: '',
    password: ''
}

export const useLogin = () => {

    const toast = useToast()
    const loading = useLoading()
    const auth = useAuth()
    const userService = UserService;
    const navigate = useNavigate()

    const [user, setUser] = useState<AuthUserRequest>(initialState)

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (user.email === '')
            return toast?.show('warn', 'Alerta', 'Debes de ingresar un email')
        if (user.password === '')
            return toast?.show('warn', 'Alerta', 'Debes de ingresar un contraseña')

        login()
    }

    const login = async () => {
        loading?.start()

        try {
            const response = await userService.login.execute(user);

            loading?.stop()
            if (!response.success || !response.data)
                return toast?.show('error', 'Error', response.message)

            auth?.login({ email: response.data?.email, isLogged: true, name: response.data?.name, token: response.data?.token, familyGroup: response.data?.familyGroup })
            toast?.show('success', 'Exito', 'Inicio de sesión exitoso')
            navigate("/dashboard")
        } catch (error) {
            toast?.show('error', 'Error', 'Usuario o contraseña incorrecto')
        } finally {
            loading?.stop()
        }
    }

    const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    return {
        user,
        handleLogin,
        handleOnchange
    }
}
