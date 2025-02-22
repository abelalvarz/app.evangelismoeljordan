import { BiPlus } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks';

export const Navigation = () => {

    const location = useLocation();

    const auth = useAuth()
    console.log(auth?.loggedUser.isLogged)

    if (!auth?.loggedUser.isLogged) {
        return <></>
    }

    return (
        <>
            <div className='w-full h-20 bg-blue-950 absolute bottom-0 rounded-t-md'>
                <ul className='w-full h-full flex justify-around items-center'>
                    <Link
                        className={`${location.pathname === '/nuevo' ? 'text-white' : 'text-gray-400'} flex flex-col justify-center items-center text-xl`}
                        to={"/nuevo"}>
                        <BiPlus size={35} />
                        <span>Nuevo</span>
                    </Link>
                </ul>
            </div>
        </>
    )
}
