import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="page-layout">
      <Header />
      <main className="main-content">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}