import React from 'react'
import CartPage from '../components/pages/cart/Cart'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Newsletter from '../components/pages/home/Newsletter'

const Page = () => {
  return (
    <div>
        <Header />
        <CartPage />
        <Newsletter />
        <Footer />

    </div>
  )
}

export default Page