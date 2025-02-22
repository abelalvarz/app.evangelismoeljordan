import { useEffect, useState } from 'react'
import { ReportService } from '../../../Core/Adapters/ReportService'
import { Report } from '../../../Core/Report/domain/model/Report';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../../App/hooks';
import { useLoading } from '../../App/hooks';
import { InputText } from 'primereact/inputtext';

export const ReportViewPage = () => {

	const auth = useAuth()
	const loading = useLoading()
	const [reports, setReports] = useState<Report[]>([])
	const service = ReportService;

	useEffect(() => {
		const fetchData = async () => {
			loading?.start()
			if (!auth?.loggedUser?.familyGroup?.id)
				return;

			const response = await service.getAll.execute(auth?.loggedUser.familyGroup?.id)
			setReports(response.data)
			loading?.stop()
		}
		fetchData()
	}, [service.getAll, auth?.loggedUser?.familyGroup?.id])

	return (
		<div className='p-5'>
			<div className='mb-3'>
				<h1 className='font-bold text-2xl text-black'>Reportes</h1>
			</div>
			<div className='mb-4'>
				<InputText placeholder='Buscar por Fecha' className='w-full' />
			</div>
			<div>
				<small className='font-bold text-gray-500 ml-2'>Total</small>
				<small className='font-bold text-gray-500 ml-4'>Fecha</small>
			</div>
			<div>
				{
					reports.map((report, index) => {
						return (
							<button key={index} className='w-full bg-gray-200 p-0 rounded-md text-left my-1 flex items-center'>
								<p className='bg-blue-300 rounded-l-md p-4 mr-3 flex flex-col items-center min-w-[3rem]'>
									{/* <small>total</small> */}
									<span>{report.totalAttendance || "01"}</span>
								</p>
								<span>
									{format(new Date(report.meetingDate), "dd 'de' MMMM yyyy", { locale: es })}
								</span>

							</button>
						)
					})
				}
			</div>
		</div>
	)
}
