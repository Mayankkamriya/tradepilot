import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'TradePilot' }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="TradePilot Project Bidding System" />
      </Head>
      
      <Navbar />
      
      <main className="">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}