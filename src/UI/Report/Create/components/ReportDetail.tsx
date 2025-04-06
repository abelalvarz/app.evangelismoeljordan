import { Button } from 'primereact/button';
import { useState } from 'react';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Report } from '../../../../Core/Report/domain/model/Report';
import { useToast } from '../../../App/hooks';
import { CustomStepper, CustomStepperPanel } from '../../../App/ui-components/CustomStepper';

interface Props {
    report: Report;
    handleOnchange: (value: object) => void;
    onSubmit: VoidFunction,
    calculateTotal: () => number;
}

export const ReportDetail = ({ handleOnchange, report, onSubmit, calculateTotal }: Props) => {
    const toast = useToast()
    const [active, setActive] = useState(0);
    const [isInvalid, setInvalid] = useState('')

    const handleNext = () => {
        if (!validateField()) {
            return;
        }

        if (active === 2)
            return;
        setActive(active + 1)
    }

    const handleActiveOnchange = (index: number) => {
        if (!validateField()) {
            return;
        }
        setActive(index)
    }

    const validateField = () => {
        if (active === 0 && report.activeMembers === null) {
            setInvalid("activeMembers")
            toast?.show("info", "Error", "El campo Miembros Activos es requerido");
            return false
        }
        if (active === 1 && report.vigilAttendance === null) {
            setInvalid("vigilAttendance")
            toast?.show("info", "Error", "El campo Asistencia a Vigilia es requerido");
            return false
        }
        return true;
    }

    return (
        <div className='w-full overflow-y-scroll'>
            <CustomStepper>
                <small className='ml-3 mt-5 text-red-500'>Los campos marcados con (*) son requeridos.</small>
                <CustomStepperPanel
                    title="Asistencia"
                    onClick={() => handleActiveOnchange(0)}
                    handleNext={active === 0 ? handleNext :null}
                    active={active === 0}>

                    <div className='px-0 pr-4'>
                        <div className='w-full flex justify-between items-center'>
                            <label htmlFor="">Miembros Activos <span className='text-red-500 ml-1'>*</span></label>
                            <InputNumber
                                value={report.activeMembers}
                                invalid={isInvalid === 'activeMembers'}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "activeMembers": e.value })}
                                inputClassName='w-20 mr-5 text-center' />
                        </div>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label htmlFor="">Hijos de miembros Activos</label>
                            <InputNumber
                                value={report.activeMembersChildren}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "activeMembersChildren": e.value })}
                                inputClassName='w-20 mr-5 text-center' />
                        </div>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label htmlFor="">Miembros no Activos</label>
                            <InputNumber
                                value={report.noActiveMembers}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "noActiveMembers": e.value })}
                                inputClassName='w-20 mr-5 text-center' />
                        </div>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label htmlFor="">Hijos de miembros no Activos</label>
                            <InputNumber
                                value={report.noActiveMembersChildren}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "noActiveMembersChildren": e.value })}
                                inputClassName='w-20 mr-5 text-center' />
                        </div>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label htmlFor="">Niños visitantes</label>
                            <InputNumber
                                value={report.visitorChildren}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "visitorChildren": e.value })}
                                inputClassName='w-20 mr-5 text-center' />
                        </div>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label htmlFor="">Visitantes</label>
                            <InputNumber
                                value={report.visitors}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "visitors": e.value })}
                                inputClassName='w-20 mr-5 text-center' />
                        </div>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label className='font-semibold' htmlFor="">Asistencia total</label>
                            <InputNumber
                                value={report.totalAttendance || calculateTotal()}
                                // onChange={() => )}
                                inputClassName='w-20 mr-5 text-center' disabled />
                        </div>
                    </div>
                </CustomStepperPanel>
                <CustomStepperPanel
                    onClick={() => handleActiveOnchange(1)}
                    title="Evangelizacion"
                    handleNext={active === 1 ? handleNext : null}
                    active={active === 1}>
                    <div className='px-0 pr-4'>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label htmlFor="">Aceptados</label>
                            <InputNumber
                                value={report.newChristians}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "newChristians": e.value })}
                                inputClassName='w-20 mr-5 text-center' />
                        </div>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label htmlFor="">Reconciliados</label>
                            <InputNumber
                                value={report.reconciled}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "reconciled": e.value })}
                                inputClassName='w-20 mr-5 text-center' />
                        </div>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label htmlFor="">Hogares Visitados</label>
                            <InputNumber
                                value={report.visitedHomes}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "visitedHomes": e.value })}
                                inputClassName='w-20 mr-5 text-center' />
                        </div>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label htmlFor="">Asistencia a Vigilia<span className='text-red-500 ml-1'>*</span></label>
                            <InputNumber
                                value={report.vigilAttendance}
                                invalid={isInvalid === 'vigilAttendance'}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "vigilAttendance": e.value })}
                                inputClassName='w-20 mr-5 text-center' />
                        </div>
                    </div>
                </CustomStepperPanel>
                <CustomStepperPanel
                    onClick={() => handleActiveOnchange(2)}
                    title="Ofrenda"
                    handleNext={ null}
                    active={active === 2}>
                    <div className='px-0 pr-4 pb-5'>
                        <div className='w-full flex justify-between items-center mt-2'>
                            <label htmlFor="">Ofrenda<span className='text-red-500 ml-1'>*</span></label>
                            <InputNumber
                                value={report.offering}
                                onChange={(e: InputNumberChangeEvent) => handleOnchange({ "offering": e.value })}
                                mode="currency" 
                                currency="GTQ" 
                                locale="es-GT" 
                                inputClassName='w-24 mr-5 text-center' />
                        </div>
                        <div className='w-full flex flex-col justify-between  mt-2'>
                            <label htmlFor="">Comentarios</label>
                            <InputTextarea
                                value={report.comments}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleOnchange({ "comments": e.target.value })}
                                className='w-full mr-5' rows={3} cols={20} />
                        </div>
                    </div>
                </CustomStepperPanel>
            </CustomStepper>
            <div className="w-full h-20 flex pt-4 justify-content-between items-center">
                <Button
                    className='w-full ml-4' label={`${active === 2 ? 'Enviar' : "Siguiente"}`} icon={`pi ${active === 2 ? "pi-send" : "pi-arrow-right"}`} iconPos="right" onClick={active === 2 ? onSubmit : handleNext} />
            </div>
        </div>
    )
}
