
import React from 'react';
import HeroBanner from '../../Components/HeroBanner';
import "./globals.css"
import NavBar from '@/Components/NavBar';
import QuickLink from '@/Components/QuickLinks';
// import NavBar from './Components/NavBar';
 
export default function HomePage() {

  return (
    <React.Fragment >
      <HeroBanner/>
      <QuickLink/>
    </React.Fragment>
  );
}