import React from 'react'
const Footer = React.lazy(()=>import('../common/Footer'))
const Header = React.lazy(()=>import('../common/Header'))
const CountoryServed = React.lazy(()=>import('../home/CountoryServed'))
const Customers = React.lazy(()=>import('../home/Customers'))
const DataSpeak = React.lazy(()=>import('../home/DataSpeak'))
const DownloadApp = React.lazy(()=>import('../home/DownloadApp'))
const HomeCrausal = React.lazy(()=>import('../home/HomeCrausal'))
const OurExpert = React.lazy(()=>import('../home/OurExpert'))
const OurProgramme = React.lazy(()=>import('../home/OurProgramme'))
const Webinar = React.lazy(()=>import('../home/Webinar'))
const StartJourneyWithUs = React.lazy(()=>import('../home/StartJourneyWithUs'))
const ScrollToTopHome = React.lazy(()=>import('../../hooks/ScrollToTopHome'))


const Home = () => {
  return (
    <>
      <Header />
      <HomeCrausal/>
      <StartJourneyWithUs />
      <DataSpeak />
      <Customers />
      <OurProgramme />
      <Webinar />
      <OurExpert />
      <CountoryServed />
      <DownloadApp />
      <Footer />
      <ScrollToTopHome />
    </>
  )
}

export default Home
