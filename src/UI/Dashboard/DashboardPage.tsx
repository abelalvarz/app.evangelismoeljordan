import { AiOutlineCloseCircle } from "react-icons/ai"
import { MdOutlineCheckCircle } from "react-icons/md"
import { ReportService } from "../../Core/Adapters/ReportService"
import { useEffect, useState } from "react";
import { useAuth } from "../App/hooks";

export const DashboardPage = () => {
  const service = ReportService;
  const loggedUser = useAuth();
  const [isReportPending, setIsReportPending] = useState(false)

  useEffect(() => {
    const fetchCurrentReport = async () => {
      const familyGroupId = loggedUser?.loggedUser.familyGroup.id
      if (familyGroupId) {
        const response = await service.getExistReportForDate.execute(new Date(), familyGroupId)
        if (response.success)
          setIsReportPending(response.data)
      }
    }
    fetchCurrentReport()
  }, [])
  
  return (
    <div className='w-full h-[100vh] flex flex-col '>
      <div className="p-5">
        <h1 className='text-4xl font-bold text-gray-500'>Evangelismo</h1>
        <h2 className="text-gray-500">El Jordan</h2>
      </div>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        {/* <h1 className='text-4xl font-bold text-gray-500'>Evangelismo</h1>
        <p className="bg-red-300 p-3 rounded-2xl">Pendiente enviar reporte</p> */}
        {
          isReportPending ? (
            <div className="flex flex-col justify-center items-center">
              <MdOutlineCheckCircle size={100} color="black" className="bg-green-300 rounded-full" />
              <h2 className="text-gray-500">Nada pendiente</h2>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <AiOutlineCloseCircle size={100} color="black" className="bg-red-200 rounded-full" />
              <h2 className="text-gray-500">Tienes un reporte pendiente de enviar</h2>
            </div>
          )
        }


      </div>
    </div>
  )
}
