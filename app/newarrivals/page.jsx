import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Newsletter from '../components/pages/home/Newsletter'
import NewArrivals from '../components/pages/newarrivals/Newarrivals'

const Page = () => {
  return (
    <div>
        <Header />
        <NewArrivals />                                                                                           
        <Newsletter />
        <Footer />

    </div>
  )
}

export default Page