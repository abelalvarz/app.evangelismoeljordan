
import { LoginComponent } from './component/LoginComponent'
import { useLogin } from './hook/useLogin'

export const LoginPage = () => {
    const { user, handleLogin, handleOnchange } = useLogin()
    return (
        <LoginComponent
            user={user}
            handleLogin={handleLogin}
            onChange={handleOnchange}
        />
    )
}
