import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Link } from "react-router-dom"
import { AuthUserRequest } from "../../../../Core/Users/application/dtos/request/AuthUserRequest";
import { ChangeEvent, FormEvent } from "react";

interface Props {
    user: AuthUserRequest,
    handleLogin: (e:FormEvent<HTMLFormElement>) => void;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void
}

export const LoginComponent = ({ user, handleLogin, onChange }: Props) => {
    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <div className='h-[30vh] bg-[url(/cruz-background.jpg)] bg-center bg-cover '>
                <div className='w-full h-full bg-[rgba(0,0,0,0.2)] px-10 flex flex-col items-center justify-center'>

                    <div className='w-full text-center'>
                        <h1 className='text-2xl font-bold border-2 border-white text-white px-[4%] py-2 '>
                            Evangelismo
                        </h1>
                        <p className='font-bold text-white'>
                            El Jordan
                        </p>
                    </div>
                </div>
            </div>
            <div className='px-10 h-full'>
                <div className='w-full h-full flex flex-col my-5'>
                    <h1 className='text-3xl font-bold'> Login</h1>
                    <p className='text-gray-600'>Ingresa tu email y contraseña para acceder</p>
                </div>
                <form action="post" onSubmit={handleLogin}>
                    <div className='flex flex-col mt-2'>
                        <InputText
                            value={user.email}
                            name='email'
                            onChange={onChange}
                            placeholder='Email' />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <InputText
                            name='password'
                            value={user.password}
                            onChange={onChange}
                            placeholder='Contraseña' />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <Button label='Ingresar' />
                    </div>
                </form>

            </div>
            <div className='absolute bottom-20 w-full '>
                <p className='text-center'>No tiene cuenta? <Link className='underline text-blue-400' to="/registro">Registrarme</Link></p>
            </div>
        </div>
    )
}
