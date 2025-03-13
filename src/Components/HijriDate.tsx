import { Calendar } from 'lucide-react'
import React from 'react'

const HijriDate = () => {
  return (
    <div className=' inner-container mx-auto rounded-2xl p-6 bg-white dark:bg-zinc-800 shadow-md flex flex-col items-center justify-center gap-2'>
        <div className='flex gap-2 text-2xl font-bold text-maingreen items-center'>
            <Calendar/>
            <span className=''>التقويم الهجري</span>
        </div>
        <span className='text-2xl dark:text-white self-center'>
        الإثنين ,       11 رمضان , 1446 هـ
        </span>

    </div>
  )
}

export default HijriDate