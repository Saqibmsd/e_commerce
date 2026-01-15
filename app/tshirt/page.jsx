import React from 'react'
import Tshirt from '../components/pages/tshirt/Tshirt'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Newsletter from '../components/pages/home/Newsletter'

const Page = () => {
  return (
    <div>
        <Header />
        <Tshirt />
        <Newsletter />
        <Footer />

    </div>
  )
}

export default Page