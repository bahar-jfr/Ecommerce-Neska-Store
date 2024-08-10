import CheckoutForm from '@/components/checkout/Form'
import ShippingCard from '@/components/checkout/ShippingCard';
import { MainLayout } from '@/components/layouts/main/Layout';
import React, { ReactElement } from 'react'

export default function CheckoutPage() {
  return (
    <div className='min-h-screen py-12 pb-32 px-24 flex items-start gap-12 text-primary-foreground'>
      <CheckoutForm/>
      <ShippingCard/>
    </div>
  )
}


CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
