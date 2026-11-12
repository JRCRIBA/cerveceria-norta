import './globals.css';

export const metadata = {
  title: 'NORTA - Next.js Enterprise Suite 5.0',
  description: 'Plataforma Next.js de gestión integral para Cervecería NORTA.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/assets/logo_norta_principal.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="theme-light bg-[#f7f4ed] text-[#111827] antialiased selection:bg-[#0e2334] selection:text-white">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
