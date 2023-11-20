import React, { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

export default function Layout( {children}: {children: ReactNode}) {
  return (
    <>
    <Navbar />
      {children}
    </>
  )
}