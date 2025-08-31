'use client'
import React from 'react';
import { KundliProvider } from './context/KundliContext';

export default function ShubhamLayout({ children }) {
  return (
    <KundliProvider>
      {children}
    </KundliProvider>
  );
}