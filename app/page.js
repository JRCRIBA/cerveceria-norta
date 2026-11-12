'use client';

import dynamic from 'next/dynamic';

const NextBreweryApp = dynamic(() => import('../src/components/NextBreweryApp'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f4ed]">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-[#0e2334] flex items-center justify-center text-[#c9b38f] font-bold text-xl mx-auto shadow-lg border border-[#c9b38f]">
          NORTA
        </div>
        <h2 className="brand-title text-xl font-bold text-[#0e2334]">Cervecería NORTA OS 5.0</h2>
        <p className="text-xs text-[#4d3720] font-mono font-bold animate-pulse">Cargando Next.js App Router Engine...</p>
      </div>
    </div>
  )
});

export default function Home() {
  return <NextBreweryApp />;
}
