import React, {useState, useEffect} from 'react' ;
import Title from '../../components/Title';

import { TbSum } from "react-icons/tb";
import { FaAddressBook } from "react-icons/fa6";
import { useAppContext } from '../../context/AppContext';

const Dashboard = ()=> {

    const { currency, user, getToken, toast, axios } = useAppContext();

    const [dashboardData, setDashboradData] = useState({
        bookings :[],
        totalBookings :0,
        totalRevenue :0,
    });

    const fetchDashboard = async() => {
        try {
            const {data} = await axios.get('/api/bookings/hotel', {headers: {Authorization: `Bearer ${await getToken()}`}})
            if (data.success) {
                setDashboradData(data.dashboardData)
            } else {
                toast.error(data.message)
            }
       
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(()=>{
        fetchDashboard();
    }, [user])


    return (
        <div>
            <Title align='left' title ='Dashboard' subTitle='Monitor your room listings, track booking analyze revenue-all
            in one place. Stay updated with real-time insights to ensure smooth operations.'/>
        
            <div className='flex max-sm:flex-col gap-4 my-5'>
                {/* Total booking */}
                <div className='bg-blue-500/3 border border-blue-500/10 rounded flex p-4 pr-8 max-sm:w-[220px] max-sm:gap-3 md:gap-3 
                hover:scale-110 transition-all duration-500'>
                    <FaAddressBook className='mt-2 w-5 h-5 text-blue-500/70 border rounded' />
                    <div className='flex flex-col font-medium'>
                        <p className='text-blue-500/90 text-lg'>Total Bookings : </p>
                        <p className='text-neutral-400 text-base'>{dashboardData.totalBookings}</p>
                    </div>

                </div>
          
                {/* Total Revenue*/}
                <div className='bg-blue-500/3 border border-blue-500/10 rounded flex p-4 pr-8 max-sm:w-[220px] max-sm:gap-3 md:gap-3 
                hover:scale-110 transition-all duration-500'>
                    <TbSum className='mt-2 w-5 h-5 text-blue-500/70 border rounded' />
                    <div className='flex flex-col font-medium'>
                        <p className='text-blue-500/90 text-lg'>Total Revenue : </p>
                        <p className='text-neutral-400 text-base'><span className ='text-xs text-blue-500/90'>{currency}</span> {dashboardData.totalRevenue}</p>
                    </div>

                </div>
            </div>

            <h2 className ='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
          
            <div className ='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
                <table className ='w-full'>
                    <thead className ='bg-gray-50'>
                        <tr>
                            <th className ='py-3 px-4 text-gray-800 font-medium'>User Name</th>
                            <th className ='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
                            <th className ='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
                            <th className ='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
                        </tr>
                    </thead>

                    <tbody className='text-sm'>
                        {
                            dashboardData.bookings.map((item, index) => (
                                <tr key={index}>
                                    <td className='py-3 px-4 border-t border-gray-300 text-center'>
                                        {item.user.username}
                                    </td>
                                    <td className='py-3 px-4 border-t border-gray-300 text-center'>
                                        {item.room.roomType}
                                    </td>
                                    <td className='py-3 px-4 border-t border-gray-300 text-center'>
                                        <span className='text-xs'>{currency}</span> {item.totalPrice}
                                    </td>
                                    <td className='py-3 px-4 border-t border-gray-300 flex'>
                                        <button className={`py-1 px-3 text-xs rounded-full mx-auto 
                                ${item.isPaid ?
                                                'bg-green-200 text-green-600'
                                                :
                                                'bg-amber-200 text-yellow-600'
                                            }`}>
                                            {item.isPaid ? 'Completed' : 'Pending'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        
        </div>
    );
}


export default Dashboard;