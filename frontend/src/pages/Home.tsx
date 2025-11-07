import React from 'react'
import Wrapper from '../components/Wrapper'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeatureSection'

const Home: React.FC = () => {
  return (
    <Wrapper>
      <HeroSection />
      <FeaturesSection />
    </Wrapper>
  )
}

export default Home