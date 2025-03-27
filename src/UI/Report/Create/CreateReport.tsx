import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { ReportDetail } from './components/ReportDetail';
import { Calendar } from 'primereact/calendar';
import { Report } from '../../../Core/Report/domain/model/Report';
import { useToast } from '../../App/hooks';
import { useAuth } from '../../App/hooks';
import { ReportService } from '../../../Core/Adapters/ReportService';
import { CreateReportRequest } from '../../../Core/Report/application/dtos/CreateReportRequest';
import { useLoading } from '../../App/hooks';

const initialState: Report = {
    id: null,
    familyGroup: null,
    meetingDate: new Date(),
    activeMembers: null,
    activeMembersChildren: null,
    noActiveMembers: null,
    noActiveMembersChildren: null,
    visitorChildren: null,
    visitors: null,
    totalAttendance: null,
    newChristians: null,
    reconciled: null,
    visitedHomes: null,
    vigilAttendance: null,
    offering: null,
    comments: ""
}

export const CreateReport = () => {

    const auth = useAuth()
    const toast = useToast()
    const loading = useLoading()
    const navigate = useNavigate();
    const reportService = ReportService;

    const [visible, setVisible] = useState(false)
    const [report, setReport] = useState<Report | CreateReportRequest>(initialState)

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 5)
    }, [])

    const handleOnchange = (newValues: object) => {
        setReport((prev) => ({ ...prev, ...newValues }));

    }
    const handleOnSubmit = () => {
        if (!report.meetingDate)
            return toast?.show('warn', 'Informacion', 'Se debe de seleccionar una fecha de reunion')
        if (!report.activeMembers)
            return toast?.show('warn', 'Informacion', 'Miembros activos es requerido')
        if (!report.offering)
            return toast?.show('warn', 'Informacion', 'El campo Ofrenda es requerido')

        saveReport()
    }

    const saveReport = async () => {
        if (!auth?.loggedUser.familyGroup)
            return toast?.show('error', 'Error', 'No se puede procesar la gestion en este momento')
        loading?.start()
        try {
            const data = { ...report, familyGroup: auth?.loggedUser.familyGroup || null, totalAttendance: calculateTotal() }
            const response = await reportService.create.execute(data);
            loading?.stop()

            if (!response.success)
                return toast?.show('error', 'Error', response.message)

            toast?.show('success', 'Exito', 'Reporte enviado exitosamente');
            navigate("/dashboard")
        } catch (error) {
            toast?.show('error', 'Error', "No se pudo enviar el reporte, intente mas tarde")
            loading?.stop()
        }
    }

    const calculateTotal = () => {
        const activeMembers = report.activeMembers ? report.activeMembers : 0;
        const noActiveMembers = report.noActiveMembers ? report.noActiveMembers : 0;
        const activeMembersChildren = report.activeMembersChildren ? report.activeMembersChildren : 0;
        const noActiveMembersChildren = report.noActiveMembersChildren ? report.noActiveMembersChildren : 0;
        const visitorChildren = report.visitorChildren ? report.visitorChildren : 0;
        const visitors = report.visitors ? report.visitors : 0;
        const total = activeMembers + noActiveMembers + activeMembersChildren + noActiveMembersChildren + visitorChildren + visitors;
        return total
    }
    const minDate = new Date()
    minDate.setDate(minDate.getDate() - 7)

    return (
        <div className={`w-full h-[100vh] bg-gray-100 z-1 fixed duration-500 ${visible ? 'mt-0' : 'mt-[300%]'}`}>
            <div className='bg-gray-100 p-4 '>
                <h1 className='font-bold text-2xl text-black'>Nuevo Reporte</h1>
                <button
                    onClick={() => navigate("/dashboard")}
                    className='absolute right-5 top-5'>
                    <CgClose size={25} color='red' />
                </button>
            </div>
            <div className='w-full p-5 overflow-y-scroll'>
                <div>
                    <label htmlFor="">Fecha de Reunion</label>
                    <Calendar
                        name='meetingDate'
                        value={report.meetingDate}
                        onChange={(e) => handleOnchange({ [e.target.name]: e.target.value })}
                        placeholder='Seleccionar Fecha'
                        minDate={minDate}
                        maxDate={new Date()}
                        locale='es'
                        className='bg-gray-50 rounded-md w-full' />
                </div>
                <ReportDetail
                    report={report}
                    onSubmit={handleOnSubmit}
                    calculateTotal={calculateTotal}
                    handleOnchange={handleOnchange} />
            </div>
        </div>
    )
}
