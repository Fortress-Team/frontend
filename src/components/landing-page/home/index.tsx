// import React from 'react'
import Hero from './hero'
import Testimonial from './testimonial'
import Cta from './cta'
import Header from '../../reuseable/header'
import Footer from '../../reuseable/footer'
import Features from './features'

const HomeIndex = () => {
  return (
    <div className='flex flex-col'>

        <Header  />
    <Hero  />
    <Features  />
    <Testimonial  />
    <Cta  />

    <Footer />
    </div>
  )
}

export default HomeIndex
