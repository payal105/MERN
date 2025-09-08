import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import Bestseller from '../components/Bestseller'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <Bestseller />
    </div>
  )
}

export default Home
