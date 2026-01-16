import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Newsletter from '../components/pages/home/Newsletter'
import TopSelling from '../components/pages/topselling/Topselling'

const Page = () => {
  return (
    <div>
        <Header />
        <TopSelling />
        <Newsletter />
        <Footer />

    </div>
  )
}

export default Page