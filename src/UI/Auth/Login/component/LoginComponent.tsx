import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Link } from "react-router-dom"
import { AuthUserRequest } from "../../../../Core/Users/application/dtos/request/AuthUserRequest";
import { FormEvent } from "react";
import { Password } from "primereact/password";
import { InputSwitch } from "primereact/inputswitch";

interface Props {
    user: AuthUserRequest,
    handleLogin: (e: FormEvent<HTMLFormElement>) => void;
    onChange: (e: any) => void
}

export const LoginComponent = ({ user, handleLogin, onChange }: Props) => {
    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <div className='h-[30vh] bg-[url(/background.png)] bg-center bg-cover '>
            </div>
            <div className='px-10 h-full'>
                <div className='w-full h-full flex flex-col my-5'>
                    <h1 className='text-3xl font-bold'>Ingreso</h1>
                    <p className='text-gray-600'>Ingresa tu email y contraseña para acceder</p>
                </div>
                <form action="post" onSubmit={handleLogin}>
                    <div className='flex flex-col mt-2'>
                        <InputText
                            value={user.email}
                            name='email'
                            type="email"
                            onChange={(e: any) => onChange({ [e.target.name]: e.target.value })}
                            placeholder='Email' />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <Password
                            name='password'
                            inputClassName='w-full'
                            value={user.password}
                            onChange={(e: any) => onChange({ [e.target.name]: e.target.value })}
                            feedback={false}
                            tabIndex={1}
                            placeholder='Contraseña' />
                    </div>
                    <div className="w-full flex justify-between mt-2 mb-5">
                        <span className="text-[12px] flex items-center"><InputSwitch className="mr-1" onChange={(e: any) => onChange({ 'keepLogged': e.value })} checked={user.keepLogged}></InputSwitch>Recordarme</span>
                        {/* <Link className="text-blue-400 text-xm" to={"/forgot-password"}>Olvide mi Contraseña</Link> */}
                    </div>
                    <div className='flex flex-col mt-2'>
                        <Button label='Ingresar' />
                    </div>
                </form>

            </div >
            <div className='absolute bottom-20 w-full '>
                <p className='text-center'>No tiene cuenta? <Link className='underline text-blue-400' to="/registro">Registrarme</Link></p>
            </div>
        </div >
    )
}
