import React from 'react';
import Tshirt from '../../components/pages/tshirt/Tshirt';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Newsletter from '../../components/pages/home/Newsletter';
import { products } from '@/data/products.js'; 
import { notFound } from 'next/navigation';

// 1. Add 'async' to the function
export default async function Page({ params }) {
  
  // 2. Await the params before using them
  const resolvedParams = await params;
  const rawId = resolvedParams?.id || ""; 
  
  if (!rawId) return notFound();

  // 3. Extract the ID number
  const id = parseInt(rawId.split('-')[0], 10);

  // 4. Find the product
  const product = products.find((p) => p.id === id);

  if (!product) return notFound();

  return (
    <main>
      <Header />
      <Tshirt product={product} />
      <Newsletter />
      <Footer />
    </main>
  );
}