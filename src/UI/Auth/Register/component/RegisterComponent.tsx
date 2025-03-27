import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import { FamilyGroup } from '../../../../Core/FamilyGroups/domain/model/FamilyGroup';
import { ChangeEvent, FormEvent } from 'react';
import { UserRequest } from '../../../../Core/Users/application/dtos/request/UserRequest';
import { Password } from 'primereact/password';

interface Props {
    user: UserRequest;
    handleRegister: (e: FormEvent<HTMLFormElement>) => void;
    onChange: (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => void;
    groups: FamilyGroup[]
}

const roles = [
    { label: "Maestro", value: "teacher" },
    { label: "Secretario/a", value: "secretary" },
]

export const RegisterComponent = ({ user, handleRegister, onChange, groups }: Props) => {


    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <div className='h-[30vh] bg-[url(/background.png)] bg-center bg-cover '>
            </div>

            <div className='px-10 h-full'>
                <div className='w-full h-full flex flex-col my-5'>
                    <h1 className='text-3xl font-bold'> Registrarse </h1>
                    <p className='text-gray-600'>Ingresa todos los datos solicitados</p>
                </div>
                <form action="post" onSubmit={handleRegister}>
                    <div className='flex flex-col mt-2'>
                        <InputText
                            value={user.name}
                            name='name'
                            onChange={onChange}
                            placeholder='Nombre' />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <Dropdown
                            name='familyGroup'
                            value={user.familyGroup}
                            placeholder='Seleccionar Grupo'
                            options={groups}
                            optionLabel='name'
                            onChange={onChange}
                        />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <Dropdown
                            name='rol'
                            value={user.rol}
                            placeholder='Seleccionar Cargo'
                            options={roles}
                            optionLabel='label'
                            optionValue='value'
                            onChange={onChange}
                        />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <InputText
                            value={user.email}
                            type='email'
                            name='email'
                            onChange={onChange}
                            placeholder='Email' />
                    </div>
                    <div className='flex flex-col mt-2 w-full'>
                        <Password
                            name='password'
                            inputClassName='w-full'
                            value={user.password}
                            onChange={onChange}
                            placeholder='Contraseña' />
                    </div>
                    <div className='flex flex-col mt-2'>
                        <Button label='Registrarme' />
                    </div>
                </form>

            </div>
            <div className='absolute bottom-20 w-full '>
                <p className='text-center'>Ya tienes cuenta? <Link className='underline text-blue-400' to="/login">Iniciar Sesión</Link></p>
            </div>
        </div>
    )
}
