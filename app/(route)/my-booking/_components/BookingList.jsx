import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import CancelAppointment from './CancelAppointment'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'

function BookingList({bookingList,expired,updateRecord}) {
  
  const onDeleteBooking=(item)=>{
    console.log(item)
    GlobalApi.deleteBooking(item.id).then(resp=>{
      console.log(resp);
      if(resp)
      {
        toast('Booking Delete Successfully!');
        updateRecord()
      }
    })
  }
  return (
    <div>
        {bookingList.length>0?bookingList.map((item,index)=>(
            <div className=' flex gap-4 items-center border p-5 m-3 rounded-lg'>
                <Image src={item.attributes.doctor.data.attributes?.image?.data?.attributes?.url}
                className='rounded-full h-[70px] w-[70px] object-cover'
                width={70}
                height={70}
                alt='doctor-image'
                />
                <div className='flex flex-col gap-2 w-full'>
                    <h2 className='font-bold text-[18px] items-center flex justify-between'>{item.attributes.doctor.data.attributes.Name}
                    {!expired&&<CancelAppointment onContinueClick={()=>onDeleteBooking(item)}/>}
                    </h2>
                    <h2 className='flex gap-2 text-gray-500'> <MapPin className='text-primary h-5 w-5'/> 
                    {item.attributes.doctor.data.attributes.Address}</h2>
                    <h2 className='flex gap-2'><Calendar className='text-primary h-5 w-5'/> Appointment On:
                     { moment(item.attributes.Date).format('DD-MMM-YYYY')} </h2>
                     <h2 className='flex gap-2'><Clock className='text-primary h-5 w-5'/> At Time : {item.attributes.Time} </h2>
                </div>
            </div>
        ))
          :
          <div className='h-[150px] w-full bg-slate-100 animate-pulse rounded-lg'>
          </div>
      }
    </div>
  )
}

export default BookingList