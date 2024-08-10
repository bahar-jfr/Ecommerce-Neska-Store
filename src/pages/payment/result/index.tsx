import Cancel from '@/components/payment/Cancel';
import Success from '@/components/payment/Success';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function ResultPage() {
    const resultParam = useSearchParams();
    const resultStatus = resultParam.get("status");
  
  
    return (
        <div className=''>
            {resultStatus === "cancel" ? <Cancel /> : <Success />}
        </div>
    );

}
