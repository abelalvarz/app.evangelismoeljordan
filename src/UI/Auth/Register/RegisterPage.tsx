import { RegisterComponent } from "./component/RegisterComponent"
import { useRegister } from "./hook/useRegister"

export const RegisterPage = () => {
    const { user, handleOnChange, handleRegister, familyGroups } = useRegister()

    return (
        <RegisterComponent
            user={user}
            handleRegister={handleRegister}
            onChange={handleOnChange}
            groups={familyGroups}
        />
    )
}
