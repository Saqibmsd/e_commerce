import React from 'react'
import CasualPage from '../components/pages/casual/Casual.jsx'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Newsletter from '../components/pages/home/Newsletter'

const Page = () => {
  return (
    <div>
        <Header />
        <CasualPage />
        <Newsletter />
        <Footer />

    </div>
  )
}

export default Page