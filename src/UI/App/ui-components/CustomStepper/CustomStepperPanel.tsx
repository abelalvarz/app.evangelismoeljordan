
export interface ICustomStepperPanel {
    children: React.ReactNode;
    title: string;
    active: boolean,
    index?: number,
    onClick: ()=>void;
}

export const CustomStepperPanel = ({ children, active, title, index, onClick }: ICustomStepperPanel) => {
    return (
        <div className='w-full h-full '>
            <div className='w-[15vw] '>
                <button
                    onClick={onClick}
                    className="w-full h-full flex p-2 items-center bg-transparent cursor-pointer">
                    <span className='bg-blue-200 rounded-full px-3 py-1 mr-3'>{index}</span>
                    <span className="font-bold">{title}</span>
                </button>
            </div>
            <div className={`overflow-hidden relative  ${active ? 'max-h-[500px] transition-[max-height] duration-500' : 'max-h-0 transition-[max-height] duration-200'} `}>
                <div className='w-[5vw] h-full absolute flex justify-center'>
                    <div className='w-[1.5px] h-[100%] bg-gray-50'></div>
                </div>
                <div className='ml-[5%]'>
                    {children}
                </div>
            </div>
        </div>
    )
}
