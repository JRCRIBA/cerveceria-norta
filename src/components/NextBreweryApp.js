'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_BREWERY_DATA } from '../data/initialData';
import { evaluateBatchStageAdvance } from '../bridges/batch-invima-bridge';

// ==========================================================================
// CERVECERÍA NORTA - REACT APPLICATION CORE (ENTERPRISE V5.0)
// ==========================================================================



// ==========================================================================
// COMPONENTE: NavItem
// ==========================================================================
function NavItem({ icon, label, active, badge, badgeColor, onClick, theme }) {
  const activeClass = theme === 'dark'
    ? 'bg-gradient-to-r from-[#c9b38f]/20 to-[#4d3720]/20 text-[#c9b38f] border border-[#c9b38f]/40 shadow-sm font-bold'
    : 'bg-[#0e2334] text-white border border-[#0e2334] shadow-md font-bold';
  const inactiveClass = theme === 'dark'
    ? 'text-[#a39e93] hover:text-slate-200 hover:bg-[#1f1f1c]'
    : 'text-[#374151] hover:text-[#0e2334] hover:bg-[#e6dfce] font-semibold';

  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all ${active ? activeClass : inactiveClass}`}>
      <div className="flex items-center gap-3"><span className="text-base">{icon}</span><span className="truncate">{label}</span></div>
      {badge && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${badgeColor || (theme === 'dark' ? 'bg-neutral-800 text-slate-300' : 'bg-[#e2d8c3] text-[#0e2334]')}`}>{badge}</span>}
    </button>
  );
}




// ==========================================================================
// MÓDULO NUEVO: DOCUMENTOS DEL SISTEMA DE CONTROL INVIMA (11 CARPETAS OFICIALES)
// ==========================================================================

// ==========================================================================
// ==========================================================================
// COMPONENTES ICONOGRÁFICOS LUCIDE SVG (5S SEIKETSU - CERO EMOJIS)
// ==========================================================================
function SvgFolder({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 8 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
    </svg>
  );
}

function SvgFolderOpen({ className = "w-5 h-5", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>
    </svg>
  );
}

function SvgFileText({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
    </svg>
  );
}

function SvgFileSpreadsheet({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/>
    </svg>
  );
}

function SvgCheckCircle({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function SvgAlertTriangle({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}

function SvgDownload({ className = "w-3.5 h-3.5", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function SvgExternalLink({ className = "w-3.5 h-3.5", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  );
}

function SvgTrash({ className = "w-3.5 h-3.5", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  );
}


function SvgSearch({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function SvgX({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}

function SvgCheck({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function SvgAlertCircle({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
    </svg>
  );
}

function SvgRefresh({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
    </svg>
  );
}

function SvgPackage({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/>
    </svg>
  );
}

function SvgClipboard({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    </svg>
  );
}

function SvgPrinter({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>
    </svg>
  );
}

function SvgBuilding({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/>
    </svg>
  );
}

function SvgBeer({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 3 11 3s2 .5 3 .5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"/><path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/>
    </svg>
  );
}

function SvgUsers({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function SvgShoppingCart({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  );
}

function SvgScale({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  );
}

function SvgCompass({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  );
}

function SvgLayoutDashboard({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  );
}

function SvgFlame({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  );
}

function SvgWheat({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l1.53-1.53a3.5 3.5 0 0 0 0-4.94L13 11l-1.53 1.53a3.5 3.5 0 0 0 0 4.94Z"/><path d="M15.47 13.47 17 15l1.53-1.53a3.5 3.5 0 0 0 0-4.94L17 7l-1.53 1.53a3.5 3.5 0 0 0 0 4.94Z"/>
    </svg>
  );
}

function SvgFlaskConical({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>
    </svg>
  );
}

function SvgBoxes({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/>
    </svg>
  );
}

function SvgShieldCheck({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

// COMPONENTE: WaterControlFormSection
// ==========================================================================
function WaterControlFormSection({ metadata, logs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('07:30');
  const [location, setLocation] = useState('Llave de Maceración (Muela)');
  const [chlorineMgL, setChlorineMgL] = useState('1.20');
  const [ph, setPh] = useState('7.20');
  const [verifiedBy, setVerifiedBy] = useState('Ing. Julio Roberto Cristancho');
  const [notes, setNotes] = useState('');

  // Validación automática según Decreto 2115 de 2007 (Cloro: 0.3 - 2.0 mg/L, pH: 6.5 - 9.0)
  const complies = useMemo(() => {
    const cl = parseFloat(chlorineMgL) || 0;
    const phVal = parseFloat(ph) || 0;
    return (cl >= 0.3 && cl <= 2.0 && phVal >= 6.5 && phVal <= 9.0) ? "SI" : "NO";
  }, [chlorineMgL, ph]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: `WLOG-${Math.floor(100 + Math.random() * 900)}`,
      date,
      time,
      location,
      chlorineMgL: parseFloat(chlorineMgL),
      ph: parseFloat(ph),
      complies,
      verifiedBy,
      notes: notes || (complies === 'SI' ? 'Parámetros conformes Decreto 2115.' : 'Alerta: No conformidad en parámetros.')
    };
    onAddLog(newLog);
    setNotes('');
  };

  const handleExportDocx = () => {
    alert("Exportando formato FO-AG-002 con la estructura original .docx...\\n(Conserva membrete, cuadro Decreto 2115 y tabla de mediciones).");
    onExportCSV('FO-GC-001_CONTROL_AGUA_POTABLE', logs);
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      
      {/* ENCABEZA MEMBRETE ESTRUCTURAL DE FO-AG-002 */}
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#0e2334]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA SGC
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4d3720]">SISTEMA DE GESTIÓN DE CALIDAD</span>
              <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">FORMATO DE CONTROL DE AGUA POTABLE</h3>
            </div>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[#0e2334]">CÓDIGO: FO-GC-001</span>
            <span className="block text-[#4b5563]">ELABORACIÓN: OCTUBRE 2026</span>
            <span className="block font-bold text-emerald-700">VERSIÓN: 01</span>
          </div>
        </div>

        {/* RECUADRO DE PARÁMETROS Y FRECUENCIA (DECRETO 2115 DE 2007) */}
        <div className="bg-[#f0eae0] p-3 rounded-lg border border-[#d4c8b5] text-xs space-y-1.5 text-[#374151]">
          <p><strong className="text-[#0e2334] font-bold">PARÁMETROS (Decreto 2115 de 2007):</strong> La cantidad de Cloro Libre en agua potable es de <span className="font-bold text-[#0e2334]">0.3 a 2.0 mg / L (Cl2)</span>. pH entre <span className="font-bold text-[#0e2334]">6.5 a 9.0</span>. Si los parámetros NO CUMPLEN, realizar segunda toma en otro punto; si la no conformidad continúa, remitirse al Programa de Control de Agua Potable y aplicar medidas correctivas.</p>
          <p><strong className="text-[#0e2334] font-bold">FRECUENCIA DE REGISTRO:</strong> Una vez al día, antes de iniciar los procesos de producción cervecera.</p>
        </div>
      </div>

      {/* FORMULARIO INTERACTIVO PARA REGISTRAR NUEVA MEDICIÓN */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
            <SvgEdit className="w-4 h-4 inline" />
            <span>Nuevo Registro de Datos (Replicando Formato FO-GC-001 (Decreto 2115/2007))</span>
          </h4>
          <span className={`badge font-bold ${complies === 'SI' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300 animate-pulse'}`}>
            Estado: {complies === 'SI' ? 'CUMPLE (SI)' : 'NO CUMPLE (NO)'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="brew-label">Fecha (dd/mm/aaaa)</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Hora (hh:mm)</label>
            <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Lugar de Toma de Muestra</label>
            <select value={location} onChange={(e)=>setLocation(e.target.value)} className="brew-select font-bold text-[#0e2334]">
              <option value="Llave de Maceración (Muela)">Llave de Maceración (Muela)</option>
              <option value="Tanque de Reserva de Agua Potable">Tanque de Reserva de Agua Potable</option>
              <option value="Salida Filtro de Carbón Activado">Salida Filtro de Carbón Activado</option>
              <option value="Salida Ablandador de Agua">Salida Ablandador de Agua</option>
              <option value="Grifo de Lavado CIP">Grifo de Lavado CIP</option>
            </select>
          </div>

          <div>
            <label className="brew-label">Cloro Residual (mg/L Cl2)</label>
            <input type="number" step="0.05" value={chlorineMgL} onChange={(e)=>setChlorineMgL(e.target.value)} className="brew-input font-mono font-bold text-[#0e2334]" placeholder="0.3 - 2.0" required />
          </div>

          <div>
            <label className="brew-label">Nivel de pH</label>
            <input type="number" step="0.05" value={ph} onChange={(e)=>setPh(e.target.value)} className="brew-input font-mono font-bold text-[#0e2334]" placeholder="6.5 - 9.0" required />
          </div>

          <div>
            <label className="brew-label">Cumple Decreto 2115</label>
            <input type="text" value={complies} readOnly className={`brew-input font-mono font-extrabold text-center ${complies === 'SI' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`} />
          </div>

          <div>
            <label className="brew-label">Quién Hace la Toma y Verifica</label>
            <input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-semibold text-[#0e2334]" required />
          </div>

          <div>
            <label className="brew-label">Observaciones / Medidas</label>
            <input type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Notas o medidas correctivas..." className="brew-input" />
          </div>

          <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
              Guardar Registro en FO-AG-002
            </button>
          </div>
        </form>
      </div>

      {/* TABLA OFICIAL REPLICANDO ESTRUCTURA EXACTA DEL FORMATO FO-AG-002 */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#e5e7eb]">
          <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
            <SvgClipboard className="w-4 h-4 inline" />
            <span>Registros Históricos FO-GC-001 (Control de Agua Potable) (Control de Agua Potable)</span>
            <span className="badge badge-dorado font-mono">{logs.length} Mediciones</span>
          </h4>

          <div className="flex items-center gap-2">
            <button onClick={handleExportDocx} className="btn-norta-primary text-xs py-1.5 px-3 bg-[#0e2334] text-white border border-[#c9b38f] flex items-center gap-1 font-bold">
              <SvgFileText className="w-4 h-4 inline mr-1" /><span>Exportar .docx Original</span>
            </button>
            <button onClick={() => window.print()} className="btn-norta-secondary text-xs py-1.5 px-3 border-[#0e2334] text-[#0e2334] font-bold">
              Imprimir Formato
            </button>
          </div>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead>
              <tr className="bg-[#0e2334] text-white text-xs">
                <th className="border border-slate-600 text-center">FECHA<br/><span className="text-[10px] font-mono">(dd/mm/aa)</span></th>
                <th className="border border-slate-600 text-center">HORA</th>
                <th className="border border-slate-600">LUGAR DE TOMA DE MUESTRA</th>
                <th className="border border-slate-600 text-center">CLORO RESIDUAL<br/><span className="text-[10px] font-mono">(mg/L Cl2)</span></th>
                <th className="border border-slate-600 text-center">NIVEL DE pH</th>
                <th className="border border-slate-600 text-center">CUMPLE<br/><span className="text-[10px] font-mono">(SI / NO)</span></th>
                <th className="border border-slate-600">QUIEN HACE LA TOMA Y VERIFICA</th>
                <th className="border border-slate-600">OBSERVACIONES / MEDIDAS</th>
                <th className="border border-slate-600 text-center">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#faf8f3] text-xs">
                  <td className="font-mono text-center font-bold text-[#0e2334] border border-[#d4c8b5]">{log.date}</td>
                  <td className="font-mono text-center text-[#374151] border border-[#d4c8b5]">{log.time}</td>
                  <td className="font-bold text-[#0e2334] border border-[#d4c8b5]">{log.location}</td>
                  <td className="font-mono text-center font-bold text-[#0e2334] border border-[#d4c8b5]">{parseFloat(log.chlorineMgL).toFixed(2)}</td>
                  <td className="font-mono text-center font-bold text-[#0e2334] border border-[#d4c8b5]">{parseFloat(log.ph).toFixed(2)}</td>
                  <td className="text-center font-extrabold border border-[#d4c8b5]">
                    <span className={`px-2 py-0.5 rounded text-[11px] ${log.complies === 'SI' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {log.complies}
                    </span>
                  </td>
                  <td className="font-semibold text-[#111827] border border-[#d4c8b5]">{log.verifiedBy}</td>
                  <td className="text-[#4b5563] border border-[#d4c8b5]">{log.notes}</td>
                  <td className="text-center border border-[#d4c8b5]">
                    <button onClick={() => onDeleteLog(log.id)} className="text-red-600 hover:text-red-800 text-xs font-bold px-2 py-0.5" title="Eliminar registro"><SvgTrash className="w-3.5 h-3.5 text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}




// ==========================================================================
// COMPONENTE: FORMATO DE INGRESO DE MATERIALES (FO-ALM-001 - ALMACENAMIENTO)
// ==========================================================================
function StorageIngressFormSection({ metadata, logs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [product, setProduct] = useState('Malta Pale Ale 2-Row (Sacos 25kg)');
  const [batchLot, setBatchLot] = useState('MAL-AND-2026-09');
  const [quantity, setQuantity] = useState('500 kg');
  const [supplier, setSupplier] = useState('Maltería Andina S.A.S.');
  const [expiryDate, setExpiryDate] = useState('2027-08-30');
  const [notes, setNotes] = useState('Empaques e inspección de calidad conformes.');
  const [responsible, setResponsible] = useState('Ing. Julio Roberto Cristancho');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: `SLOG-${Math.floor(100 + Math.random() * 900)}`,
      date,
      product,
      batchLot,
      quantity,
      supplier,
      expiryDate,
      notes,
      responsible
    };
    onAddLog(newLog);
  };

  const handleExportExcel = () => {
    alert("Exportando Formato de Ingreso de Materiales FO-ALM-001 en Excel (.xlsx)...\n(Conserva la estructura, membrete y tabla original de Almacenamiento).");
    onExportCSV('FO-GC-015_INGRESO_MATERIALES', logs);
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      
      {/* ENCABEZADO MEMBRETE OFICIAL DE FO-ALM-001 */}
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#0e2334]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA ALM
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4d3720]">PROGRAMA DE ALMACENAMIENTO</span>
              <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">Formato de Ingreso de Materiales</h3>
            </div>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[#0e2334]">CÓDIGO: FO-GC-015</span>
            <span className="block text-[#4b5563]">ELABORACIÓN: OCTUBRE 2026</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 1</span>
          </div>
        </div>

        <div className="bg-[#f0eae0] p-3 rounded-lg border border-[#d4c8b5] text-xs text-[#374151]">
          <p><strong className="text-[#0e2334] font-bold">OBJETIVO DE ALMACENAMIENTO:</strong> Registro y control de ingreso de materias primas, insumos y empaques en la bodega principal de Cervecería NORTA, garantizando la inspección de lotes, vida útil y condiciones sanitarias de recepción.</p>
        </div>
      </div>

      {/* FORMULARIO DE INGRESO DE MATERIALES */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
            <SvgPackage className="w-4 h-4 inline" />
            <span>Nuevo Registro de Ingreso (Replicando Formato FO-GC-015 (Ingreso de Materiales))</span>
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="brew-label">Fecha de Ingreso</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Producto / Material</label>
            <input type="text" value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="Ej: Malta Pilsner Premium (Sacos 25kg)" className="brew-input font-semibold text-[#0e2334]" required />
          </div>

          <div>
            <label className="brew-label">Lote del Proveedor</label>
            <input type="text" value={batchLot} onChange={(e)=>setBatchLot(e.target.value)} placeholder="Ej: MAL-AND-2026-09" className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Cantidad Ingresa</label>
            <input type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder="Ej: 500 kg / 25 kg / 2,400 uds" className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Proveedor</label>
            <select value={supplier} onChange={(e)=>setSupplier(e.target.value)} className="brew-select font-bold text-[#0e2334]">
              <option value="Maltería Andina S.A.S.">Maltería Andina S.A.S.</option>
              <option value="Weyermann Specialty">Weyermann Specialty</option>
              <option value="Yakima Chief Hops">Yakima Chief Hops</option>
              <option value="Fermentis">Fermentis</option>
              <option value="Envases Rústicos S.A.">Envases Rústicos S.A.</option>
              <option value="Crown Can Packaging">Crown Can Packaging</option>
              <option value="Químicos Industriales S.A.">Químicos Industriales S.A.</option>
            </select>
          </div>

          <div>
            <label className="brew-label">Fecha de Vencimiento</label>
            <input type="date" value={expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Responsable que Recibe</label>
            <input type="text" value={responsible} onChange={(e)=>setResponsible(e.target.value)} className="brew-input font-semibold text-[#0e2334]" required />
          </div>

          <div>
            <label className="brew-label">Observaciones / Estado</label>
            <input type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Ej: Empaques sellados e inspeccionados..." className="brew-input" />
          </div>

          <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
              Registrar Ingreso de Material
            </button>
          </div>
        </form>
      </div>

      {/* TABLA HISTÓRICA REPLICANDO FORMATO EXCEL FO-ALM-001 */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#e5e7eb]">
          <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
            <SvgClipboard className="w-4 h-4 inline" />
            <span>Registros Históricos FO-GC-015 (Ingreso de Materiales) (Ingreso de Materiales)</span>
            <span className="badge badge-dorado font-mono">{logs.length} Entradas</span>
          </h4>

          <div className="flex items-center gap-2">
            <button onClick={handleExportExcel} className="btn-norta-primary text-xs py-1.5 px-3 bg-[#0e2334] text-white border border-[#c9b38f] flex items-center gap-1 font-bold">
              <SvgFileSpreadsheet className="w-4 h-4 inline mr-1" /><span>Exportar Excel (.xlsx) Original</span>
            </button>
            <button onClick={() => window.print()} className="btn-norta-secondary text-xs py-1.5 px-3 border-[#0e2334] text-[#0e2334] font-bold">
              Imprimir Formato
            </button>
          </div>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead>
              <tr className="bg-[#0e2334] text-white text-xs">
                <th className="border border-slate-600 text-center">FECHA DE INGRESO</th>
                <th className="border border-slate-600">PRODUCTO / MATERIAL</th>
                <th className="border border-slate-600 text-center">LOTE PROVEEDOR</th>
                <th className="border border-slate-600 text-center">CANTIDAD</th>
                <th className="border border-slate-600">PROVEEDOR</th>
                <th className="border border-slate-600 text-center">VENCIMIENTO</th>
                <th className="border border-slate-600">OBSERVACIONES</th>
                <th className="border border-slate-600">RESPONSABLE</th>
                <th className="border border-slate-600 text-center">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#faf8f3] text-xs">
                  <td className="font-mono text-center font-bold text-[#0e2334] border border-[#d4c8b5]">{log.date}</td>
                  <td className="font-bold text-[#111827] border border-[#d4c8b5]">{log.product}</td>
                  <td className="font-mono text-center font-bold text-[#0e2334] border border-[#d4c8b5]">{log.batchLot}</td>
                  <td className="font-mono text-center font-extrabold text-emerald-700 border border-[#d4c8b5]">{log.quantity}</td>
                  <td className="font-semibold text-[#374151] border border-[#d4c8b5]">{log.supplier}</td>
                  <td className="font-mono text-center text-[#6b7280] border border-[#d4c8b5]">{log.expiryDate}</td>
                  <td className="text-[#4b5563] border border-[#d4c8b5]">{log.notes}</td>
                  <td className="font-semibold text-[#111827] border border-[#d4c8b5]">{log.responsible}</td>
                  <td className="text-center border border-[#d4c8b5]">
                    <button onClick={() => onDeleteLog(log.id)} className="text-red-600 hover:text-red-800 text-xs font-bold px-2 py-0.5" title="Eliminar registro"><SvgTrash className="w-3.5 h-3.5 text-red-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}




// ==========================================================================
// MÓDULO 3: CALIBRACIÓN & VERIFICACIÓN DE pH-METRO (BPM-FO-27 / BPM-FO-26)
// ==========================================================================
function CalibrationModuleSection({ phLogs, schedule, onAddPhLog, onDeletePhLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [buffer4Reading, setBuffer4Reading] = useState('4.02');
  const [buffer4Temp, setBuffer4Temp] = useState('20.0');
  const [buffer7Reading, setBuffer7Reading] = useState('7.01');
  const [buffer7Temp, setBuffer7Temp] = useState('20.0');
  const [verifiedBy, setVerifiedBy] = useState('Ing. Julio Roberto Cristancho');

  const b4Error = Math.abs(parseFloat(buffer4Reading) - 4.01).toFixed(2);
  const b7Error = Math.abs(parseFloat(buffer7Reading) - 7.01).toFixed(2);
  const status = (parseFloat(b4Error) <= 0.05 && parseFloat(b7Error) <= 0.05) ? "Conforme " : "No Conforme ";

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPhLog({
      id: `PH-${Math.floor(100 + Math.random() * 900)}`,
      date,
      buffer4Reading: parseFloat(buffer4Reading),
      buffer4Temp: parseFloat(buffer4Temp),
      buffer4Error: parseFloat(b4Error),
      buffer7Reading: parseFloat(buffer7Reading),
      buffer7Temp: parseFloat(buffer7Temp),
      buffer7Error: parseFloat(b7Error),
      status,
      verifiedBy
    });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      {/* ENCABEZA MEMBRETE OFICIAL DE BPM-FO-27 */}
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#0e2334]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA CAL
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4d3720]">PROGRAMA DE CALIBRACIÓN</span>
              <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">VERIFICACIÓN DE pH-METRO & CRONOGRAMA DE EQUIPOS</h3>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[#0e2334]">CÓDIGO: BPM-FO-27</span>
            <span className="block text-[#4b5563]">INSTRUCTIVO: BPM-IN-10</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 0</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE VERIFICACIÓN DE pH-METRO */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
            
            <span>Nuevo Registro de Verificación pH-Metro (BPM-FO-27)</span>
          </h4>
          <span className={`badge font-bold ${status.includes('Conforme') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
            {status}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="brew-label">Fecha de Verificación</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Lectura Buffer 4.01</label>
            <input type="number" step="0.01" value={buffer4Reading} onChange={(e)=>setBuffer4Reading(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Temp °C (Buffer 4.01)</label>
            <input type="number" step="0.1" value={buffer4Temp} onChange={(e)=>setBuffer4Temp(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Error Buffer 4 (calc)</label>
            <input type="text" value={`${b4Error} pH`} readOnly className="brew-input font-mono bg-slate-100 font-bold" />
          </div>

          <div>
            <label className="brew-label">Lectura Buffer 7.01</label>
            <input type="number" step="0.01" value={buffer7Reading} onChange={(e)=>setBuffer7Reading(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Temp °C (Buffer 7.01)</label>
            <input type="number" step="0.1" value={buffer7Temp} onChange={(e)=>setBuffer7Temp(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Error Buffer 7 (calc)</label>
            <input type="text" value={`${b7Error} pH`} readOnly className="brew-input font-mono bg-slate-100 font-bold" />
          </div>

          <div>
            <label className="brew-label">Verificado Por</label>
            <input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required />
          </div>

          <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
               Guardar Verificación pH-Metro
            </button>
          </div>
        </form>
      </div>

      {/* TABLA HISTÓRICA DE pH-METRO */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Registros de Resultados pH-Metro (BPM-FO-27)</h4>
          <button onClick={() => onExportCSV('VERIFICACION_PH_METRO_BPM_FO_27', phLogs)} className="btn-norta-primary text-xs py-1 px-3">
             Exportar CSV
          </button>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead>
              <tr className="bg-[#0e2334] text-white text-xs">
                <th>FECHA</th>
                <th>BUFFER 4.01</th>
                <th>TEMP (°C)</th>
                <th>ERROR (4)</th>
                <th>BUFFER 7.01</th>
                <th>TEMP (°C)</th>
                <th>ERROR (7)</th>
                <th>ESTADO</th>
                <th>VERIFICADOR</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {phLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#faf8f3] text-xs">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-mono text-center">{log.buffer4Reading}</td>
                  <td className="font-mono text-center">{log.buffer4Temp} °C</td>
                  <td className="font-mono text-center font-bold text-emerald-700">{log.buffer4Error}</td>
                  <td className="font-mono text-center">{log.buffer7Reading}</td>
                  <td className="font-mono text-center">{log.buffer7Temp} °C</td>
                  <td className="font-mono text-center font-bold text-emerald-700">{log.buffer7Error}</td>
                  <td className="font-bold">{log.status}</td>
                  <td className="font-semibold">{log.verifiedBy}</td>
                  <td className="text-center">
                    <button onClick={() => onDeletePhLog(log.id)} className="text-red-600 font-bold text-xs"></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRONOGRAMA DE CALIBRACIÓN DE EQUIPOS */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Cronograma & Codificación de Instrumentos de Medición (BPM-FO-26)</h4>
        <div className="brew-table-container">
          <table className="brew-table">
            <thead>
              <tr className="bg-[#4d3720] text-white text-xs">
                <th>EQUIPO DE MEDICIÓN</th>
                <th>FRECUENCIA</th>
                <th>ÚLTIMA CALIBRACIÓN</th>
                <th>PRÓXIMA CALIBRACIÓN</th>
                <th>LABORATORIO / CERTIFICADOR</th>
                <th>CERTIFICADO #</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(item => (
                <tr key={item.id} className="text-xs">
                  <td className="font-bold text-[#0e2334]">{item.equipment}</td>
                  <td className="font-mono">{item.frequency}</td>
                  <td className="font-mono">{item.lastCal}</td>
                  <td className="font-mono font-bold text-emerald-700">{item.nextCal}</td>
                  <td>{item.lab}</td>
                  <td className="font-mono text-xs">{item.cert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 4: CAPACITACIÓN EN INOCUIDAD & BPM (FO-CAP-001)
// ==========================================================================
function TrainingModuleSection({ schedule, attendance, onAddAttendance, onDeleteAttendance, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [topic, setTopic] = useState('Inducción sobre las BPM (Buenas Prácticas de Manufactura)');
  const [employee, setEmployee] = useState('Ing. Julio Roberto Cristancho');
  const [nationalId, setNationalId] = useState('1.018.492.102');
  const [role, setRole] = useState('Maestro Cervecero & Planta');
  const [score, setScore] = useState('5.0');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAttendance({
      id: `TA-${Math.floor(100 + Math.random() * 900)}`,
      date,
      topic,
      employee,
      nationalId,
      role,
      score: parseFloat(score),
      status: parseFloat(score) >= 3.5 ? "Aprobado " : "Reprobado "
    });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      {/* ENCABEZA MEMBRETE OFICIAL FO-CAP-001 */}
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#0e2334]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA CAP
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4d3720]">PROGRAMA DE CAPACITACIÓN</span>
              <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">FORMATO DE ASISTENCIA & CRONOGRAMA DE CAPACITACIONES</h3>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[#0e2334]">CÓDIGO: FO-CAP-001</span>
            <span className="block text-[#4b5563]">ELABORACIÓN: OCTUBRE 2026</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 1</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE REGISTRO DE ASISTENCIA Y EVALUACIÓN */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
          
          <span>Nuevo Registro de Asistencia a Capacitaciones</span>
        </h4>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="brew-label">Tema de Capacitación</label>
            <select value={topic} onChange={(e)=>setTopic(e.target.value)} className="brew-select font-bold text-[#0e2334]">
              <option value="Inducción sobre las BPM (Buenas Prácticas de Manufactura)">Inducción sobre las BPM (Buenas Prácticas de Manufactura)</option>
              <option value="Plan de Saneamiento Básico (L&D, Residuos, Plagas y Agua)">Plan de Saneamiento Básico (L&D, Residuos, Plagas y Agua)</option>
              <option value="Procedimientos POES de Limpieza y Desinfección CIP">Procedimientos POES de Limpieza y Desinfección CIP</option>
              <option value="Peligros Físicos, Químicos y Biológicos en Cerveza">Peligros Físicos, Químicos y Biológicos en Cerveza</option>
            </select>
          </div>

          <div>
            <label className="brew-label">Fecha de Capacitación</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Nombre del Colaborador</label>
            <input type="text" value={employee} onChange={(e)=>setEmployee(e.target.value)} className="brew-input font-semibold" required />
          </div>

          <div>
            <label className="brew-label">Cédula / Documento ID</label>
            <input type="text" value={nationalId} onChange={(e)=>setNationalId(e.target.value)} className="brew-input font-mono" required />
          </div>

          <div>
            <label className="brew-label">Cargo / Función</label>
            <input type="text" value={role} onChange={(e)=>setRole(e.target.value)} className="brew-input" required />
          </div>

          <div>
            <label className="brew-label">Calificación Evaluación (1.0 a 5.0)</label>
            <input type="number" step="0.1" max="5.0" min="1.0" value={score} onChange={(e)=>setScore(e.target.value)} className="brew-input font-mono font-bold text-[#0e2334]" required />
          </div>

          <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
               Registrar Asistencia y Nota
            </button>
          </div>
        </form>
      </div>

      {/* TABLA HISTÓRICA DE ASISTENCIA */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Asistencias & Evaluaciones Registradas (FO-CAP-001)</h4>
          <button onClick={() => onExportCSV('ASISTENCIA_CAPACITACIONES_FO_CAP_001', attendance)} className="btn-norta-primary text-xs py-1 px-3">
             Exportar CSV
          </button>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead>
              <tr className="bg-[#0e2334] text-white text-xs">
                <th>FECHA</th>
                <th>TEMA</th>
                <th>COLABORADOR</th>
                <th>CÉDULA</th>
                <th>CARGO</th>
                <th>NOTA EVALUACIÓN</th>
                <th>ESTADO</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(item => (
                <tr key={item.id} className="hover:bg-[#faf8f3] text-xs">
                  <td className="font-mono font-bold text-[#0e2334]">{item.date}</td>
                  <td className="font-bold text-[#111827]">{item.topic}</td>
                  <td className="font-semibold">{item.employee}</td>
                  <td className="font-mono">{item.nationalId}</td>
                  <td>{item.role}</td>
                  <td className="font-mono font-bold text-center">{item.score} / 5.0</td>
                  <td className="font-bold">{item.status}</td>
                  <td className="text-center">
                    <button onClick={() => onDeleteAttendance(item.id)} className="text-red-600 font-bold text-xs"></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRONOGRAMA DE CAPACITACIONES */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Cronograma Anual de Capacitaciones NORTA</h4>
        <div className="brew-table-container">
          <table className="brew-table">
            <thead>
              <tr className="bg-[#4d3720] text-white text-xs">
                <th>ACTIVIDAD / TEMA</th>
                <th>FACILITADOR</th>
                <th>MODALIDAD</th>
                <th>DURACIÓN</th>
                <th>MES PROGRAMADO</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(item => (
                <tr key={item.id} className="text-xs">
                  <td className="font-bold text-[#0e2334]">{item.topic}</td>
                  <td>{item.instructor}</td>
                  <td>{item.modality}</td>
                  <td className="font-mono">{item.duration}</td>
                  <td className="font-mono font-bold">{item.month}</td>
                  <td className="font-bold">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 5: MANEJO INTEGRADO DE PLAGAS & HERMETIZACIÓN (PG-GC-004)
// ==========================================================================
function PestControlModuleSection({ logs, onAddPestLog, onDeletePestLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [station, setStation] = useState('Estación 1 - Puerta Recepción MP');
  const [baitStatus, setBaitStatus] = useState('Intacto ');
  const [pestsObserved, setPestsObserved] = useState('Ninguna (Conforme C)');
  const [barriersStatus, setBarriersStatus] = useState('Hermético (C)');
  const [correctiveAction, setCorrectiveAction] = useState('Ninguna requerida.');
  const [technician, setTechnician] = useState('Fumigaciones Sabana Norte S.A.S.');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPestLog({
      id: `PLOG-${Math.floor(100 + Math.random() * 900)}`,
      date,
      station,
      baitStatus,
      pestsObserved,
      barriersStatus,
      correctiveAction,
      technician
    });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      {/* ENCABEZA MEMBRETE OFICIAL PG-GC-004 */}
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#0e2334]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA MIP
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4d3720]">MANEJO INTEGRADO DE PLAGAS</span>
              <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">FORMATO DE CONTROL DE PLAGAS Y HERMETIZACIÓN</h3>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[#0e2334]">CÓDIGO: PG-GC-004</span>
            <span className="block text-[#4b5563]">ELABORACIÓN: OCTUBRE 2026</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 1</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE REGISTRO DE CONTROL DE PLAGAS */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
          
          <span>Nuevo Registro de Inspección de Plagas & Cebos</span>
        </h4>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="brew-label">Fecha de Inspección</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Estación / Trampa de Cebo</label>
            <select value={station} onChange={(e)=>setStation(e.target.value)} className="brew-select font-bold text-[#0e2334]">
              <option value="Estación 1 - Puerta Recepción MP">Estación 1 - Puerta Recepción MP</option>
              <option value="Estación 2 - Bodega de Insumos & Maltas">Estación 2 - Bodega de Insumos & Maltas</option>
              <option value="Estación 3 - Zona de Cocción & Fermentación">Estación 3 - Zona de Cocción & Fermentación</option>
              <option value="Estación 4 - Zona Externa Residuos">Estación 4 - Zona Externa Residuos</option>
            </select>
          </div>

          <div>
            <label className="brew-label">Estado de Cebo</label>
            <select value={baitStatus} onChange={(e)=>setBaitStatus(e.target.value)} className="brew-select font-bold">
              <option value="Intacto ">Intacto </option>
              <option value="Cebo Consumido (Reemplazado )">Cebo Consumido (Reemplazado )</option>
              <option value="Dañado por Humedad ">Dañado por Humedad </option>
            </select>
          </div>

          <div>
            <label className="brew-label">Presencia Plagas</label>
            <input type="text" value={pestsObserved} onChange={(e)=>setPestsObserved(e.target.value)} className="brew-input font-semibold" required />
          </div>

          <div>
            <label className="brew-label">Hermetización Barreras</label>
            <input type="text" value={barriersStatus} onChange={(e)=>setBarriersStatus(e.target.value)} className="brew-input font-semibold" required />
          </div>

          <div>
            <label className="brew-label">Empresa / Técnico Inspección</label>
            <input type="text" value={technician} onChange={(e)=>setTechnician(e.target.value)} className="brew-input font-semibold text-[#0e2334]" required />
          </div>

          <div className="sm:col-span-2">
            <label className="brew-label">Medida Correctiva / Nota</label>
            <input type="text" value={correctiveAction} onChange={(e)=>setCorrectiveAction(e.target.value)} className="brew-input" required />
          </div>

          <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
               Guardar Inspección de Plagas
            </button>
          </div>
        </form>
      </div>

      {/* TABLA HISTÓRICA DE CONTROL DE PLAGAS */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Histórico de Inspecciones de Plagas (PG-GC-004)</h4>
          <button onClick={() => onExportCSV('CONTROL_PLAGAS_PG_GC_004', logs)} className="btn-norta-primary text-xs py-1 px-3">
             Exportar CSV
          </button>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead>
              <tr className="bg-[#0e2334] text-white text-xs">
                <th>FECHA</th>
                <th>ESTACIÓN DE CONTROL</th>
                <th>ESTADO CEBO</th>
                <th>PRESENCIA PLAGAS</th>
                <th>HERMETIZACIÓN</th>
                <th>MEDIDA CORRECTIVA</th>
                <th>TÉCNICO / EMPRESA</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-[#faf8f3] text-xs">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-bold text-[#111827]">{log.station}</td>
                  <td className="font-semibold">{log.baitStatus}</td>
                  <td>{log.pestsObserved}</td>
                  <td>{log.barriersStatus}</td>
                  <td className="text-[#4b5563]">{log.correctiveAction}</td>
                  <td className="font-semibold">{log.technician}</td>
                  <td className="text-center">
                    <button onClick={() => onDeletePestLog(log.id)} className="text-red-600 font-bold text-xs"></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}




// ==========================================================================
// MÓDULO 6: LIMPIEZA Y DESINFECCIÓN POES (FO-LD-001 / BPM-PR-01a25)
// ==========================================================================
function CleaningSanitationModuleSection({ logs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [area, setArea] = useState('Tanque Fermentador F-01');
  const [frequency, setFrequency] = useState('Por Lote');
  const [chemical, setChemical] = useState('Soda Cáustica 2% + Ácido Peracético 0.2%');
  const [concentration, setConcentration] = useState('200 ppm');
  const [verifiedBy, setVerifiedBy] = useState('Ing. Julio Roberto Cristancho');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLog({ id: `LD-${Math.floor(100 + Math.random() * 900)}`, date, area, frequency, chemical, concentration, status: "Conforme ", verifiedBy });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE LIMPIEZA Y DESINFECCIÓN (FO-LD-001 / POES)</h3>
        <p className="text-xs text-[#4b5563]">Registro diario de saneamiento, dosificación de productos químicos y liberación sanitaria de equipos de fermentación, cocción y envasado.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Nuevo Registro de Sanitización POES</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Fecha</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Área / Equipo</label><input type="text" value={area} onChange={(e)=>setArea(e.target.value)} className="brew-input font-bold text-[#0e2334]" required /></div>
          <div><label className="brew-label">Frecuencia</label><input type="text" value={frequency} onChange={(e)=>setFrequency(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Químico Sanitizante</label><input type="text" value={chemical} onChange={(e)=>setChemical(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Concentración (ppm / %)</label><input type="text" value={concentration} onChange={(e)=>setConcentration(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Verificado Por</label><input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-2 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow"> Guardar Registro POES</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Registros POES Limpieza & Desinfección</h4>
          <button onClick={() => onExportCSV('LIMPIEZA_DESINFECCION_FO_LD_001', logs)} className="btn-norta-primary text-xs py-1 px-3"> Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>ÁREA / EQUIPO</th><th>FRECUENCIA</th><th>QUÍMICO DOSIFICADO</th><th>CONCENTRACIÓN</th><th>ESTADO SANITARIO</th><th>VERIFICADOR</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-bold text-[#111827]">{log.area}</td>
                  <td>{log.frequency}</td>
                  <td>{log.chemical}</td>
                  <td className="font-mono font-bold">{log.concentration}</td>
                  <td className="font-bold text-emerald-700">{log.status}</td>
                  <td className="font-semibold">{log.verifiedBy}</td>
                  <td className="text-center"><button onClick={() => onDeleteLog(log.id)} className="text-red-600 font-bold text-xs"></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 7: MANEJO DE RESIDUOS SÓLIDOS & ORGÁNICOS (FO-RS-001)
// ==========================================================================
function WasteManagementModuleSection({ logs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [wasteType, setWasteType] = useState('Bagazo de Malta Orgánico');
  const [quantityKg, setQuantityKg] = useState('450 kg');
  const [manager, setManager] = useState('Granja Porcina Sabana (Compostaje)');
  const [verifiedBy, setVerifiedBy] = useState('Adm. Cristian');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLog({ id: `RS-${Math.floor(100 + Math.random() * 900)}`, date, wasteType, quantityKg, manager, status: "Entregado ", verifiedBy });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE MANEJO DE RESIDUOS (FO-RS-001)</h3>
        <p className="text-xs text-[#4b5563]">Control de disposición de bagazo de malta, trub de levadura, residuos reciclables y peligrosos de planta.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Registro de Entrega y Disposición de Residuos</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Fecha Entrega</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Tipo de Residuo</label><input type="text" value={wasteType} onChange={(e)=>setWasteType(e.target.value)} className="brew-input font-bold text-[#0e2334]" required /></div>
          <div><label className="brew-label">Cantidad (kg / L)</label><input type="text" value={quantityKg} onChange={(e)=>setQuantityKg(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Gestor / Receptor</label><input type="text" value={manager} onChange={(e)=>setManager(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Responsable Entrega</label><input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-3 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow"> Registrar Disposición</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Histórico de Control de Residuos</h4>
          <button onClick={() => onExportCSV('DISPOSICION_RESIDUOS_FO_RS_001', logs)} className="btn-norta-primary text-xs py-1 px-3"> Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>TIPO DE RESIDUO</th><th>CANTIDAD</th><th>GESTOR / EMPRESA RECEPTORA</th><th>ESTADO</th><th>RESPONSABLE</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-bold text-[#111827]">{log.wasteType}</td>
                  <td className="font-mono font-bold text-emerald-700">{log.quantityKg}</td>
                  <td>{log.manager}</td>
                  <td className="font-bold text-emerald-700">{log.status}</td>
                  <td className="font-semibold">{log.verifiedBy}</td>
                  <td className="text-center"><button onClick={() => onDeleteLog(log.id)} className="text-red-600 font-bold text-xs"></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 8: MANTENIMIENTO PREVENTIVO & CORRECTIVO (FO-MTTO-001)
// ==========================================================================
function MaintenanceModuleSection({ logs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [equipment, setEquipment] = useState('Chiller de Glicol Principal');
  const [type, setType] = useState('Preventivo');
  const [description, setDescription] = useState('Revisión de compresión, filtros y nivel de glicol.');
  const [parts, setParts] = useState('Filtro de aire, Glicol USP');
  const [technician, setTechnician] = useState('TecniFrio Sabana S.A.S.');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLog({ id: `MTTO-${Math.floor(100 + Math.random() * 900)}`, date, equipment, type, description, parts, technician, status: "Completado " });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE MANTENIMIENTO DE MAQUINARIA (FO-MTTO-001)</h3>
        <p className="text-xs text-[#4b5563]">Histórico de mantenimientos preventivos y correctivos en marmitas, fermentadores, molino, chiller y envasadora.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Registro de Mantenimiento de Maquinaria</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div><label className="brew-label">Fecha</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Equipo / Maquinaria</label><input type="text" value={equipment} onChange={(e)=>setEquipment(e.target.value)} className="brew-input font-bold text-[#0e2334]" required /></div>
          <div><label className="brew-label">Tipo Mantenimiento</label><select value={type} onChange={(e)=>setType(e.target.value)} className="brew-select font-bold"><option value="Preventivo">Preventivo</option><option value="Correctivo">Correctivo</option><option value="Locativo">Locativo</option></select></div>
          <div><label className="brew-label">Descripción del Trabajo</label><input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Repuestos Utilizados</label><input type="text" value={parts} onChange={(e)=>setParts(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Técnico / Empresa</label><input type="text" value={technician} onChange={(e)=>setTechnician(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-3 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow"> Guardar Mantenimiento</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Registros de Mantenimiento Realizado</h4>
          <button onClick={() => onExportCSV('MANTENIMIENTO_EQUIPOS_FO_MTTO_001', logs)} className="btn-norta-primary text-xs py-1 px-3"> Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>EQUIPO</th><th>TIPO</th><th>TRABAJO REALIZADO</th><th>REPUESTOS</th><th>TÉCNICO / EMPRESA</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-bold text-[#111827]">{log.equipment}</td>
                  <td className="font-mono">{log.type}</td>
                  <td>{log.description}</td>
                  <td className="font-mono text-xs">{log.parts}</td>
                  <td className="font-semibold">{log.technician}</td>
                  <td className="font-bold text-emerald-700">{log.status}</td>
                  <td className="text-center"><button onClick={() => onDeleteLog(log.id)} className="text-red-600 font-bold text-xs"></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 9: MUESTREO & CUARTOS FRÍOS (FO-MUE-001 / FO-CF-001)
// ==========================================================================
function SamplingModuleSection({ samplingLogs, coldLogs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [sampleObject, setSampleObject] = useState('NORTA Furia (Lote LOT-2026-088)');
  const [testType, setTestType] = useState('Microbiológico & Fisicoquímico');
  const [sampleVolume, setSampleVolume] = useState('2 Botellas 500ml');
  const [lab, setLab] = useState('Biotecnología & Alimentos Lab Acreditado');
  const [verifiedBy, setVerifiedBy] = useState('Ing. Julio Roberto Cristancho');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLog({ id: `MUE-${Math.floor(100 + Math.random() * 900)}`, date, sampleObject, testType, sampleVolume, lab, result: "Conforme ", verifiedBy });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE MUESTREO & CONTROL DE CUARTOS FRÍOS (FO-MUE-001)</h3>
        <p className="text-xs text-[#4b5563]">Análisis de laboratorio externo para producto terminado, agua de proceso y control diario de temperatura de cuartos fríos.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Nuevo Registro de Muestreo de Laboratorio</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div><label className="brew-label">Fecha Toma Muestra</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Objeto de Muestra (Lote/Producto)</label><input type="text" value={sampleObject} onChange={(e)=>setSampleObject(e.target.value)} className="brew-input font-bold text-[#0e2334]" required /></div>
          <div><label className="brew-label">Tipo de Análisis</label><input type="text" value={testType} onChange={(e)=>setTestType(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Cantidad de Muestra</label><input type="text" value={sampleVolume} onChange={(e)=>setSampleVolume(e.target.value)} className="brew-input font-mono" required /></div>
          <div><label className="brew-label">Laboratorio Acreditado</label><input type="text" value={lab} onChange={(e)=>setLab(e.target.value)} className="brew-input font-semibold" required /></div>
          <div><label className="brew-label">Verificado Por</label><input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-3 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow"> Registrar Muestreo</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Envíos & Resultados de Laboratorio (FO-MUE-001)</h4>
          <button onClick={() => onExportCSV('MUESTREO_LABORATORIO_FO_MUE_001', samplingLogs)} className="btn-norta-primary text-xs py-1 px-3"> Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>MUESTRA / LOTE</th><th>TIPO ANÁLISIS</th><th>CANTIDAD</th><th>LABORATORIO</th><th>RESULTADO</th><th>VERIFICADOR</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {samplingLogs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-bold text-[#111827]">{log.sampleObject}</td>
                  <td>{log.testType}</td>
                  <td className="font-mono">{log.sampleVolume}</td>
                  <td className="font-semibold">{log.lab}</td>
                  <td className="font-bold text-emerald-700">{log.result}</td>
                  <td className="font-semibold">{log.verifiedBy}</td>
                  <td className="text-center"><button onClick={() => onDeleteLog(log.id)} className="text-red-600 font-bold text-xs"></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REGISTRO DE CUARTOS FRÍOS */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Registro Diario de Temperatura de Cuartos Fríos (0°C a 4°C)</h4>
        <div className="brew-table-container">
          <table className="brew-table">
            <thead><tr className="bg-[#4d3720] text-white text-xs"><th>FECHA</th><th>HORA</th><th>TEMP CUARTO FRÍO 1 (MADURACIÓN)</th><th>TEMP CUARTO FRÍO 2 (BODEGA B2B)</th><th>ESTADO</th><th>RESPONSABLE</th></tr></thead>
            <tbody>
              {coldLogs.map(item => (
                <tr key={item.id} className="text-xs">
                  <td className="font-mono font-bold">{item.date}</td>
                  <td className="font-mono">{item.time}</td>
                  <td className="font-mono font-bold text-emerald-700">{item.tempColdRoom1} °C</td>
                  <td className="font-mono font-bold text-emerald-700">{item.tempColdRoom2} °C</td>
                  <td className="font-bold">{item.status}</td>
                  <td>{item.verifiedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 10: CONTROL DE PROVEEDORES HOMOLOGADOS (FO-PROV-001)
// ==========================================================================
function SuppliersModuleSection({ suppliers, onAddSupplier, onDeleteSupplier, onExportCSV }) {
  const [name, setName] = useState('Weyermann Specialty Malts');
  const [nit, setNit] = useState('900.829.102-3');
  const [contact, setContact] = useState('Matthias Weyermann');
  const [productProvided, setProductProvided] = useState('Maltas Especiales Caramelo & Carafa');
  const [phone, setPhone] = useState('312-901-2910');
  const [email, setEmail] = useState('info@weyermann.de');
  const [score, setScore] = useState('5.0');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSupplier({ id: `PROV-${Math.floor(100 + Math.random() * 900)}`, name, nit, contact, productProvided, phone, email, score: parseFloat(score), status: "Homologado " });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE EVALUACIÓN & HOMOLOGACIÓN DE PROVEEDORES (FO-PROV-001)</h3>
        <p className="text-xs text-[#4b5563]">Listado maestro de proveedores autorizados de maltas, lúpulos, levaduras, empaques y químicos sanitarios.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Registrar Nuevo Proveedor Homologado</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Nombre Proveedor</label><input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="brew-input font-bold text-[#0e2334]" required /></div>
          <div><label className="brew-label">NIT / ID Fiscal</label><input type="text" value={nit} onChange={(e)=>setNit(e.target.value)} className="brew-input font-mono" required /></div>
          <div><label className="brew-label">Nombre de Contacto</label><input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Producto / Servicio</label><input type="text" value={productProvided} onChange={(e)=>setProductProvided(e.target.value)} className="brew-input font-semibold" required /></div>
          <div><label className="brew-label">Teléfono</label><input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="brew-input font-mono" required /></div>
          <div><label className="brew-label">Correo Electrónico</label><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Calificación (1.0 a 5.0)</label><input type="number" step="0.1" max="5.0" min="1.0" value={score} onChange={(e)=>setScore(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div className="flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow"> Registrar Proveedor</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Listado Maestro de Proveedores (FO-PROV-001)</h4>
          <button onClick={() => onExportCSV('LISTADO_PROVEEDORES_FO_PROV_001', suppliers)} className="btn-norta-primary text-xs py-1 px-3"> Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>PROVEEDOR</th><th>NIT</th><th>CONTACTO</th><th>PRODUCTO / INSUMO</th><th>TELÉFONO</th><th>CORREO</th><th>CALIFICACIÓN</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {suppliers.map(prov => (
                <tr key={prov.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-bold text-[#0e2334]">{prov.name}</td>
                  <td className="font-mono">{prov.nit}</td>
                  <td>{prov.contact}</td>
                  <td className="font-semibold text-[#111827]">{prov.productProvided}</td>
                  <td className="font-mono">{prov.phone}</td>
                  <td className="text-blue-700 underline font-mono text-[11px]">{prov.email}</td>
                  <td className="font-mono font-bold text-center">{prov.score} / 5.0</td>
                  <td className="font-bold text-emerald-700">{prov.status}</td>
                  <td className="text-center"><button onClick={() => onDeleteSupplier(prov.id)} className="text-red-600 font-bold text-xs"></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 11: TRAZABILIDAD & CONTROL DE CONTRAMUESTRAS (FO-TRA-001)
// ==========================================================================
function TraceabilityModuleSection({ samples, onAddSample, onDeleteSample, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [beerName, setBeerName] = useState('NORTA Furia');
  const [batchLot, setBatchLot] = useState('LOT-2026-089');
  const [presentation, setPresentation] = useState('Botella 500ml');
  const [units, setUnits] = useState('3');
  const [shelfLocation, setShelfLocation] = useState('Estante A-3 (Contramuestras)');
  const [responsible, setResponsible] = useState('Ing. Julio Roberto Cristancho');
  const [notes, setNotes] = useState('Contramuestra retenida conforme a norma INVIMA.');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSample({ id: `TRA-${Math.floor(100 + Math.random() * 900)}`, date, beerName, batchLot, presentation, units: parseInt(units), shelfLocation, responsible, notes });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE TRAZABILIDAD & CONTROL DE CONTRAMUESTRAS (FO-TRA-001)</h3>
        <p className="text-xs text-[#4b5563]">Trazabilidad grain-to-glass, loteado de cerveza terminada y registro de contramuestras retenidas por lote.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Registrar Contramuestra Retenida de Lote</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Fecha de Loteado</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Estilo / Cerveza NORTA</label><select value={beerName} onChange={(e)=>setBeerName(e.target.value)} className="brew-select font-bold text-[#0e2334]"><option value="NORTA Furia">NORTA Furia</option><option value="NORTA Picosa">NORTA Picosa</option><option value="NORTA Origen">NORTA Origen</option><option value="NORTA Briosa">NORTA Briosa</option><option value="NORTA Máxima">NORTA Máxima</option><option value="NORTA Tradicional">NORTA Tradicional</option></select></div>
          <div><label className="brew-label">Número de Lote (Batch)</label><input type="text" value={batchLot} onChange={(e)=>setBatchLot(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Presentación</label><input type="text" value={presentation} onChange={(e)=>setPresentation(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Unidades Retenidas</label><input type="number" value={units} onChange={(e)=>setUnits(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Ubicación Estantería</label><input type="text" value={shelfLocation} onChange={(e)=>setShelfLocation(e.target.value)} className="brew-input font-semibold" required /></div>
          <div><label className="brew-label">Responsable</label><input type="text" value={responsible} onChange={(e)=>setResponsible(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Observaciones</label><input type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} className="brew-input" /></div>
          <div className="sm:col-span-4 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow"> Guardar Contramuestra</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]"> Contramuestras de Lotes Registradas (CONTROL DE LOTEADO)</h4>
          <button onClick={() => onExportCSV('CONTRAMUESTRAS_TRAZABILIDAD_FO_TRA_001', samples)} className="btn-norta-primary text-xs py-1 px-3"> Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>CERVEZA NORTA</th><th>LOTE</th><th>PRESENTACIÓN</th><th>UNIDADES</th><th>UBICACIÓN EN BODEGA</th><th>RESPONSABLE</th><th>OBSERVACIONES</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {samples.map(item => (
                <tr key={item.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-mono font-bold text-[#0e2334]">{item.date}</td>
                  <td className="font-bold text-[#111827]">{item.beerName}</td>
                  <td className="font-mono font-bold text-emerald-700">{item.batchLot}</td>
                  <td className="font-mono">{item.presentation}</td>
                  <td className="font-mono font-bold text-center">{item.units} uds</td>
                  <td className="font-semibold">{item.shelfLocation}</td>
                  <td className="font-semibold">{item.responsible}</td>
                  <td className="text-[#4b5563]">{item.notes}</td>
                  <td className="text-center"><button onClick={() => onDeleteSample(item.id)} className="text-red-600 font-bold text-xs"></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}




// ==========================================================================
// COMPONENTE: FermentationSvgChart (GRAFICADOR VECTORIAL SVG TIME-SERIES)
// ==========================================================================
function FermentationSvgChart({ logs = [], og = 1.055, fgTarget = 1.010 }) {
  if (!logs || logs.length === 0) return null;

  const width = 540;
  const height = 170;
  const padding = 35;

  // Calculo de rangos SG
  const sgValues = logs.map(l => parseFloat(l.sg) || og);
  const minSg = Math.min(Math.min(...sgValues), parseFloat(fgTarget) || 1.008) - 0.003;
  const maxSg = Math.max(Math.max(...sgValues), parseFloat(og) || 1.060) + 0.003;

  // Calculo de rangos Temp
  const tempValues = logs.map(l => parseFloat(l.tempC) || 18);
  const minTemp = Math.min(...tempValues) - 2;
  const maxTemp = Math.max(...tempValues) + 2;

  const getX = (index) => {
    if (logs.length === 1) return width / 2;
    return padding + (index / (logs.length - 1)) * (width - 2 * padding);
  };

  const getSgY = (sg) => {
    return height - padding - ((sg - minSg) / (maxSg - minSg)) * (height - 2 * padding);
  };

  const getTempY = (temp) => {
    return height - padding - ((temp - minTemp) / (maxTemp - minTemp)) * (height - 2 * padding);
  };

  // Coordenadas SG
  const sgPoints = logs.map((l, i) => `${getX(i)},${getSgY(parseFloat(l.sg))}`).join(' ');
  // Coordenadas Temp
  const tempPoints = logs.map((l, i) => `${getX(i)},${getTempY(parseFloat(l.tempC))}`).join(' ');
  // Linea Meta FG Target
  const targetY = getSgY(parseFloat(fgTarget));

  return (
    <div className="w-full bg-[#121210] p-3 rounded-xl border border-[#2d2a24] shadow-inner space-y-2">
      <div className="flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#c9b38f] font-bold"><span className="w-2.5 h-2.5 rounded-full bg-[#c9b38f] inline-block"></span> Densidad (SG)</span>
          <span className="flex items-center gap-1 text-amber-500 font-bold"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Temp (°C)</span>
        </div>
        <span className="text-emerald-400 font-bold">Meta FG: {fgTarget}</span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {/* Grilla horizontal */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#2d2a24" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#2d2a24" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#2d2a24" strokeWidth="1" />

          {/* Linea meta FG */}
          <line x1={padding} y1={targetY} x2={width - padding} y2={targetY} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Curva de Densidad (SG) - Oro NORTA */}
          {logs.length > 1 && <polyline fill="none" stroke="#c9b38f" strokeWidth="3" points={sgPoints} strokeLinecap="round" strokeLinejoin="round" />}

          {/* Curva de Temperatura - Ambar */}
          {logs.length > 1 && <polyline fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" points={tempPoints} strokeLinecap="round" strokeLinejoin="round" />}

          {/* Puntos de datos SG & Temp */}
          {logs.map((l, i) => {
            const x = getX(i);
            const sgY = getSgY(parseFloat(l.sg));
            const tempY = getTempY(parseFloat(l.tempC));
            return (
              <g key={i}>
                {/* Punto SG */}
                <circle cx={x} cy={sgY} r="4" fill="#c9b38f" stroke="#121210" strokeWidth="2" />
                <text x={x} y={sgY - 8} fill="#c9b38f" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{l.sg}</text>

                {/* Punto Temp */}
                <circle cx={x} cy={tempY} r="3" fill="#f59e0b" stroke="#121210" strokeWidth="1.5" />
                <text x={x} y={tempY + 12} fill="#f59e0b" fontSize="8" textAnchor="middle" fontFamily="monospace">{l.tempC}°C</text>

                {/* Etiqueta Dia */}
                <text x={x} y={height - 10} fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="monospace">D{l.dayNum}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}


// ==========================================================================
// RENDERIZAR LA APLICACIÓN REACT (MONTAJE AL FINAL TRAS DEFINIR COMPONENTES)
// ==========================================================================

// ==========================================================================
// COMPONENTE: UploadInvimaDocModal
// ==========================================================================
function UploadInvimaDocModal({ programs, onClose, onSubmit }) {
  const [folderName, setFolderName] = useState(programs[0]?.folderName || '1. AGUA POTABLE');
  const [name, setName] = useState('');
  const [ext, setExt] = useState('.docx');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Por favor ingresa el nombre del documento.");
    
    const finalName = name.toLowerCase().endsWith(ext) ? name : `${name}${ext}`;
    const newDoc = {
      id: `INV-DOC-${Math.floor(100 + Math.random() * 900)}`,
      name: finalName,
      relPath: `./invima_docs/${folderName}/${finalName}`,
      size: "1.25 MB",
      extension: ext,
      type: ext === '.xlsx' ? 'Microsoft Excel' : 'Microsoft Word',
      status: "Vigente & Aprobado",
      updatedAt: new Date().toISOString().split('T')[0]
    };
    onSubmit({ folderName, ...newDoc });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="brand-title text-base font-bold text-[#0e2334]">Subir Documento INVIMA</h3>
          <button onClick={onClose} className="text-slate-400">x</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div>
              <label className="brew-label">Selecciona la Carpeta / Programa Destino</label>
              <select value={folderName} onChange={(e) => setFolderName(e.target.value)} className="brew-select font-bold text-[#0e2334]">
                {programs.map(p => (
                  <option key={p.id} value={p.folderName}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="brew-label">Nombre del Documento</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Ej: FORMATO REGISTRO DE TEMPERATURAS - Norta"
                className="brew-input"
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="brew-label">Tipo / Formato</label>
                <select value={ext} onChange={(e) => setExt(e.target.value)} className="brew-select font-mono font-bold">
                  <option value=".docx">Documento Word (.docx)</option>
                  <option value=".xlsx">Hoja de Cálculo Excel (.xlsx)</option>
                  <option value=".pdf">Documento PDF (.pdf)</option>
                </select>
              </div>
              <div>
                <label className="brew-label">Estado de Aprobación</label>
                <input type="text" value="Vigente & Aprobado" readOnly className="brew-input bg-[#f3f4f6] font-bold text-emerald-700" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button>
            <button type="submit" className="btn-norta-primary text-xs">Subir e Indexar Documento</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// MODAL PARA CREAR NUEVAS CARPETAS/PROGRAMAS SANITARIOS

// ==========================================================================
// COMPONENTE: NewInvimaProgramModal
// ==========================================================================
function NewInvimaProgramModal({ onClose, onSubmit }) {
  const [programName, setProgramName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!programName.trim()) return alert("Por favor ingresa el nombre de la carpeta.");
    onSubmit(programName.trim());
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="brand-title text-base font-bold text-[#0e2334]"> Crear Nueva Carpeta / Programa INVIMA</h3>
          <button onClick={onClose} className="text-slate-400">x</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div>
              <label className="brew-label">Nombre del Programa / Carpeta Sanitarios</label>
              <input 
                type="text" 
                value={programName} 
                onChange={(e) => setProgramName(e.target.value)} 
                placeholder="Ej: 12. GESTIÓN DE ALÉRGENOS"
                className="brew-input"
                required 
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button>
            <button type="submit" className="btn-norta-primary text-xs">Crear Carpeta</button>
          </div>
        </form>
      </div>
    </div>
  );
}


// ==========================================================================
// COMPONENTE: FORMATO DE CONTROL DE AGUA POTABLE (FO-AG-002 - DECRETO 2115)
// ==========================================================================

// ==========================================================================
// COMPONENTE: NewDocumentModal
// ==========================================================================
function NewDocumentModal({ batches, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Registros INVIMA');
  const [fileName, setFileName] = useState('documento_norta.pdf');
  const [version, setVersion] = useState('v1.0');
  const [expiryDate, setExpiryDate] = useState('2028-12-31');
  const [linkedBatch, setLinkedBatch] = useState('Todos los Lotes');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoc = {
      id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      fileName,
      version,
      uploadDate: new Date().toISOString().split('T')[0],
      expiryDate,
      linkedBatch,
      status: "Vigente & Aprobado",
      verifiedBy: "Ing. Julio Roberto Cristancho",
      fileSize: "1.8 MB",
      fileType: "application/pdf"
    };
    onSubmit(newDoc);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]"> Cargar Documento al Repositorio DMS</h3><button onClick={onClose} className="text-slate-400">x</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div><label className="brew-label">Título del Documento</label><input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Ej: Registro Sanitario INVIMA NORTA Furia" className="brew-input" required /></div>
            <div><label className="brew-label">Categoría</label>
              <select value={category} onChange={(e)=>setCategory(e.target.value)} className="brew-select font-bold">
                <option value="Registros INVIMA">Registros INVIMA</option>
                <option value="Certificados COA Insumos">Certificados COA Insumos</option>
                <option value="Manuales BPM & POES">Manuales BPM & POES</option>
                <option value="Carnets Sanitarios Personal">Carnets Sanitarios Personal</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="brew-label">Nombre de Archivo</label><input type="text" value={fileName} onChange={(e)=>setFileName(e.target.value)} className="brew-input" required /></div>
              <div><label className="brew-label">Versión</label><input type="text" value={version} onChange={(e)=>setVersion(e.target.value)} className="brew-input" required /></div>
            </div>
            <div><label className="brew-label">Fecha Caducidad</label><input type="date" value={expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} className="brew-input font-mono" required /></div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Cargar e Indexar Documento</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: LogFermentationModal
// ==========================================================================
function LogFermentationModal({ batch, onClose, onSubmit }) {
  const [sg, setSg] = useState(batch.currentGravity || 1.020);
  const [tempC, setTempC] = useState(batch.currentTemp || 19.5);
  const [ph, setPh] = useState(4.4);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentLogs = batch.fermentationLogs || [];
    const newLog = {
      dayNum: currentLogs.length + 1,
      date: new Date().toISOString().split('T')[0],
      sg: parseFloat(sg),
      tempC: parseFloat(tempC),
      ph: parseFloat(ph),
      notes: notes || "Lectura diaria registrada"
    };
    onSubmit(newLog);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]"> Registrar Lectura Fermentativa ({batch.id})</h3><button onClick={onClose} className="text-slate-400">x</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div><label className="brew-label">Densidad (SG)</label><input type="number" step="0.001" value={sg} onChange={(e)=>setSg(e.target.value)} className="brew-input font-mono font-bold" required /></div>
              <div><label className="brew-label">Temp (°C)</label><input type="number" step="0.1" value={tempC} onChange={(e)=>setTempC(e.target.value)} className="brew-input font-mono font-bold" required /></div>
              <div><label className="brew-label">pH</label><input type="number" step="0.01" value={ph} onChange={(e)=>setPh(e.target.value)} className="brew-input font-mono font-bold" required /></div>
            </div>
            <div><label className="brew-label">Observaciones</label><textarea value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Comentarios sobre aroma, purga de trub..." className="brew-textarea" rows="2"></textarea></div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Guardar Lectura Time-Series</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewBatchModal
// ==========================================================================
function NewBatchModal({ recipes, tanks, onClose, onSubmit }) {
  const [recipeId, setRecipeId] = useState(recipes[0]?.id || '');
  const [tankId, setTankId] = useState('F-03');
  const [volumeLiters, setVolumeLiters] = useState(1000);
  const [brewer, setBrewer] = useState('Ing. Julio Roberto Cristancho');

  const selectedRecipe = recipes.find(r => r.id === recipeId) || recipes[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBatch = {
      id: `LOT-2026-${Math.floor(100 + Math.random() * 900)}`,
      recipeId,
      recipeName: selectedRecipe.name,
      style: selectedRecipe.style,
      tankId,
      volumeLiters: parseInt(volumeLiters),
      brewDate: new Date().toISOString().split('T')[0],
      targetPackDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      stage: "Maceración",
      stageProgress: 15,
      originalGravity: selectedRecipe.og,
      currentGravity: selectedRecipe.og,
      finalGravityTarget: selectedRecipe.fg,
      currentTemp: 20.0,
      targetTemp: 19.0,
      abvCalculated: 0.0,
      abvTarget: selectedRecipe.abv,
      ibu: selectedRecipe.ibu,
      brewer,
      status: "Activo",
      dryHopStatus: "Pendiente",
      notes: `Lote NORTA iniciado con descuento automático BOM.`,
      cogsCostPerLiter: 1.45,
      fermentationLogs: [{ dayNum: 1, date: new Date().toISOString().split('T')[0], sg: selectedRecipe.og, tempC: 20.0, ph: 5.2, notes: "Inicio de cocción" }],
      maltsUsed: selectedRecipe.grains.map(g => ({ name: g.name, batchLot: "MAL-AND-2026-04", qtyKg: g.kg })),
      hopsUsed: selectedRecipe.hops.map(h => ({ name: h.name, batchLot: "HOP-YAK-2026-12", qtyG: h.g })),
      yeastUsed: selectedRecipe.yeast
    };
    onSubmit(newBatch);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]"> Iniciar Nuevo Lote NORTA</h3><button onClick={onClose} className="text-slate-400">x</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div><label className="brew-label">Receta Maestra (Lista BOM)</label><select value={recipeId} onChange={(e)=>setRecipeId(e.target.value)} className="brew-select font-bold text-[#c9b38f]">{recipes.map(r=><option key={r.id} value={r.id}>{r.name} ({r.style})</option>)}</select></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="brew-label">Tanque</label><select value={tankId} onChange={(e)=>setTankId(e.target.value)} className="brew-select font-mono">{tanks.map(t=><option key={t.id} value={t.id}>{t.id} - {t.name}</option>)}</select></div>
              <div><label className="brew-label">Volumen (Litros)</label><input type="number" value={volumeLiters} onChange={(e)=>setVolumeLiters(e.target.value)} className="brew-input font-mono font-bold" required /></div>
            </div>
            <div><label className="brew-label">Maestro Cervecero</label><input type="text" value={brewer} onChange={(e)=>setBrewer(e.target.value)} className="brew-input" required /></div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Iniciar Cocción & Descontar Insumos</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: BatchDetailModal
// ==========================================================================
function BatchDetailModal({ batch, onClose, onAdvance, onOpenLogFerment }) {
  const logs = batch.fermentationLogs || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div><span className="font-mono text-xs font-bold text-[#c9b38f]">{batch.id}</span><h3 className="brand-title text-base font-bold text-white">{batch.recipeName} ({batch.style})</h3></div>
          <button onClick={onClose} className="text-slate-400">x</button>
        </div>
        <div className="modal-body space-y-4 text-xs">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">Etapa</span><p className="font-bold text-[#c9b38f] text-xs mt-0.5">{batch.stage}</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">Tanque</span><p className="font-mono font-bold text-white text-xs mt-0.5">{batch.tankId}</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">Volumen</span><p className="font-bold text-white text-xs mt-0.5">{batch.volumeLiters} L</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">ABV</span><p className="font-bold text-emerald-400 text-xs mt-0.5">{batch.abvCalculated}%</p></div>
          </div>

          {/* VISUALIZACIÓN DE CURVA DE FERMENTACIÓN (TIME-SERIES) */}
          <div className="p-4 bg-[#181816] rounded-xl border border-[#2d2a24]">
            <div className="flex justify-between items-center mb-3">
              <h4 className="brand-title font-bold text-[#c9b38f] text-xs"> Histórico & Curva Fermentativa (Beer30 Style)</h4>
              <button onClick={() => { onClose(); onOpenLogFerment(); }} className="btn-norta-secondary text-[11px] py-1 px-2">
                + Registrar Lectura SG
              </button>
            </div>
            
            {logs.length > 0 ? (
              <div className="space-y-3">
                <FermentationSvgChart logs={logs} og={batch.og} fgTarget={batch.fgTarget} />
                <div className="brew-table-container">
                  <table className="brew-table text-[11px]">
                    <thead><tr><th>Día</th><th>Fecha</th><th>Densidad (SG)</th><th>Temp (°C)</th><th>pH</th><th>Notas</th></tr></thead>
                    <tbody>
                      {logs.map((l, i) => (
                        <tr key={i}>
                          <td className="font-bold text-[#c9b38f]">Día {l.dayNum}</td>
                          <td className="font-mono text-[#a39e93]">{l.date}</td>
                          <td className="font-mono font-bold text-emerald-400">{l.sg}</td>
                          <td className="font-mono text-slate-300">{l.tempC}°C</td>
                          <td className="font-mono text-blue-300">{l.ph}</td>
                          <td className="text-slate-400">{l.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : <p className="text-slate-400 italic">No hay lecturas time-series registradas aún.</p>}
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-norta-secondary text-xs">Cerrar</button>
          {batch.status === 'Activo' && <button onClick={onAdvance} className="btn-norta-primary text-xs">Avanzar Etapa </button>}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: TankDetailModal
// ==========================================================================
function TankDetailModal({ tank, onClose, onUpdate }) {
  const [status, setStatus] = useState(tank.status);
  const [temp, setTemp] = useState(tank.tempC);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]"> Ajustes {tank.name}</h3><button onClick={onClose} className="text-slate-400">x</button></div>
        <div className="modal-body space-y-3">
          <div><label className="brew-label">Estado</label><select value={status} onChange={(e)=>setStatus(e.target.value)} className="brew-select font-bold text-[#c9b38f]"><option value="Fermentando">Fermentando</option><option value="Madurando">Madurando</option><option value="Cold Crash">Cold Crash</option><option value="Listo para Envasar">Listo para Envasar</option><option value="Pendiente CIP">Pendiente CIP</option><option value="CIP Aprobado">CIP Aprobado</option></select></div>
          <div><label className="brew-label">Temp (°C)</label><input type="number" step="0.5" value={temp} onChange={(e)=>setTemp(e.target.value)} className="brew-input font-mono font-bold" /></div>
        </div>
        <div className="modal-footer"><button onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button onClick={() => onUpdate(tank.id, status, temp)} className="btn-norta-primary text-xs">Guardar Ajustes</button></div>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewOrderModal
// ==========================================================================
function NewOrderModal({ clients, finishedGoods, onClose, onSubmit }) {
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [selectedProduct, setSelectedProduct] = useState(finishedGoods[0]?.name || '');
  const [qty, setQty] = useState(2);
  const selectedClient = clients.find(c => c.id === clientId) || clients[0];
  const prod = finishedGoods.find(f => f.name === selectedProduct) || finishedGoods[0];
  const handleSubmit = (e) => {
    e.preventDefault();
    const total = (prod ? prod.wholesalePrice : 100) * qty;
    const newOrder = { id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`, clientName: selectedClient.name, date: new Date().toISOString().split('T')[0], items: `${qty}x ${selectedProduct}`, totalAmountUSD: total, status: "En Preparación", paymentStatus: "Pendiente", deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] };
    onSubmit(newOrder);
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]"> Venta B2B Directa</h3><button onClick={onClose} className="text-slate-400">x</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div><label className="brew-label">Cliente</label><select value={clientId} onChange={(e)=>setClientId(e.target.value)} className="brew-select font-bold">{clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="brew-label">Producto</label><select value={selectedProduct} onChange={(e)=>setSelectedProduct(e.target.value)} className="brew-select">{finishedGoods.map(fg=><option key={fg.id} value={fg.name}>{fg.name}</option>)}</select></div>
              <div><label className="brew-label">Cantidad</label><input type="number" min="1" value={qty} onChange={(e)=>setQty(parseInt(e.target.value))} className="brew-input font-bold" required /></div>
            </div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Generar Venta B2B</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewCipModal
// ==========================================================================
function NewCipModal({ tanks, onClose, onSubmit }) {
  const [equipment, setEquipment] = useState(tanks[0]?.name || 'Fermentador F-01');
  const [operator, setOperator] = useState('Adm. Cristian');
  const [temp, setTemp] = useState(76.0);
  const [rlu, setRlu] = useState(7);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCip = { id: `CIP-2026-${Math.floor(100 + Math.random() * 900)}`, date: new Date().toISOString().replace('T', ' ').slice(0, 16), equipment, operator, cycleType: "Lavado Completo Cáustica + Peracético", causticTempC: parseFloat(temp), causticConcentrationPct: "2.0%", peraceticConcentrationPpm: 200, rinseFinalPh: 7.0, swabAdenosineTriphosphateRlu: parseInt(rlu), status: "Aprobado Sanitariamente", supervisor: "Ing. Julio Roberto Cristancho" };
    onSubmit(newCip);
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]"> Registrar Limpieza CIP</h3><button onClick={onClose} className="text-slate-400">x</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div><label className="brew-label">Equipo Intervenido</label><select value={equipment} onChange={(e)=>setEquipment(e.target.value)} className="brew-select font-bold">{tanks.map(t=><option key={t.id} value={t.name}>{t.name}</option>)}</select></div>
            <div><label className="brew-label">Operador Responsable</label><input type="text" value={operator} onChange={(e)=>setOperator(e.target.value)} className="brew-input" required /></div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Aprobar CIP</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewLabModal
// ==========================================================================
function NewLabModal({ batches, onClose, onSubmit }) {
  const [batchId, setBatchId] = useState(batches[0]?.id || '');
  const [ph, setPh] = useState(4.30);
  const [doPpb, setDoPpb] = useState(25);
  const [sensory, setSensory] = useState(95);
  const selectedBatch = batches.find(b => b.id === batchId) || batches[0];
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTest = { id: `LAB-2026-${Math.floor(100 + Math.random() * 900)}`, batchId, date: new Date().toISOString().split('T')[0], style: selectedBatch ? selectedBatch.recipeName : "Cerveza NORTA", tank: selectedBatch ? selectedBatch.tankId : "F-01", ph: parseFloat(ph), dissolvedOxygenPpb: parseInt(doPpb), carbonationVolCo2: 2.50, turbidityNtu: 25.0, diacetylSensoryScore: "0 / 5 (Ausente)", sensoryScore100: parseInt(sensory), analyst: "Ing. Julio Roberto Cristancho", overallVerdict: "Conforme a Calidad NORTA" };
    onSubmit(newTest);
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]"> Test de Calidad & Cata</h3><button onClick={onClose} className="text-slate-400">x</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div><label className="brew-label">Lote</label><select value={batchId} onChange={(e)=>setBatchId(e.target.value)} className="brew-select font-bold">{batches.map(b=><option key={b.id} value={b.id}>{b.id} - {b.recipeName}</option>)}</select></div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="brew-label">pH</label><input type="number" step="0.01" value={ph} onChange={(e)=>setPh(e.target.value)} className="brew-input font-mono font-bold" required /></div>
              <div><label className="brew-label">DO (ppb)</label><input type="number" value={doPpb} onChange={(e)=>setDoPpb(e.target.value)} className="brew-input font-mono font-bold" required /></div>
              <div><label className="brew-label">Puntaje Cata</label><input type="number" value={sensory} onChange={(e)=>setSensory(e.target.value)} className="brew-input font-mono font-bold text-[#c9b38f]" required /></div>
            </div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Guardar Test</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: RecipeDetailModal
// ==========================================================================
function RecipeDetailModal({ recipe, onClose, onBrew }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><div><span className="font-mono text-xs font-bold text-[#c9b38f]">{recipe.id}</span><h3 className="brand-title text-base font-bold text-white">{recipe.name} ({recipe.style})</h3></div><button onClick={onClose} className="text-slate-400">x</button></div>
        <div className="modal-body space-y-3 text-xs">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">ABV Meta</span><p className="font-bold text-[#c9b38f] text-sm mt-0.5">{recipe.abv}%</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">IBU</span><p className="font-bold text-emerald-400 text-sm mt-0.5">{recipe.ibu}</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">OG</span><p className="font-mono font-bold text-white text-sm mt-0.5">{recipe.og}</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">FG</span><p className="font-mono font-bold text-white text-sm mt-0.5">{recipe.fg}</p></div>
          </div>
          <div className="p-3 bg-[#181816] rounded-xl border border-[#2d2a24] space-y-1">
            <p className="font-bold text-[#c9b38f]">Insumos BOM Requeridos:</p>
            {recipe.grains.map((g, i)=><p key={i} className="text-slate-300">• Malta: {g.name} ({g.kg} kg)</p>)}
            {recipe.hops.map((h, i)=><p key={i} className="text-slate-300">• Lúpulo: {h.name} ({h.g}g - {h.timing})</p>)}
          </div>
        </div>
        <div className="modal-footer"><button onClick={onClose} className="btn-norta-secondary text-xs">Cerrar</button><button onClick={onBrew} className="btn-norta-primary text-xs">Cocinar este Lote (Descontar Insumos) </button></div>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: InvimaControlSystemModule
// ==========================================================================
function InvimaControlSystemModule({ data, onOpenUploadDoc, onOpenNewProgram, onDeleteDoc, onAddStorageLog, onDeleteStorageLog, onAddWaterLog, onDeleteWaterLog, onAddPhMeterLog, onDeletePhMeterLog, onAddTrainingAttendance, onDeleteTrainingAttendance, onAddPestLog, onDeletePestLog, onAddCleaningLog, onDeleteCleaningLog, onAddWasteLog, onDeleteWasteLog, onAddMaintenanceLog, onDeleteMaintenanceLog, onAddSamplingLog, onDeleteSamplingLog, onAddSupplier, onDeleteSupplier, onAddRetainedSample, onDeleteRetainedSample, onExportCSV }) {
  const programs = data.invimaControlSystem || [];
  const [selectedProgId, setSelectedProgId] = useState(programs[0]?.id || 'PRG-01');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedProg = programs.find(p => p.id === selectedProgId) || programs[0];

  const totalDocsCount = programs.reduce((acc, p) => acc + (p.files ? p.files.length : 0), 0);

  // Filtrado de archivos por búsqueda
  const displayedFiles = useMemo(() => {
    if (!selectedProg || !selectedProg.files) return [];
    if (!searchTerm.trim()) return selectedProg.files;
    return selectedProg.files.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedProg, searchTerm]);

  return (
    <div className="space-y-6">
      {/* HEADER INSTITUCIONAL DEL MÓDULO INVIMA */}
      <div className="brew-card p-6 bg-gradient-to-r from-[#0e2334] via-[#1a1c1a] to-[#3a452d]/40 border-[#c9b38f]/40 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-dorado font-bold">Sistema de Control Sanitario INVIMA</span>
            <span className="text-xs text-[#c9b38f] font-mono">14 Programas Oficiales • {totalDocsCount} Documentos Oficiales</span>
          </div>
          <h2 className="brand-title text-2xl font-bold text-white tracking-wide">Documentos del Sistema de Control INVIMA</h2>
          <p className="text-xs text-[#a39e93] mt-1">Estructura oficial de los 14 programas del SGC (Carpetas 00 a 13, Octubre 2026) (Agua Potable, Almacenamiento, Calibración, Capacitación, Plagas, Limpieza, Residuos, Mantenimiento, Muestreo, Proveedores y Trazabilidad).</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onOpenUploadDoc} className="btn-norta-primary text-xs font-bold shadow">
            Subir Documento INVIMA
          </button>
          <button onClick={onOpenNewProgram} className="btn-norta-secondary text-xs font-bold border-white text-white">
            + Nueva Carpeta
          </button>
        </div>
      </div>

      {/* SELECTOR / GRILLA DE LAS 11 CARPETAS Y PROGRAMAS SANITARIOS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="brand-title text-sm font-bold text-[#0e2334] uppercase tracking-wider">Carpetas & Programas Sanitarios ({programs.length})</h3>
          <span className="text-xs text-[#4b5563] font-mono">Selecciona una carpeta para explorar sus archivos</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {programs.map(prog => (
            <div 
              key={prog.id} 
              onClick={() => { setSelectedProgId(prog.id); setSearchTerm(''); }}
              className={`cursor-pointer p-3.5 rounded-xl border transition-all flex flex-col justify-between ${selectedProgId === prog.id ? 'bg-[#0e2334] text-white border-[#0e2334] shadow-lg scale-105' : 'bg-white text-[#111827] border-[#d4c8b5] hover:border-[#0e2334] hover:bg-[#faf8f3]'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl"></span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${selectedProgId === prog.id ? 'bg-[#c9b38f] text-[#0e2334]' : 'bg-[#e2d8c3] text-[#0e2334]'}`}>
                  {prog.files ? prog.files.length : 0} archivos
                </span>
              </div>
              <div>
                <h4 className="font-bold text-xs leading-snug line-clamp-2">{prog.title}</h4>
                <p className={`text-[10px] mt-1 ${selectedProgId === prog.id ? 'text-[#c9b38f]' : 'text-[#4b5563]'}`}>{prog.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENIDO DE LA CARPETA SELECCIONADA */}
      {selectedProg && (
        <div className="brew-card p-6 border-[#d4c8b5] bg-white space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e5e7eb]">
            <div>
              <div className="flex items-center gap-2">
                <SvgFolderOpen className="w-5 h-5 text-[#b89764]" />
                <h3 className="brand-title text-lg font-bold text-[#0e2334]">{selectedProg.title}</h3>
                <span className="badge badge-dorado text-xs font-mono">{selectedProg.files.length} Archivos Registrados</span>
              </div>
              <p className="text-xs text-[#4b5563] mt-1">Ruta Origen: <code className="font-mono text-[11px] text-[#0e2334] bg-[#f3f4f6] px-2 py-0.5 rounded mr-2">Documents\jr bk\Norta\{selectedProg.folderName}</code> | Ruta Local: <code className="font-mono text-[11px] text-[#0e2334] bg-[#f3f4f6] px-2 py-0.5 rounded">invima_docs/{selectedProg.folderName}</code></p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar archivo en esta carpeta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#f9fafb] border border-[#d1d5db] text-xs rounded-lg pl-8 pr-3 py-1.5 w-64 text-[#111827] focus:outline-none focus:border-[#0e2334]"
                />
                <span className="absolute left-2.5 top-2 text-[#9ca3af] text-xs"></span>
              </div>

              <button onClick={onOpenUploadDoc} className="btn-norta-primary text-xs py-1.5 px-3">
                + Subir a esta carpeta
              </button>
            </div>
          </div>

          {/* LISTADO DE ARCHIVOS */}
          
          
          
          {/* SECCIÓN ESTRUCTURADA 00. MANUAL Y CONTROL DOCUMENTAL */}
          {selectedProg.folderName.includes("00. MANUAL") && (
            <div className="brew-card p-4 bg-[var(--bg-elevated)] border border-[#b89764]/40 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                <SvgShieldCheck className="w-5 h-5 text-[#b89764]" />
                <div>
                  <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">Gobernanza del Sistema de Gestión de Calidad (SGC)</h4>
                  <p className="text-[11px] text-[var(--text-muted)]">Marco normativo, política de inocuidad y listado maestro de 78 documentos vigentes (Octubre 2026).</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <span className="font-mono font-bold text-[#b89764]">MN-GC-001</span>
                  <p className="font-semibold mt-0.5">Manual de BPM & Saneamiento</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <span className="font-mono font-bold text-[#b89764]">PT-GC-001</span>
                  <p className="font-semibold mt-0.5">Política de Inocuidad e Indicadores</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <span className="font-mono font-bold text-[#b89764]">FO-GC-036</span>
                  <p className="font-semibold mt-0.5">Listado Maestro Canónico</p>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN ESTRUCTURADA 12. RECEPCIÓN DE MATERIAS PRIMAS */}
          {selectedProg.folderName.includes("12. RECEPCION") && (
            <div className="brew-card p-4 bg-[var(--bg-elevated)] border border-[#b89764]/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <SvgFileSpreadsheet className="w-5 h-5 text-[#b89764]" />
                  <div>
                    <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">Inspección de Materias Primas e Insumos (FO-GC-011)</h4>
                    <p className="text-[11px] text-[var(--text-muted)]">Sistema de Tarjetas de Estado (FO-GC-039 Verde, FO-GC-040 Roja, FO-GC-041 Naranja) & 7 Fichas Técnicas.</p>
                  </div>
                </div>
                <span className="badge badge-verde font-mono text-[10px]">Poka-Yoke Recepción Activo</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold">
                  FO-GC-039 • Aceptado (Verde)
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold">
                  FO-GC-041 • Cuarentena (Naranja)
                </div>
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-bold">
                  FO-GC-040 • Rechazado (Rojo)
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN ESTRUCTURADA 13. CONTROL DE CALIDAD */}
          {selectedProg.folderName.includes("13. CONTROL DE CALIDAD") && (
            <div className="brew-card p-4 bg-[var(--bg-elevated)] border border-[#b89764]/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <SvgCheckCircle className="w-5 h-5 text-[#b89764]" />
                  <div>
                    <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">Control de Calidad por Etapas (PG-GC-013)</h4>
                    <p className="text-[11px] text-[var(--text-muted)]">Tabla de carbonatación para Bogotá (PG-GC-013-A01) y Manejo de Producto No Conforme (PR-GC-004).</p>
                  </div>
                </div>
                <span className="badge badge-dorado font-mono text-[10px]">Liberación de Lote</span>
              </div>
            </div>
          )}
          
          {/* SECCIÓN ESTRUCTURADA 3. CALIBRACIÓN: FORMATO OFICIAL BPM-FO-27 & CRONOGRAMA */}
          {selectedProg.folderName.includes("3. CALIBRACION") && (
            <CalibrationModuleSection 
              phLogs={data.phMeterLogs || []}
              schedule={data.calibrationSchedule || []}
              onAddPhLog={onAddPhMeterLog}
              onDeletePhLog={onDeletePhMeterLog}
              onExportCSV={onExportCSV}
            />
          )}

          {/* SECCIÓN ESTRUCTURADA 4. CAPACITACIÓN: ASISTENCIA Y CRONOGRAMA FO-CAP-001 */}
          {selectedProg.folderName.includes("4. CAPACITACION") && (
            <TrainingModuleSection 
              schedule={data.trainingSchedule || []}
              attendance={data.trainingAttendance || []}
              onAddAttendance={onAddTrainingAttendance}
              onDeleteAttendance={onDeleteTrainingAttendance}
              onExportCSV={onExportCSV}
            />
          )}

          
          {/* SECCIÓN ESTRUCTURADA 6. LIMPIEZA Y DESINFECCIÓN: FO-LD-001 */}
          {selectedProg.folderName.includes("6. LIMPIEZA Y DESINFECCI") && (
            <CleaningSanitationModuleSection logs={data.cleaningSanitationLogs || []} onAddLog={onAddCleaningLog} onDeleteLog={onDeleteCleaningLog} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 7. MANEJO DE RESIDUOS: FO-RS-001 */}
          {selectedProg.folderName.includes("7. MANEJO DE RESIDUOS") && (
            <WasteManagementModuleSection logs={data.wasteManagementLogs || []} onAddLog={onAddWasteLog} onDeleteLog={onDeleteWasteLog} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 8. MANTENIMIENTO: FO-MTTO-001 */}
          {selectedProg.folderName.includes("8. MANTENIMIENTO") && (
            <MaintenanceModuleSection logs={data.maintenanceLogs || []} onAddLog={onAddMaintenanceLog} onDeleteLog={onDeleteMaintenanceLog} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 9. MUESTREO & CUARTOS FRÍOS: FO-MUE-001 */}
          {selectedProg.folderName.includes("9. MUESTREO") && (
            <SamplingModuleSection samplingLogs={data.samplingLogs || []} coldLogs={data.coldRoomLogs || []} onAddLog={onAddSamplingLog} onDeleteLog={onDeleteSamplingLog} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 10. PROVEEDORES: FO-PROV-001 */}
          {selectedProg.folderName.includes("10. PROVEEDORES") && (
            <SuppliersModuleSection suppliers={data.suppliersList || []} onAddSupplier={onAddSupplier} onDeleteSupplier={onDeleteSupplier} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 11. TRAZABILIDAD & CONTRAMUESTRAS: FO-TRA-001 */}
          {selectedProg.folderName.includes("11. TRAZABILIDAD") && (
            <TraceabilityModuleSection samples={data.retainedSamplesLogs || []} onAddSample={onAddRetainedSample} onDeleteSample={onDeleteRetainedSample} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 5. CONTROL DE PLAGAS: FORMATO PG-GC-004 */}
          {selectedProg.folderName.includes("5. CONTROL DE PLAGAS") && (
            <PestControlModuleSection 
              logs={data.pestControlLogs || []}
              onAddPestLog={onAddPestLog}
              onDeletePestLog={onDeletePestLog}
              onExportCSV={onExportCSV}
            />
          )}

          {/* SECCIÓN ESTRUCTURADA 2. ALMACENAMIENTO: FORMATO OFICIAL FO-ALM-001 */}
          {selectedProg.folderName.includes("2. ALMACENAMIENTO") && (
            <StorageIngressFormSection 
              metadata={data.storageIngressMetadata}
              logs={data.storageIngressLogs || []}
              onAddLog={onAddStorageLog}
              onDeleteLog={onDeleteStorageLog}
              onExportCSV={onExportCSV}
            />
          )}

          {/* SECCIÓN ESTRUCTURADA 1. AGUA POTABLE: FORMATO OFICIAL FO-AG-002 */}
          {selectedProg.folderName.includes("1. AGUA POTABLE") && (
            <WaterControlFormSection 
              metadata={data.waterControlMetadata}
              logs={data.waterControlLogs || []}
              onAddLog={onAddWaterLog}
              onDeleteLog={onDeleteWaterLog}
              onExportCSV={onExportCSV}
            />
          )}

          {displayedFiles.length === 0 ? (
            <div className="py-10 text-center text-[#6b7280]">
              <span className="text-3xl block mb-2"></span>
              <p className="text-xs italic">No se encontraron archivos en esta carpeta que coincidan con la búsqueda.</p>
            </div>
          ) : (
            <div className="brew-table-container">
              <table className="brew-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre del Documento</th>
                    <th>Tipo de Archivo</th>
                    <th>Tamaño</th>
                    <th>Actualizado</th>
                    <th>Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedFiles.map(file => (
                    <tr key={file.id}>
                      <td className="font-mono text-xs font-bold text-[#0e2334]">{file.id}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{file.extension === '.xlsx' ? '' : (file.extension === '.docx' ? '' : '')}</span>
                          <div>
                            <p className="font-bold text-[#111827] text-xs">{file.name}</p>
                            <span className="text-[10px] font-mono text-[#6b7280]">{file.relPath}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge text-[10px] ${file.extension === '.xlsx' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                          {file.type} ({file.extension})
                        </span>
                      </td>
                      <td className="font-mono text-xs text-[#374151]">{file.size}</td>
                      <td className="font-mono text-xs text-[#6b7280]">{file.updatedAt}</td>
                      <td><span className="badge badge-verde text-[10px]">{file.status}</span></td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <a 
                            href={encodeURI(file.relPath)} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn-norta-secondary text-[11px] py-1 px-2.5 font-bold flex items-center gap-1 border-[#0e2334] hover:bg-[#0e2334] hover:text-white"
                            title="Abrir directamente en navegador / aplicación predeterminada"
                          >
                            <SvgExternalLink className="w-3.5 h-3.5" /> <span>Abrir</span>
                          </a>
                          <a 
                            href={encodeURI(file.relPath)} 
                            download={file.name}
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn-norta-primary text-[11px] py-1 px-2.5 font-bold flex items-center gap-1"
                            title="Descargar y guardar copia local"
                          >
                            <SvgDownload className="w-3.5 h-3.5" /> <span>Descargar</span>
                          </a>
                          <button 
                            onClick={() => onDeleteDoc(selectedProg.id, file.id, file.name)}
                            className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 text-[11px] py-1 px-2 rounded-lg font-bold transition"
                            title="Eliminar documento del registro"
                          >
                            
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// MODAL PARA SUBIR DOCUMENTOS INVIMA

// ==========================================================================
// COMPONENTE: DocumentRepositoryModule
// ==========================================================================
function DocumentRepositoryModule({ data, onOpenNewDoc }) {
  const [catFilter, setCatFilter] = useState('Todos');
  const docs = data.documentRepository || [];

  const filteredDocs = catFilter === 'Todos' ? docs : docs.filter(d => d.category === catFilter);

  return (
    <div className="space-y-6">
      <div className="brew-card p-6 bg-gradient-to-r from-[#0e2334] via-[#1a1c1a] to-[#4d3720]/40 border-[#c9b38f]/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="badge badge-dorado mb-2">Document Management System (DMS)</span>
          <h2 className="brand-title text-2xl font-bold text-white">Repositorio Documental Inteligente</h2>
          <p className="text-xs text-[#a39e93] mt-1">Almacenamiento centralizado con versión, caducidad y trazabilidad para INVIMA, BPM (Res. 2674) y Certificados COA.</p>
        </div>
        <button onClick={onOpenNewDoc} className="btn-norta-primary text-xs">
           Cargar Nuevo Documento
        </button>
      </div>

      {/* FILTROS POR CATEGORÍA */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#2d2a24] pb-3">
        {['Todos', 'Registros INVIMA', 'Certificados COA Insumos', 'Manuales BPM & POES', 'Carnets Sanitarios Personal'].map(cat => (
          <button key={cat} onClick={() => setCatFilter(cat)} className={`brew-tab ${catFilter === cat ? 'active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* LISTADO DE DOCUMENTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="brew-card p-5 border-[#c9b38f]/20 hover:border-[#c9b38f]/60 transition">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0e2334] border border-[#c9b38f]/30 flex items-center justify-center text-lg text-[#c9b38f] shrink-0">
                  
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#c9b38f]">{doc.id} • {doc.version}</span>
                  <h3 className="brand-title text-sm font-bold text-white leading-tight mt-0.5">{doc.title}</h3>
                  <p className="text-xs text-[#a39e93] mt-0.5">{doc.fileName} ({doc.fileSize})</p>
                </div>
              </div>
              <span className={`badge ${doc.status.includes('Alerta') || doc.status.includes('Próximo') ? 'badge-red animate-pulse' : 'badge-verde'}`}>
                {doc.status}
              </span>
            </div>

            <div className="mt-4 p-3 bg-[#181816] rounded-xl border border-[#2d2a24] grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#a39e93]">Categoría:</span>
                <p className="font-semibold text-slate-200">{doc.category}</p>
              </div>
              <div>
                <span className="text-[#a39e93]">Fecha Caducidad:</span>
                <p className="font-mono font-bold text-[#c9b38f]">{doc.expiryDate}</p>
              </div>
              <div>
                <span className="text-[#a39e93]">Aprobado Por:</span>
                <p className="text-slate-300">{doc.verifiedBy}</p>
              </div>
              <div>
                <span className="text-[#a39e93]">Vinc. a Lote / Planta:</span>
                <p className="font-mono text-slate-300">{doc.linkedBatch}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#2d2a24] text-xs">
              <span className="text-[#a39e93]">Cargado: {doc.uploadDate}</span>
              <button onClick={() => alert(`Previsualizando ${doc.fileName}... (Documento certificado NORTA)`)} className="btn-norta-secondary text-xs py-1 px-3">
                 Abrir / Visualizar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO NUEVO: PORTAL B2B DE AUTOGESTIÓN DE CLIENTES (BREWW STYLE PORTAL)
// ==========================================================================

// ==========================================================================
// COMPONENTE: B2bPortalModule
// ==========================================================================
function B2bPortalModule({ data, client, setClient, cart, setCart, onSubmitOrder, showToast }) {
  const finished = data.finishedGoods || [];

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    showToast(`Agregado 1x ${product.name} al carrito B2B.`);
  };

  const totalOrder = cart.reduce((acc, i) => acc + (i.wholesalePrice * i.qty), 0);

  const handleSendB2bOrder = () => {
    if (!cart.length) return alert("Tu carrito B2B está vacío.");
    const itemsDesc = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
    const newOrder = {
      id: `ORD-B2B-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: client.name,
      date: new Date().toISOString().split('T')[0],
      items: itemsDesc,
      totalAmountUSD: totalOrder,
      status: "En Preparación",
      paymentStatus: "Autopedido Portal B2B",
      deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    onSubmitOrder(newOrder);
    setCart([]);
    alert(`¡Gracias ${client.name}! Tu pedido ${newOrder.id} ha sido enviado directamente a la planta Cervecería NORTA.`);
  };

  return (
    <div className="space-y-6">
      <div className="brew-card p-6 bg-gradient-to-r from-[#0e2334] via-[#1a1c1a] to-[#3a452d]/40 border-[#c9b38f]/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="badge badge-dorado mb-2">Breww B2B Customer Portal 24/7</span>
          <h2 className="brand-title text-2xl font-bold text-white">Portal B2B de Autogestión para Bares & Restaurantes</h2>
          <p className="text-xs text-[#a39e93] mt-1">Haz autopedidos de barriles y latas en tiempo real, consulta tu cupo de crédito y solicita recolección de envases vacíos.</p>
        </div>
        <div className="flex items-center gap-3 bg-[#181816] p-2 rounded-xl border border-[#2d2a24]">
          <span className="text-xs text-[#a39e93]">Cliente Autenticado:</span>
          <select value={client.id} onChange={(e) => setClient(data.clients.find(c=>c.id===e.target.value))} className="brew-select text-xs font-bold text-[#c9b38f]">
            {data.clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.city})</option>)}
          </select>
        </div>
      </div>

      {/* ESTADO DE CUENTA CLIENTE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="brew-card p-4 border-[#c9b38f]/20">
          <span className="text-[#a39e93] font-semibold uppercase">Cupo de Crédito Disponible</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">${client.creditLimit.toLocaleString()} USD</p>
          <p className="text-[11px] text-[#a39e93] mt-1">Condición: Crédito 15 días</p>
        </div>
        <div className="brew-card p-4 border-[#c9b38f]/20">
          <span className="text-[#a39e93] font-semibold uppercase">Barriles en tu Posesión</span>
          <p className="text-2xl font-bold text-[#c9b38f] mt-1">{client.kegsInPossession} Barriles Inox</p>
          <button onClick={() => alert(`Solicitud enviada a logística NORTA para recoger ${client.kegsInPossession} barriles vacíos en ${client.name}.`)} className="mt-2 btn-norta-secondary text-[11px] py-1 px-2.5 w-full">
            Solicitar Recogida Vacíos
          </button>
        </div>
        <div className="brew-card p-4 border-[#c9b38f]/20">
          <span className="text-[#a39e93] font-semibold uppercase">Compras Acumuladas NORTA</span>
          <p className="text-2xl font-bold text-white mt-1">${client.totalPurchasesUSD.toLocaleString()} USD</p>
          <span className="badge badge-dorado text-[10px] mt-1">{client.status}</span>
        </div>
      </div>

      {/* CATÁLOGO DE PRODUCTOS Y CARRITO B2B */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="brand-title text-sm font-bold text-[#c9b38f] uppercase tracking-wider">Cervezas Frescas Disponibles para Despacho</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {finished.map(prod => (
              <div key={prod.id} className="brew-card p-4 border-[#2d2a24] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="badge badge-dorado text-[10px]">{prod.style}</span>
                    <span className="font-mono text-xs text-emerald-400 font-bold">{prod.stockUnits} en stock</span>
                  </div>
                  <h4 className="brand-title font-bold text-white text-base mt-2">{prod.name}</h4>
                  <p className="text-xs text-[#a39e93] mt-0.5">Formato: {prod.packaging}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#2d2a24] flex items-center justify-between">
                  <span className="font-mono font-bold text-lg text-[#c9b38f]">${prod.wholesalePrice.toFixed(2)} USD</span>
                  <button onClick={() => addToCart(prod)} className="btn-norta-primary text-xs py-1 px-3">
                    + Agregar al Pedido
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RESUMEN DEL PEDIDO B2B */}
        <div className="brew-card p-5 h-fit border-[#c9b38f]/30">
          <h3 className="brand-title text-sm font-bold text-white mb-3 flex items-center justify-between">
            <span>Tu Carrito B2B</span>
            <span className="badge badge-dorado text-[10px]">{cart.length} ítems</span>
          </h3>

          {cart.length === 0 ? (
            <p className="text-xs text-[#a39e93] italic py-6 text-center">No has agregado productos a tu pedido.</p>
          ) : (
            <div className="space-y-3 text-xs">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-[#181816] p-2.5 rounded-lg border border-[#2d2a24]">
                  <div>
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-[11px] text-[#a39e93]">{item.qty} x ${item.wholesalePrice.toFixed(2)} USD</p>
                  </div>
                  <span className="font-mono font-bold text-[#c9b38f]">${(item.qty * item.wholesalePrice).toFixed(2)}</span>
                </div>
              ))}

              <div className="pt-3 border-t border-[#2d2a24] flex justify-between font-bold text-sm">
                <span>Total Pedido B2B:</span>
                <span className="font-mono text-emerald-400">${totalOrder.toFixed(2)} USD</span>
              </div>

              <button onClick={handleSendB2bOrder} className="w-full btn-norta-primary text-xs py-2.5 justify-center mt-2">
                Enviar Autopedido a Planta NORTA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO NUEVO: MATRIZ DE ARQUITECTURAS & BENCHMARKING (BREWW, BEER30, EKOS, ODOO)
// ==========================================================================

// ==========================================================================
// COMPONENTE: ArchitectureModule
// ==========================================================================
function ArchitectureModule({ data }) {
  const matrix = data.architectureBenchmarking?.matrix || [];

  return (
    <div className="space-y-6">
      <div className="brew-card p-6 bg-gradient-to-r from-[#0e2334] via-[#1a1c1a] to-[#4d3720]/40 border-[#c9b38f]/40">
        <span className="badge badge-dorado mb-2">Benchmarking & Optimización Tecnológica</span>
        <h2 className="brand-title text-2xl font-bold text-white">Matriz Comparativa de Arquitecturas Cerveceras</h2>
        <p className="text-xs text-[#a39e93] mt-1">Evaluación diagnóstica entre Software Especializado (Breww, Beer30, Ekos), ERP Modular Open-Source (Odoo) y NORTA OS 5.0 Enterprise.</p>
      </div>

      <div className="brew-table-container">
        <table className="brew-table">
          <thead>
            <tr>
              <th>Plataforma / Sistema</th>
              <th>Enfoque Principal</th>
              <th>Módulo CRM / B2B</th>
              <th>Repositorio Documental (BPM/INVIMA)</th>
              <th>Integración Contable</th>
              <th>Curva de Aprendizaje</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, idx) => (
              <tr key={idx} className={row.platform.includes('NORTA') ? 'bg-[#c9b38f]/10 font-bold' : ''}>
                <td className="font-bold text-[#c9b38f] brand-title">{row.platform}</td>
                <td className="text-slate-200 text-xs">{row.focus}</td>
                <td><span className="badge badge-dorado text-[10px]">{row.crm}</span></td>
                <td className="text-xs text-slate-300">{row.docRepo}</td>
                <td className="font-mono text-xs text-emerald-400">{row.accounting}</td>
                <td><span className="badge badge-verde text-[10px]">{row.learningCurve}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RECOMENDACIONES DE ESCALAMIENTO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
        <div className="brew-card p-5 border-[#c9b38f]/30">
          <h3 className="brand-title text-sm font-bold text-[#c9b38f] mb-2">1. Modelo Híbrido Recomendado</h3>
          <p className="text-slate-300">Mantener **NORTA OS** como frontend ligero, rápido e intuitivo para el cervecero en planta y conectar vía exportación CSV/API a software contable especializado (Siigo / Alegra / QuickBooks).</p>
        </div>

        <div className="brew-card p-5 border-[#c9b38f]/30">
          <h3 className="brand-title text-sm font-bold text-[#c9b38f] mb-2">2. Repositorio DMS Integrado</h3>
          <p className="text-slate-300">Almacenar digitalmente los adjuntos de auditoría (Certificados de Análisis COA, Resoluciones INVIMA y manuales POES/BPM) para aprobar visitas sanitarias sin hojas impresas.</p>
        </div>

        <div className="brew-card p-5 border-[#c9b38f]/30">
          <h3 className="brand-title text-sm font-bold text-[#c9b38f] mb-2">3. Autogestión B2B para Bares</h3>
          <p className="text-slate-300">El Portal B2B permite que los bares realicen sus pedidos 24/7 sin intermediarios, optimizando la rotación del stock y reduciendo la mora en el retorno de barriles vacíos.</p>
        </div>
      </div>
    </div>
  );
}

// OTROS MÓDULOS DE SOPORTE MANTENIDOS Y MEJORADOS

// ==========================================================================
// COMPONENTE: DashboardModule
// ==========================================================================
function DashboardModule({ data, onOpenNewBatch, onOpenNewOrder, onOpenBatchDetail, onOpenTankDetail, onSelectModule }) {
  const activeBatchesCount = data.batches.filter(b => b.status === 'Activo').length;
  const litersInCellar = data.tanks.reduce((acc, t) => acc + (t.currentL || 0), 0);
  const totalSalesUSD = data.salesOrders.reduce((acc, o) => acc + o.totalAmountUSD, 0);

  return (
    <div className="space-y-6">
      <div className="brew-card p-6 bg-gradient-to-r from-[#0e2334] via-[#1a1c1a] to-[#1f1f1c] border border-[#c9b38f]/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-dorado">Centro de Mando NORTA 5.0</span>
            <span className="text-xs text-[#c9b38f] font-mono">Planta Sabana Norte</span>
          </div>
          <h2 className="brand-title text-2xl font-bold text-white tracking-wide">Plataforma Operativa NORTA</h2>
          <p className="text-[#a39e93] text-xs mt-1">Gestión integral grain-to-glass, trazabilidad de lotes, DMS documental e inteligencia comercial.</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button onClick={onOpenNewBatch} className="btn-norta-primary text-xs">Iniciar Cocción</button>
          <button onClick={onOpenNewOrder} className="btn-norta-secondary text-xs">Crear Venta B2B</button>
                    <button onClick={() => onSelectModule('invima_system')} className="btn-norta-primary text-xs bg-[#0e2334] text-white border border-[#c9b38f]">Abrir Carpetas INVIMA</button>
          <button onClick={() => onSelectModule('b2b_portal')} className="btn-norta-secondary text-xs">Portal B2B Clientes</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="brew-card p-5 border-[#c9b38f]/20">
          <span className="text-[#a39e93] text-xs font-semibold uppercase">Litros en Bodega</span>
          <p className="text-3xl font-extrabold text-white mt-2">{litersInCellar.toLocaleString()} <span className="text-sm font-normal text-[#c9b38f]">L</span></p>
          <p className="text-xs text-emerald-400 mt-2">↑ 82% Ocupación Tanques</p>
        </div>
        <div className="brew-card p-5 border-[#c9b38f]/20">
          <span className="text-[#a39e93] text-xs font-semibold uppercase">Lotes Activos</span>
          <p className="text-3xl font-extrabold text-white mt-2">{activeBatchesCount} <span className="text-sm font-normal text-[#a39e93]">Lotes</span></p>
          <p className="text-xs text-[#c9b38f] mt-2">Curvas Time-Series Activas</p>
        </div>
        <div className="brew-card p-5 border-[#c9b38f]/20">
          <span className="text-[#a39e93] text-xs font-semibold uppercase">Ventas Facturadas</span>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">${totalSalesUSD.toLocaleString()} <span className="text-sm font-normal text-slate-400">USD</span></p>
          <p className="text-xs text-slate-400 mt-2">Canal B2B Directo</p>
        </div>
        <div className="brew-card p-5 border-[#c9b38f]/20">
          <span className="text-[#a39e93] text-xs font-semibold uppercase">Documentos DMS</span>
          <p className="text-3xl font-extrabold text-white mt-2">{data.documentRepository.length} <span className="text-xs font-normal text-emerald-400">Archivos Válidos</span></p>
          <p className="text-xs text-[#c9b38f] mt-2"> 1 Registro INVIMA a renovar</p>
        </div>
      </div>

      <div className="brew-card">
        <div className="brew-card-header">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 live-pulse"></span>
            <h3 className="brand-title text-sm font-bold text-slate-100">Estado de Fermentadores en Vivo (Cellar Map)</h3>
          </div>
          <button onClick={() => onSelectModule('production')} className="text-xs text-[#c9b38f] hover:underline">Ver Bodega Completa →</button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.tanks.map(tank => (
            <div key={tank.id} onClick={() => onOpenTankDetail(tank)} className="tank-visualizer cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-[#c9b38f] font-mono">{tank.id}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[#c9b38f]/20 text-[#c9b38f]">{tank.status}</span>
              </div>
              <div className="w-full h-28 bg-[#151513] rounded-xl border border-[#2d2a24] relative flex flex-col justify-end p-1.5 overflow-hidden">
                <div className="tank-gauge-fill fermenting rounded-lg transition-all" style={{ height: `${Math.max(Math.round((tank.currentL/tank.capacityL)*100), 8)}%` }}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                  <span className="text-sm font-extrabold text-white drop-shadow-md">{tank.currentL} L</span>
                  <span className="text-[10px] text-[#c9b38f] font-mono">{Math.round((tank.currentL/tank.capacityL)*100)}%</span>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-[11px]">
                <p className="font-semibold text-slate-200 truncate">{tank.beerName}</p>
                <div className="flex justify-between text-slate-400"><span>Temp:</span><span className="font-mono text-[#c9b38f]">{tank.tempC}°C</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: ProductionModule
// ==========================================================================
function ProductionModule({ data, tab, setTab, onAdvanceBatch, onOpenNewBatch, onOpenBatchDetail, onOpenRecipeDetail, onOpenTankDetail, onOpenLogFerment }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d2a24] pb-4">
        <div>
          <h2 className="brand-title text-xl font-bold text-white flex items-center gap-2"> Producción Cervecera & Curvas Fermentativas</h2>
          <p className="text-xs text-[#a39e93] mt-0.5">Batch tracking, lecturas time-series, tanques y recetas.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setTab('batches')} className={`brew-tab ${tab === 'batches' ? 'active' : ''}`}> Lotes Activos</button>
          <button onClick={() => setTab('tanks')} className={`brew-tab ${tab === 'tanks' ? 'active' : ''}`}> Cellar Map</button>
          <button onClick={() => setTab('recipes')} className={`brew-tab ${tab === 'recipes' ? 'active' : ''}`}> Recetas</button>
          <button onClick={onOpenNewBatch} className="btn-norta-primary text-xs ml-2">+ Nuevo Lote</button>
        </div>
      </div>

      {tab === 'batches' && (
        <div className="brew-table-container">
          <table className="brew-table">
            <thead>
              <tr>
                <th>Código Lote</th>
                <th>Cerveza & Estilo</th>
                <th>Tanque</th>
                <th>Volumen</th>
                <th>Etapa</th>
                <th>SG / Temp</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {data.batches.map(batch => (
                <tr key={batch.id}>
                  <td className="font-mono font-bold text-[#c9b38f]">{batch.id}</td>
                  <td><p className="font-bold text-white brand-title">{batch.recipeName}</p><p className="text-[11px] text-[#a39e93]">{batch.style}</p></td>
                  <td><span className="badge badge-dorado font-mono">{batch.tankId}</span></td>
                  <td><strong className="text-white">{batch.volumeLiters}</strong> L</td>
                  <td><span className="badge badge-verde">{batch.stage} ({batch.stageProgress}%)</span></td>
                  <td className="font-mono text-xs">SG: <span className="text-[#c9b38f]">{batch.currentGravity}</span> | {batch.currentTemp}°C</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onOpenBatchDetail(batch)} className="btn-norta-secondary text-xs py-1 px-2.5">Detalle & Curva</button>
                      <button onClick={() => onOpenLogFerment(batch)} className="bg-[#0e2334] text-blue-300 border border-blue-500/40 text-xs px-2.5 py-1 rounded-lg font-semibold hover:bg-blue-900/40 transition">Registrar SG</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'tanks' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.tanks.map(tank => (
            <div key={tank.id} className="brew-card p-5 border-[#c9b38f]/30">
              <div className="flex justify-between items-start">
                <div><span className="font-mono text-base font-bold text-[#c9b38f]">{tank.id}</span><h4 className="brand-title text-sm font-bold text-white">{tank.name}</h4></div>
                <span className="badge badge-dorado">{tank.status}</span>
              </div>
              <div className="mt-4 p-3 bg-[#181816] rounded-xl border border-[#2d2a24] space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-[#a39e93]">Cerveza:</span><span className="font-bold text-[#c9b38f]">{tank.beerName}</span></div>
                <div className="flex justify-between"><span className="text-[#a39e93]">Ocupación:</span><span className="font-mono text-white">{tank.currentL} L / {tank.capacityL} L</span></div>
                <div className="flex justify-between"><span className="text-[#a39e93]">Temp:</span><span className="font-mono text-emerald-400 font-bold">{tank.tempC} °C</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'recipes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.recipes.map(recipe => (
            <div key={recipe.id} className="brew-card p-5 border-[#c9b38f]/20">
              <div className="flex justify-between items-start">
                <div><span className="badge badge-dorado text-[10px] mb-1">{recipe.brandPillar}</span><h3 className="brand-title text-lg font-bold text-white">{recipe.name}</h3><p className="text-xs text-[#a39e93]">{recipe.style}</p></div>
                <span className="text-xl font-extrabold text-[#c9b38f]">{recipe.abv}% ABV</span>
              </div>
              <p className="text-xs text-[#dcd7cc] my-3 italic bg-[#181816] p-2.5 rounded-lg border border-[#2d2a24]">"{recipe.sensoryDescription}"</p>
              <button onClick={() => onOpenRecipeDetail(recipe)} className="w-full btn-norta-primary text-xs py-1.5 justify-center">Ficha Técnica & BOM</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================================================
// COMPONENTE: ErpModule
// ==========================================================================
function ErpModule({ data, tab, setTab, onExportCSV }) {
  const totalRawValue = data.rawInventory.reduce((acc, item) => acc + (item.stock * item.costPerUnit), 0);
  const totalFinishedValue = data.finishedGoods.reduce((acc, item) => acc + (item.stockUnits * item.wholesalePrice), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d2a24] pb-4">
        <div>
          <h2 className="brand-title text-xl font-bold text-white flex items-center gap-2"><SvgPackage className="w-4 h-4 inline" /> ERP, Inventarios BOM & Costeo COGS</h2>
          <p className="text-xs text-[#a39e93] mt-0.5">Control de materias primas, producto terminado y exportación contable.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setTab('raw')} className={`brew-tab ${tab === 'raw' ? 'active' : ''}`}> Insumos BOM</button>
          <button onClick={() => setTab('finished')} className={`brew-tab ${tab === 'finished' ? 'active' : ''}`}> Producto Terminado</button>
          <button onClick={() => setTab('cogs')} className={`brew-tab ${tab === 'cogs' ? 'active' : ''}`}> Análisis COGS</button>
          <button onClick={() => onExportCSV('Inventario_NORTA', data.rawInventory)} className="btn-norta-secondary text-xs ml-2">Exportar CSV (Siigo/QuickBooks)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="brew-card p-4 border-[#c9b38f]/20"><span className="text-[#a39e93] uppercase font-semibold">Valor Insumos Bodega</span><p className="text-2xl font-bold text-[#c9b38f] mt-1">${totalRawValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</p></div>
        <div className="brew-card p-4 border-[#c9b38f]/20"><span className="text-[#a39e93] uppercase font-semibold">Valor Stock Terminado</span><p className="text-2xl font-bold text-emerald-400 mt-1">${totalFinishedValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</p></div>
        <div className="brew-card p-4 border-[#c9b38f]/20"><span className="text-[#a39e93] uppercase font-semibold">Margen Bruto Promedio</span><p className="text-2xl font-bold text-white mt-1">62.8%</p></div>
      </div>

      {tab === 'raw' && (
        <div className="brew-table-container">
          <table className="brew-table">
            <thead>
              <tr><th>Código</th><th>Insumo</th><th>Categoría</th><th>Stock Actual</th><th>Costo Unitario</th><th>Valor Total</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {data.rawInventory.map(item => (
                <tr key={item.id}>
                  <td className="font-mono text-xs font-bold text-[#c9b38f]">{item.id}</td>
                  <td className="font-semibold text-white">{item.name}</td>
                  <td><span className="badge badge-dorado text-[10px]">{item.category}</span></td>
                  <td className="font-mono font-bold text-slate-200">{item.stock} {item.unit}</td>
                  <td className="font-mono text-xs text-slate-300">${item.costPerUnit.toFixed(2)}</td>
                  <td className="font-mono text-xs font-bold text-[#c9b38f]">${(item.stock * item.costPerUnit).toFixed(2)} USD</td>
                  <td><span className={`badge ${item.status === 'Óptimo' ? 'badge-verde' : 'badge-red'}`}>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'finished' && (
        <div className="brew-table-container">
          <table className="brew-table">
            <thead>
              <tr><th>Código</th><th>Producto</th><th>Presentación</th><th>Stock</th><th>COGS / Unidad</th><th>Precio Mayorista</th><th>Margen</th></tr>
            </thead>
            <tbody>
              {data.finishedGoods.map(fg => (
                <tr key={fg.id}>
                  <td className="font-mono text-xs font-bold text-[#c9b38f]">{fg.id}</td>
                  <td className="font-bold text-white brand-title">{fg.name}</td>
                  <td><span className="badge badge-dorado text-[10px]">{fg.packaging}</span></td>
                  <td className="font-mono font-extrabold text-emerald-400">{fg.stockUnits} uds</td>
                  <td className="font-mono text-xs text-slate-400">${fg.cogsCost.toFixed(2)} USD</td>
                  <td className="font-mono font-bold text-[#c9b38f]">${fg.wholesalePrice.toFixed(2)} USD</td>
                  <td className="font-bold text-emerald-400">{fg.marginPct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ==========================================================================
// COMPONENTE: CrmModule
// ==========================================================================
function CrmModule({ data, tab, setTab, onOpenNewOrder, onExportCSV }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d2a24] pb-4">
        <div><h2 className="brand-title text-xl font-bold text-white flex items-center gap-2"> CRM Comercial & Clientes B2B</h2><p className="text-xs text-[#a39e93] mt-0.5">Bares aliados, pedidos y trazabilidad de barriles.</p></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setTab('clients')} className={`brew-tab ${tab === 'clients' ? 'active' : ''}`}> Clientes B2B</button>
          <button onClick={() => setTab('sales')} className={`brew-tab ${tab === 'sales' ? 'active' : ''}`}> Pedidos</button>
          <button onClick={() => onExportCSV('Ventas_B2B_NORTA', data.salesOrders)} className="btn-norta-secondary text-xs ml-2">Exportar Ventas CSV</button>
        </div>
      </div>

      {tab === 'clients' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.clients.map(client => (
            <div key={client.id} className="brew-card p-5 border-[#c9b38f]/20">
              <div className="flex justify-between items-start">
                <div><span className="font-mono text-xs text-[#c9b38f] font-bold">{client.id}</span><h3 className="brand-title text-base font-bold text-white">{client.name}</h3><p className="text-xs text-[#a39e93]">{client.type}</p></div>
                <span className="badge badge-verde text-[10px]">{client.status}</span>
              </div>
              <div className="mt-4 p-3 bg-[#181816] rounded-xl border border-[#2d2a24] space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-[#a39e93]">Contacto:</span><span className="text-slate-200">{client.contactName}</span></div>
                <div className="flex justify-between"><span className="text-[#a39e93]">PIN B2B:</span><span className="font-mono text-[#c9b38f] font-bold">{client.pinCode}</span></div>
                <div className="flex justify-between pt-1 border-t border-[#2d2a24]"><span className="text-[#a39e93]">Compras:</span><span className="font-mono font-bold text-emerald-400">${client.totalPurchasesUSD.toLocaleString()} USD</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'sales' && (
        <div className="brew-table-container">
          <table className="brew-table">
            <thead><tr><th>N° Pedido</th><th>Cliente</th><th>Fecha</th><th>Productos</th><th>Total</th><th>Estado</th></tr></thead>
            <tbody>
              {data.salesOrders.map(order => (
                <tr key={order.id}>
                  <td className="font-mono text-xs font-bold text-[#c9b38f]">{order.id}</td>
                  <td className="font-bold text-white brand-title">{order.clientName}</td>
                  <td className="font-mono text-xs text-[#a39e93]">{order.date}</td>
                  <td className="text-xs text-slate-200">{order.items}</td>
                  <td className="font-mono font-bold text-emerald-400">${order.totalAmountUSD.toFixed(2)}</td>
                  <td><span className="badge badge-dorado">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ==========================================================================
// COMPONENTE: ProcessesModule
// ==========================================================================
function ProcessesModule({ data, tab, setTab, onOpenNewCip, onOpenNewLab }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d2a24] pb-4">
        <div><h2 className="brand-title text-xl font-bold text-white flex items-center gap-2"> Procesos Operativos, Limpieza CIP & Calidad</h2></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setTab('cip')} className={`brew-tab ${tab === 'cip' ? 'active' : ''}`}> Limpieza CIP</button>
          <button onClick={() => setTab('lab')} className={`brew-tab ${tab === 'lab' ? 'active' : ''}`}> Laboratorio</button>
          <button onClick={onOpenNewCip} className="btn-norta-primary text-xs ml-2">+ Registro CIP</button>
        </div>
      </div>

      {tab === 'cip' && (
        <div className="brew-table-container">
          <table className="brew-table">
            <thead><tr><th>Código CIP</th><th>Fecha</th><th>Equipo</th><th>Operador</th><th>Temp. Cáustica</th><th>ATP Hisopado</th><th>Estado</th></tr></thead>
            <tbody>
              {data.cipLogs.map(log => (
                <tr key={log.id}>
                  <td className="font-mono text-xs font-bold text-[#c9b38f]">{log.id}</td>
                  <td className="font-mono text-xs text-[#a39e93]">{log.date}</td>
                  <td className="font-bold text-white">{log.equipment}</td>
                  <td className="text-xs text-slate-300">{log.operator}</td>
                  <td className="font-mono font-bold text-emerald-400">{log.causticTempC}°C</td>
                  <td className="font-mono text-xs font-bold text-emerald-300">{log.swabAdenosineTriphosphateRlu} RLU</td>
                  <td><span className="badge badge-verde">{log.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ==========================================================================
// COMPONENTE: HrModule
// ==========================================================================
function HrModule({ data, tab, setTab }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d2a24] pb-4">
        <div><h2 className="brand-title text-xl font-bold text-white flex items-center gap-2"> Talento Humano NORTA</h2></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.employees.map(emp => (
          <div key={emp.id} className="brew-card p-5 border-[#c9b38f]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0e2334] border border-[#c9b38f]/40 flex items-center justify-center font-bold text-[#c9b38f] text-xs shrink-0">
                {emp.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
              </div>
              <div><h3 className="brand-title text-sm font-bold text-white">{emp.name}</h3><p className="text-xs text-[#c9b38f]">{emp.role}</p></div>
            </div>
            <div className="mt-3 p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24] text-xs space-y-1">
              <p className="text-[#a39e93]">Depto: <span className="text-slate-200 font-semibold">{emp.dept}</span></p>
              <p className="text-[#a39e93]">Correo: <span className="text-slate-300 font-mono">{emp.email}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: LegalModule
// ==========================================================================
function LegalModule({ data, tab, setTab, recallSearchLot, setRecallSearchLot, onExportCSV }) {
  const searchedBatch = data.batches.find(b => b.id.toUpperCase() === recallSearchLot.trim().toUpperCase()) || data.batches[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d2a24] pb-4">
        <div><h2 className="brand-title text-xl font-bold text-white flex items-center gap-2"> Cumplimiento Legal, Sanitario & Fiscal</h2></div>
        <button onClick={() => onExportCSV('INVIMA_NORTA', data.legal.sanitaryRegistries)} className="btn-norta-secondary text-xs">Exportar Registros CSV</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.legal.sanitaryRegistries.map(reg => (
          <div key={reg.code} className="brew-card p-5 border-[#c9b38f]/30">
            <div className="flex justify-between items-start">
              <div><span className="font-mono text-xs font-bold text-[#c9b38f]">{reg.code}</span><h3 className="brand-title text-base font-bold text-white">{reg.beer}</h3></div>
              <span className="badge badge-dorado">{reg.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: BrandIdentityModule (BRAND BOOK DIGITAL INTERACTIVO NORTA)
// ==========================================================================
function BrandIdentityModule({ data }) {
  const [activeTab, setActiveTab] = useState('manifesto');
  const [copiedHex, setCopiedHex] = useState(null);
  const [selectedBeerModal, setSelectedBeerModal] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [catalogFilter, setCatalogFilter] = useState('all');
  const [contrastBg, setContrastBg] = useState('#0e2334');
  const [contrastFg, setContrastFg] = useState('#b89764');

  const brand = data.brandIdentity || {};
  const recipes = data.recipes || [];
  const colors = brand.colors || [];
  const pillars = brand.pillars || [];
  const typographySpec = brand.typographySpec || [];
  const decalogo = brand.decalogo || [];
  const packagingConcepts = brand.packagingConcepts || [];

  const handleCopyColor = (hex, name) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const filteredBeers = useMemo(() => {
    if (catalogFilter === 'high') {
      return recipes.filter(r => r.abv >= 7.0);
    }
    if (catalogFilter === 'hops') {
      return recipes.filter(r => r.ibu >= 30);
    }
    if (catalogFilter === 'classic') {
      return recipes.filter(r => r.abv < 6.0 && r.ibu <= 30);
    }
    return recipes;
  }, [recipes, catalogFilter]);

  const tabs = [
    { id: 'manifesto', label: 'Manifiesto & Pilares', icon: '' },
    { id: 'palette', label: 'Sistema Cromático', icon: '' },
    { id: 'catalog', label: 'Catálogo de 6 Cervezas', icon: '' },
    { id: 'typography', label: 'Sistema Tipográfico', icon: '' },
    { id: 'packaging', label: 'Empaque & Galería', icon: '' },
    { id: 'decalogo', label: 'Decálogo de Calidad', icon: '' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. HERO BANNER EDITORIAL DE LUJO */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0e2334] via-[#1a1714] to-[#4d3720] border-2 border-[#b89764]/40 shadow-2xl p-8 md:p-10 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#b89764]/20 via-transparent to-transparent pointer-events-none rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-[#b89764]/20 text-[#c9b38f] border border-[#b89764]/40">
                Manual Oficial de Identidad • Brand Book Digital
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-[#3a452d]/60 text-emerald-300 border border-[#3a452d]">
                Suite Cervecera 5.0
              </span>
            </div>
            <div>
              <h1 className="font-cinzel text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-[#f7f4ed] leading-tight">
                CERVECERÍA <span className="text-[#b89764]">NORTA</span>
              </h1>
              <p className="font-baskerville italic text-lg md:text-2xl text-[#c9b38f] mt-2 font-medium">
                "{brand.manifesto || "Fuerza silenciosa • Calma con carácter • Aventura interior"}"
              </p>
            </div>
            <p className="font-lato text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              {brand.manifestoLong || "Forjada en la meseta de la Sabana Norte, Cervecería NORTA nace de una devoción austera por la pureza del oficio. Nuestras cervezas dialogan con el frío andino, los cereales seleccionados y la precisión metrológica para despertar el espíritu de aventura interior."}
            </p>
            {/* 4 Credenciales de Prestigio */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-[#0e2334]/60 backdrop-blur border border-[#b89764]/30 rounded-xl p-3 text-center">
                <p className="text-xl"></p>
                <p className="font-cinzel text-xs font-bold text-[#c9b38f] mt-1">100% Agua Sabana</p>
                <p className="text-[10px] text-slate-300 font-mono-brew">Decreto 2115</p>
              </div>
              <div className="bg-[#0e2334]/60 backdrop-blur border border-[#b89764]/30 rounded-xl p-3 text-center">
                <p className="text-xl">⏱</p>
                <p className="font-cinzel text-xs font-bold text-[#c9b38f] mt-1">21-45 Días Guarda</p>
                <p className="text-[10px] text-slate-300 font-mono-brew">Cero Aceleradores</p>
              </div>
              <div className="bg-[#0e2334]/60 backdrop-blur border border-[#b89764]/30 rounded-xl p-3 text-center">
                <p className="text-xl"></p>
                <p className="font-cinzel text-xs font-bold text-[#c9b38f] mt-1">6 Perfiles Autor</p>
                <p className="text-[10px] text-slate-300 font-mono-brew">Maltas de Origen</p>
              </div>
              <div className="bg-[#0e2334]/60 backdrop-blur border border-[#b89764]/30 rounded-xl p-3 text-center">
                <p className="text-xl"></p>
                <p className="font-cinzel text-xs font-bold text-[#c9b38f] mt-1">11 Carpetas BPM</p>
                <p className="text-[10px] text-slate-300 font-mono-brew">Auditoría INVIMA</p>
              </div>
            </div>
          </div>
          {/* Emblema Circular */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-2xl bg-[#1d1d1b] border-2 border-[#b89764] shadow-2xl p-4 flex items-center justify-center group transform transition duration-500 hover:scale-105">
              <div className="absolute inset-2 border border-[#b89764]/40 rounded-xl pointer-events-none"></div>
              <img
                src="./assets/logo_norta_principal.png"
                alt="Emblema Oficial Cervecería NORTA"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <span className="font-cinzel text-[11px] font-bold text-[#c9b38f] tracking-widest uppercase mt-3 text-center">
              Emblema Heráldico Registrado
            </span>
          </div>
        </div>

        {/* Barra de Pestañas del Brand Book */}
        <div className="mt-8 pt-6 border-t border-[#b89764]/30 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#b89764] text-[#1d1d1b] shadow-lg shadow-[#b89764]/20 scale-105'
                    : 'bg-[#1d1d1b]/70 text-slate-200 hover:bg-[#b89764]/20 hover:text-[#c9b38f] border border-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-cinzel tracking-wider">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FEEDBACK DE COLOR COPIADO */}
      {copiedHex && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#b89764] text-[#1d1d1b] font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/40 animate-bounce">
          <span className="text-lg"></span>
          <span className="font-mono-brew text-xs">Código {copiedHex} copiado al portapapeles</span>
        </div>
      )}

      {/* 2. CONTENIDO SEGÚN LA PESTAÑA ACTIVA */}

      {/* TAB 1: MANIFIESTO & 6 PILARES RECTORES */}
      {activeTab === 'manifesto' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Pliego Editorial del Manifiesto */}
          <div className="papiro-card p-8 md:p-12 relative overflow-hidden border border-[#b89764]/40 shadow-xl">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2 border-b border-[#4d3720]/20 pb-6">
                <span className="text-xs font-mono-brew font-bold tracking-widest text-[#4d3720] uppercase">
                  Declaración de Principios • Manifiesto 2026
                </span>
                <h2 className="font-cinzel text-2xl md:text-4xl font-extrabold text-[#0e2334]">
                  La Alquimia del Frío y la Paciencia
                </h2>
                <p className="font-baskerville italic text-[#4d3720] text-sm md:text-base">
                  Por el Maestro Cervecero {data.info.headBrewer}
                </p>
              </div>

              <div className="font-baskerville text-slate-800 space-y-4 text-base md:text-lg leading-relaxed text-justify">
                <p>
                  <span className="float-left text-5xl md:text-6xl font-cinzel font-bold text-[#b89764] pr-3 leading-none">
                    E
                  </span>
                  n la inmensidad de la meseta del norte, donde los vientos fríos descienden desde los páramos andinos, aprendimos que el tiempo no es un enemigo a vencer sino un ingrediente que se añade gota a gota. Cervecería NORTA fue fundada bajo el principio de que la grandeza reside en la calma: en la quietud de los tanques de guarda, en la fermentación que no se apresura y en la nobleza inalterable del agua cristalina de manantial.
                </p>
                <p>
                  Nuestra brújula no apunta hacia las modas efímeras del mercado. Apunta hacia la autenticidad radical de los cereales seleccionados, el aroma fragante de lúpulos cosechados con devoción y la densidad de una espuma que resiste el paso de los minutos. Cada botella que sale de nuestra planta es una obra viva de ingeniería sensorial y respeto a la tradición milenaria.
                </p>
              </div>

              <div className="pt-6 border-t border-[#4d3720]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-brew text-[#4d3720]">
                <span>Planta Sabana Norte • NIT: {data.info.nit}</span>
                <span className="font-bold text-[#0e2334]">Certificación de Inocuidad & Buenas Prácticas de Manufactura</span>
              </div>
            </div>
          </div>

          {/* Grid de los 6 Pilares Rectores */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
                  Los 6 Pilares Conceptuales de NORTA
                </h3>
                <p className="text-xs text-[#4d3720] font-lato">
                  Dimensiones filosóficas que rigen nuestras formulaciones, diseño y cultura de bodega.
                </p>
              </div>
              <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">
                6 Dimensiones Canónicas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((p, idx) => (
                <div
                  key={p.id || idx}
                  className="group relative overflow-hidden rounded-2xl bg-[#1d1d1b] border border-[#b89764]/30 shadow-lg hover:border-[#b89764] transition-all duration-300 flex flex-col justify-between min-h-[320px]"
                >
                  {/* Imagen de fondo con overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-35"
                    style={{ backgroundImage: `url('${p.image || "./assets/brand_moodboard.jpg"}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1b] via-[#1d1d1b]/80 to-transparent"></div>

                  <div className="relative z-10 p-6 flex justify-between items-start">
                    <span className="font-mono-brew text-xs font-bold px-2.5 py-1 rounded bg-[#0e2334]/80 text-[#c9b38f] border border-[#b89764]/40">
                      0{idx + 1}
                    </span>
                    <button
                      onClick={() => setLightboxImage({ url: p.image, title: p.title, subtitle: p.subtitle })}
                      className="text-slate-300 hover:text-white bg-black/40 hover:bg-black/80 rounded-full p-2 text-xs transition"
                      title="Ver fotografía en alta resolución"
                    >
                      
                    </button>
                  </div>

                  <div className="relative z-10 p-6 space-y-2">
                    <p className="text-[11px] font-mono-brew font-bold tracking-widest text-[#b89764] uppercase">
                      {p.subtitle || "Pilar de Identidad"}
                    </p>
                    <h4 className="font-cinzel text-xl font-bold text-white group-hover:text-[#c9b38f] transition-colors">
                      {p.title}
                    </h4>
                    <p className="font-lato text-xs text-slate-300 leading-relaxed">
                      {p.concept}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SISTEMA CROMÁTICO OFICIAL INTERACTIVO */}
      {activeTab === 'palette' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
                Sistema Cromático Oficial NORTA
              </h3>
              <p className="text-xs text-[#4d3720] font-lato">
                Paleta regulada para interfaces digitales, etiquetas de empaque, rotulación de bodega y cristalería.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-brew text-[#4d3720]">Haz clic en cualquier tarjeta para copiar HEX</span>
            </div>
          </div>

          {/* Grid de Tarjetas de Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((c, i) => {
              const isDark = c.hex === '#0e2334' || c.hex === '#4d3720' || c.hex === '#3a452d' || c.hex === '#1d1d1b';
              return (
                <div
                  key={i}
                  className="papiro-card overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#b89764]/30 flex flex-col"
                >
                  {/* Muestra grande de color */}
                  <div
                    className="h-36 w-full relative flex items-end justify-between p-4 cursor-pointer group transition-transform"
                    style={{ backgroundColor: c.hex }}
                    onClick={() => handleCopyColor(c.hex, c.name)}
                    title="Clic para copiar código HEX"
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                      <span className={`text-xs font-mono-brew px-3 py-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur font-bold`}>
                        Copiar {c.hex}
                      </span>
                    </div>
                    <span className={`text-xs font-mono-brew font-extrabold px-2.5 py-1 rounded shadow-sm ${isDark ? 'bg-white/90 text-[#1d1d1b]' : 'bg-black/80 text-white'}`}>
                      {c.hex}
                    </span>
                    <span className={`text-[10px] font-mono-brew uppercase tracking-wider font-bold ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                      {c.pantone || "Pantone Std"}
                    </span>
                  </div>

                  {/* Detalle del Color */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-cinzel text-base font-bold text-[#0e2334]">
                          {c.name}
                        </h4>
                        <button
                          onClick={() => handleCopyColor(c.hex, c.name)}
                          className="text-[11px] font-mono-brew text-[#b89764] hover:text-[#4d3720] font-bold"
                        >
                          Copiar
                        </button>
                      </div>
                      <p className="text-[11px] font-mono-brew text-slate-500 mt-0.5">
                        RGB: {c.rgb || "rgb(---)"} • Pantone: {c.pantone || "---"}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-[#4d3720] block text-[11px] uppercase tracking-wider">
                          Uso Oficial:
                        </span>
                        <p className="text-slate-700 font-lato leading-relaxed mt-0.5">
                          {c.usage}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-[#0e2334] block text-[11px] uppercase tracking-wider">
                          Simbolismo & Alma:
                        </span>
                        <p className="text-slate-600 font-baskerville italic text-[11.5px] leading-relaxed mt-0.5">
                          "{c.symbolism}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Laboratorio de Contraste y Accesibilidad WCAG */}
          <div className="brew-card p-6 md:p-8 bg-[#fdfbf7] border-2 border-[#b89764]/30 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4d3720]/20">
              <div>
                <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Laboratorio Tipográfico</span>
                <h4 className="font-cinzel text-lg font-bold text-[#0e2334] mt-1">
                  Simulador de Contraste & Legibilidad Editorial
                </h4>
              </div>
              <p className="text-xs text-[#4d3720] font-lato max-w-md">
                Prueba cómo interactúan los colores de la paleta oficial para títulos y textos en packaging e interfaces.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Selectores de color */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4d3720] font-mono-brew uppercase mb-2">
                    Color de Fondo (Background):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((col, idx) => (
                      <button
                        key={idx}
                        onClick={() => setContrastBg(col.hex)}
                        className={`w-9 h-9 rounded-xl border-2 transition-all flex items-center justify-center ${
                          contrastBg === col.hex ? 'border-[#b89764] scale-110 shadow-md ring-2 ring-[#b89764]/40' : 'border-slate-300'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      >
                        {contrastBg === col.hex && <SvgCheck className="w-3 h-3 text-white inline" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4d3720] font-mono-brew uppercase mb-2">
                    Color de Texto (Foreground):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((col, idx) => (
                      <button
                        key={idx}
                        onClick={() => setContrastFg(col.hex)}
                        className={`w-9 h-9 rounded-xl border-2 transition-all flex items-center justify-center ${
                          contrastFg === col.hex ? 'border-[#0e2334] scale-110 shadow-md ring-2 ring-[#0e2334]/40' : 'border-slate-300'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      >
                        {contrastFg === col.hex && <SvgCheck className="w-3 h-3 text-white inline" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Caja de preview en vivo */}
              <div
                className="lg:col-span-7 p-6 rounded-2xl border transition-all duration-300 shadow-inner space-y-3"
                style={{ backgroundColor: contrastBg, borderColor: '#b89764' }}
              >
                <div className="flex items-center justify-between border-b pb-2 opacity-75" style={{ borderColor: contrastFg }}>
                  <span className="font-mono-brew text-[10px] uppercase font-bold" style={{ color: contrastFg }}>
                    BG: {contrastBg} | FG: {contrastFg}
                  </span>
                  <span className="font-mono-brew text-[10px] px-2 py-0.5 rounded font-bold" style={{ backgroundColor: contrastFg, color: contrastBg }}>
                    WCAG Preview
                  </span>
                </div>
                <h5 className="font-cinzel text-xl font-bold tracking-wide" style={{ color: contrastFg }}>
                  CERVECERÍA NORTA • EDICIÓN MAESTRA
                </h5>
                <p className="font-baskerville italic text-sm" style={{ color: contrastFg }}>
                  "Fuerza silenciosa • Calma con carácter • Aventura interior"
                </p>
                <p className="font-lato text-xs leading-relaxed opacity-90" style={{ color: contrastFg }}>
                  La maduración prolongada en frío templa la cerveza como el viento de páramo esculpe la roca andina. Maceración infusional a 66°C con maltas de cebada y agua mineralizada pura.
                </p>
                <p className="font-mono-brew text-[11px] font-bold" style={{ color: contrastFg }}>
                  ABV: 8.5% | IBU: 65 | SRM: 14 | LOTE: LOT-2026-088
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CATÁLOGO OFICIAL DE LAS 6 CERVEZAS NORTA */}
      {activeTab === 'catalog' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header y Filtros */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
                Catálogo Oficial de Autor • Las 6 Cervezas NORTA
              </h3>
              <p className="text-xs text-[#4d3720] font-lato">
                Fichas organolépticas, parámetros fisicoquímicos (ABV, IBU, SRM), servicio y maridaje sommelier.
              </p>
            </div>

            {/* Filtros de Estilo */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCatalogFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'all'
                    ? 'bg-[#0e2334] text-white shadow'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                Todas (6)
              </button>
              <button
                onClick={() => setCatalogFilter('high')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'high'
                    ? 'bg-[#0e2334] text-white shadow'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                 Alta Gravedad (≥7.0%)
              </button>
              <button
                onClick={() => setCatalogFilter('hops')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'hops'
                    ? 'bg-[#0e2334] text-white shadow'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                 Lupuladas (IBU ≥30)
              </button>
              <button
                onClick={() => setCatalogFilter('classic')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'classic'
                    ? 'bg-[#0e2334] text-white shadow'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                 Clásicas & Frescas
              </button>
            </div>
          </div>

          {/* Grid de las 6 Cervezas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeers.map((beer) => {
              const liquid = beer.liquidColor || '#c4591f';
              return (
                <div
                  key={beer.id}
                  className="papiro-card border-2 border-[#b89764]/30 hover:border-[#b89764] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Encabezado de la Tarjeta */}
                  <div className="p-6 pb-4 border-b border-[#4d3720]/15 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">
                        {beer.id}
                      </span>
                      <span className="text-[10px] font-mono-brew font-bold uppercase tracking-wider text-[#4d3720]">
                        {beer.brandPillar || "Calma con carácter"}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Muestra SRM cilíndrica */}
                      <div className="shrink-0 flex flex-col items-center">
                        <div
                          className="w-10 h-16 rounded-lg border-2 border-white/80 shadow-md relative overflow-hidden"
                          style={{ backgroundColor: liquid }}
                          title={`Color de cerveza SRM: ${beer.srmColor}`}
                        >
                          <div className="absolute top-0 inset-x-0 h-2.5 bg-white/70 rounded-t-sm"></div>
                        </div>
                        <span className="font-mono-brew text-[9px] font-bold text-[#4d3720] mt-1">
                          SRM {beer.srmColor}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-cinzel text-xl font-extrabold text-[#0e2334] group-hover:text-[#b89764] transition-colors leading-snug">
                          {beer.name}
                        </h4>
                        <p className="font-baskerville italic text-xs text-[#4d3720] font-medium mt-0.5">
                          {beer.style}
                        </p>
                      </div>
                    </div>

                    {/* Métricas Primarias */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                      <div className="bg-[#eee7da]/80 rounded-xl p-2 border border-[#4d3720]/10">
                        <p className="text-[9px] font-mono-brew uppercase text-[#4d3720] font-bold">Graduación</p>
                        <p className="font-mono-brew text-sm font-extrabold text-[#0e2334]">{beer.abv}% ABV</p>
                      </div>
                      <div className="bg-[#eee7da]/80 rounded-xl p-2 border border-[#4d3720]/10">
                        <p className="text-[9px] font-mono-brew uppercase text-[#4d3720] font-bold">Amargor</p>
                        <p className="font-mono-brew text-sm font-extrabold text-[#0e2334]">{beer.ibu} IBU</p>
                      </div>
                      <div className="bg-[#eee7da]/80 rounded-xl p-2 border border-[#4d3720]/10">
                        <p className="text-[9px] font-mono-brew uppercase text-[#4d3720] font-bold">Tonalidad</p>
                        <p className="font-mono-brew text-sm font-extrabold text-[#0e2334]">{beer.srmColor} SRM</p>
                      </div>
                    </div>
                  </div>

                  {/* Cuerpo y Descriptores */}
                  <div className="p-6 py-4 space-y-4 flex-1">
                    {/* Barras Visuales de Intensidad */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono-brew text-[#4d3720]">
                        <span>Intensidad de Malta</span>
                        <span className="font-bold">{Math.min(10, Math.round(beer.abv * 1.1))}/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#e2d8c3] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#b89764] to-[#4d3720]"
                          style={{ width: `${Math.min(100, (beer.abv / 10) * 100)}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono-brew text-[#4d3720]">
                        <span>Amargor de Lúpulo</span>
                        <span className="font-bold">{Math.min(10, Math.round(beer.ibu / 9))}/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#e2d8c3] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#3a452d] to-[#0e2334]"
                          style={{ width: `${Math.min(100, (beer.ibu / 90) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Descripción Sommelier */}
                    <p className="font-lato text-xs text-slate-700 leading-relaxed italic line-clamp-3">
                      "{beer.sensoryDescription}"
                    </p>

                    {/* Tags Sensoriales */}
                    <div className="flex flex-wrap gap-1.5">
                      {(beer.sensoryTags || ["Artesanal", "Maduración Lenta"]).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono-brew px-2 py-0.5 rounded-full bg-[#0e2334]/10 text-[#0e2334] font-semibold border border-[#0e2334]/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Ficha de Servicio y Maridaje */}
                    <div className="pt-2 border-t border-[#4d3720]/15 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold text-[#4d3720]">Temp. Óptima:</span>
                        <span className="font-mono-brew">{beer.servingTemp || "6°C - 8°C"}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold text-[#4d3720]">Cristalería:</span>
                        <span className="font-lato truncate max-w-[180px]">{beer.glassware || "Copa Sommelier"}</span>
                      </div>
                      <div className="text-slate-600 pt-1">
                        <span className="font-bold text-[#4d3720] block">Maridaje Recomendado:</span>
                        <p className="text-[11px] text-slate-700 italic leading-snug mt-0.5">
                          {beer.pairing || "Carnes asadas, quesos de guarda y gastronomía andina de autor."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botón Ver Ficha de Cata Completa */}
                  <div className="p-4 bg-[#f2ebd9] border-t border-[#4d3720]/20">
                    <button
                      onClick={() => setSelectedBeerModal(beer)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0e2334] hover:bg-[#b89764] text-white hover:text-[#1d1d1b] font-cinzel text-xs font-bold tracking-wider transition-all duration-300 shadow flex items-center justify-center gap-2"
                    >
                      
                      <span>Ficha Sommelier & Receta Maestra</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: SISTEMA TIPOGRÁFICO EDITORIAL & JERARQUÍAS */}
      {activeTab === 'typography' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
              Sistema Tipográfico de Marca & Concepto Editorial
            </h3>
            <p className="text-xs text-[#4d3720] font-lato">
              Cuatro familias tipográficas armonizadas para conferir autoridad monumental, cadencia literaria, precisión analítica y rigor metrológico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {typographySpec.map((t, idx) => (
              <div
                key={idx}
                className="papiro-card p-6 md:p-8 border border-[#b89764]/30 shadow-lg space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">
                      0{idx + 1} • Tipografía Oficial
                    </span>
                    <span className="text-[11px] font-mono-brew text-slate-500 font-bold">
                      {t.weights}
                    </span>
                  </div>

                  <h4 className="font-cinzel text-2xl font-bold text-[#0e2334]">
                    {t.family}
                  </h4>
                  <p className="text-xs font-bold text-[#b89764] font-mono-brew uppercase">
                    Rol: {t.role}
                  </p>
                  <p className="font-lato text-xs text-slate-600 leading-relaxed">
                    {t.concept}
                  </p>
                </div>

                {/* Espécimen Visual en Vivo */}
                <div className="bg-[#f2ebd9] rounded-xl p-4 border border-[#4d3720]/15 space-y-2">
                  <p className="text-[10px] font-mono-brew font-bold text-[#4d3720] uppercase">
                    Espécimen en Vivo:
                  </p>
                  {t.family === 'Cinzel' && (
                    <div className="space-y-1 font-cinzel text-[#0e2334]">
                      <p className="text-xl font-extrabold tracking-widest">CERVECERÍA NORTA 2026</p>
                      <p className="text-sm tracking-wider">ABCDEFGHIJKLMNÑOPQRSTUVWXYZ 0123456789</p>
                    </div>
                  )}
                  {t.family === 'Libre Baskerville' && (
                    <div className="space-y-1 font-baskerville text-[#4d3720]">
                      <p className="text-base italic font-bold">"Fuerza silenciosa • Calma con carácter • Aventura interior"</p>
                      <p className="text-xs italic leading-relaxed">
                        En la quietud de los tanques de guarda, la cebada y el agua de manantial alcanzan su máximo esplendor biológico.
                      </p>
                    </div>
                  )}
                  {t.family === 'Lato' && (
                    <div className="space-y-1 font-lato text-slate-800">
                      <p className="text-sm font-bold">Panel de Control de Planta & Trazabilidad INVIMA</p>
                      <p className="text-xs leading-relaxed">
                        Control de temperaturas de fermentación, monitoreo de tanques y registros de laboratorio bajo Decreto 2115.
                      </p>
                    </div>
                  )}
                  {t.family === 'JetBrains Mono' && (
                    <div className="space-y-1 font-mono-brew text-[#0e2334] text-xs">
                      <p className="font-bold">LOTE: LOT-2026-088 | OG: 1.092 | FG: 1.022 | pH: 5.20</p>
                      <p className="text-[11px] text-[#4d3720]">METROLOGÍA: 9.2% ABV • 65 IBU • 75 SRM • GRAVEDAD OK</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tabla de Jerarquías Tipográficas */}
          <div className="brew-card overflow-hidden shadow-lg border border-[#b89764]/30">
            <div className="p-5 bg-[#0e2334] text-white flex items-center justify-between">
              <h4 className="font-cinzel text-base font-bold text-[#c9b38f]">
                Escala & Jerarquía Tipográfica Institucional
              </h4>
              <span className="text-xs font-mono-brew text-slate-300">Escala Modular 1.25 (Major Third)</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f2ebd9] text-[#4d3720] font-mono-brew border-b border-[#4d3720]/20">
                    <th className="p-3.5 font-bold">Nivel</th>
                    <th className="p-3.5 font-bold">Familia</th>
                    <th className="p-3.5 font-bold">Tamaño / Peso</th>
                    <th className="p-3.5 font-bold">Tracking</th>
                    <th className="p-3.5 font-bold">Aplicación Principal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4d3720]/10 font-lato text-slate-700 bg-[#fdfbf7]">
                  <tr>
                    <td className="p-3.5 font-mono-brew font-bold text-[#0e2334]">H1 Monumental</td>
                    <td className="p-3.5 font-cinzel font-bold">Cinzel</td>
                    <td className="p-3.5 font-mono-brew">42px (2.6rem) / 900</td>
                    <td className="p-3.5 font-mono-brew">0.08em</td>
                    <td className="p-3.5">Logo y Títulos de Pliego Principal</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono-brew font-bold text-[#0e2334]">H2 Sección</td>
                    <td className="p-3.5 font-cinzel font-bold">Cinzel</td>
                    <td className="p-3.5 font-mono-brew">28px (1.75rem) / 700</td>
                    <td className="p-3.5 font-mono-brew">0.05em</td>
                    <td className="p-3.5">Encabezados de Módulo & Nombres de Cerveza</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono-brew font-bold text-[#0e2334]">H3 Subtítulo</td>
                    <td className="p-3.5 font-baskerville italic font-bold">Libre Baskerville</td>
                    <td className="p-3.5 font-mono-brew">20px (1.25rem) / 700</td>
                    <td className="p-3.5 font-mono-brew">0.02em</td>
                    <td className="p-3.5">Epígrafes, Manifiesto y Citas de Autor</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono-brew font-bold text-[#0e2334]">Body Lectura</td>
                    <td className="p-3.5 font-lato">Lato</td>
                    <td className="p-3.5 font-mono-brew">14px (0.875rem) / 400</td>
                    <td className="p-3.5 font-mono-brew">Normal</td>
                    <td className="p-3.5">Párrafos, notas de cata y tablas del ERP</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono-brew font-bold text-[#0e2334]">Metrología Code</td>
                    <td className="p-3.5 font-mono-brew">JetBrains Mono</td>
                    <td className="p-3.5 font-mono-brew">12px (0.75rem) / 600</td>
                    <td className="p-3.5 font-mono-brew">0.04em</td>
                    <td className="p-3.5">Códigos de Lote, pH, ABV, IBU y Telemetría</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EMPAQUE, CRISTALERÍA & MOODBOARD FOTOGRÁFICO */}
      {activeTab === 'packaging' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
              Aplicaciones de Empaque & Galería de Marca
            </h3>
            <p className="text-xs text-[#4d3720] font-lato">
              Conceptos industriales para botellas cerámicas de guarda, latas craft con barniz táctil y cristalería de firma.
            </p>
          </div>

          {/* 3 Conceptos de Empaque */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packagingConcepts.map((pk, idx) => (
              <div
                key={idx}
                className="papiro-card overflow-hidden shadow-lg border border-[#b89764]/40 flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden bg-[#1d1d1b]">
                  <img
                    src={pk.image}
                    alt={pk.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1b] via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono-brew font-bold px-2.5 py-1 rounded bg-[#0e2334] text-[#c9b38f] border border-[#b89764]/40">
                    {pk.type}
                  </span>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-cinzel text-base font-bold text-[#0e2334]">
                      {pk.title}
                    </h4>
                    <p className="font-lato text-xs text-slate-700 leading-relaxed">
                      {pk.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#4d3720]/15 text-[11px] font-mono-brew text-[#4d3720]">
                    <span className="font-bold block uppercase">Acabado & Textura:</span>
                    <p className="text-slate-600 font-lato mt-0.5">{pk.texture}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Moodboard Fotográfico de Gran Formato */}
          <div className="papiro-card p-6 md:p-8 border border-[#b89764]/30 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4d3720]/20">
              <div>
                <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Galería Visual</span>
                <h4 className="font-cinzel text-lg font-bold text-[#0e2334] mt-1">
                  Moodboard de Atmósfera & Territorio NORTA
                </h4>
              </div>
              <p className="text-xs text-[#4d3720] font-lato">
                Haz clic en cualquier imagen para expandir en pantalla completa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setLightboxImage({ url: './assets/brand_moodboard.jpg', title: 'Atmósfera NORTA', subtitle: 'Pizarra, roca volcánica andina y sobriedad terrosa' })}
                className="relative h-60 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/30 shadow"
              >
                <img src="./assets/brand_moodboard.jpg" alt="Moodboard NORTA" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">Atmósfera & Pizarra</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">Materia Prima Noble</p>
                </div>
              </div>

              <div
                onClick={() => setLightboxImage({ url: './assets/beers.jpg', title: 'Cervezas en Copa', subtitle: 'Espuma aterciopelada y color ámbar profundo' })}
                className="relative h-60 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/30 shadow"
              >
                <img src="./assets/beers.jpg" alt="Cervezas NORTA" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">Cata en Copa</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">Cristal y Retención</p>
                </div>
              </div>

              <div
                onClick={() => setLightboxImage({ url: './assets/compass.jpg', title: 'Brújula Artesanal', subtitle: 'La orientación cervecera hacia la excelencia' })}
                className="relative h-60 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/30 shadow"
              >
                <img src="./assets/compass.jpg" alt="Brújula NORTA" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">La Brújula</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">Aventura Interior</p>
                </div>
              </div>

              <div
                onClick={() => setLightboxImage({ url: './assets/logo_norta_principal.png', title: 'Emblema Oficial', subtitle: 'Monograma heráldico de Cervecería NORTA' })}
                className="relative h-60 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/30 shadow bg-[#1d1d1b] p-4 flex items-center justify-center"
              >
                <img src="./assets/logo_norta_principal.png" alt="Logo NORTA" className="w-full h-full object-contain group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">Emblema Institucional</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">Identidad Gráfica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DECÁLOGO DE CALIDAD & FILOSOFÍA GRAIN-TO-GLASS */}
      {activeTab === 'decalogo' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
              Decálogo de Calidad & Filosofía Grain-to-Glass
            </h3>
            <p className="text-xs text-[#4d3720] font-lato">
              Los diez mandamientos innegociables que gobiernan cada lote producido en la planta Cervecería NORTA.
            </p>
          </div>

          {/* Dos Columnas Numeradas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {decalogo.map((item, idx) => (
              <div
                key={idx}
                className="papiro-card p-6 border-l-4 border-l-[#b89764] border border-[#b89764]/30 shadow-md flex items-start gap-4 hover:shadow-lg transition-all"
              >
                <span className="font-cinzel text-3xl font-extrabold text-[#b89764] leading-none shrink-0">
                  {item.num}
                </span>
                <div className="space-y-1">
                  <h4 className="font-cinzel text-base font-bold text-[#0e2334]">
                    {item.title}
                  </h4>
                  <p className="font-lato text-xs text-slate-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sello de Garantía y Firma del Maestro Cervecero */}
          <div className="brew-card p-8 bg-gradient-to-r from-[#0e2334] to-[#4d3720] text-white border-2 border-[#b89764]/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="spec-badge bg-[#b89764] text-[#1d1d1b] font-bold">
                Compromiso Institucional de Inocuidad
              </span>
              <h4 className="font-cinzel text-2xl font-bold text-[#c9b38f]">
                Trazabilidad y Calidad Certificada
              </h4>
              <p className="font-lato text-xs text-slate-200 leading-relaxed">
                Cada gota de cerveza NORTA cumple con las normativas sanitarias vigentes del INVIMA (Decreto 1686 de 2012 / Resolución 2674 de 2013). La excelencia metrológica y el respeto por los tiempos biológicos son nuestro juramento de honor.
              </p>
            </div>

            <div className="bg-[#1d1d1b]/80 border border-[#b89764]/50 rounded-2xl p-5 text-center shrink-0 min-w-[240px]">
              <div className="w-12 h-12 rounded-full bg-[#0e2334] border border-[#c9b38f] mx-auto flex items-center justify-center text-lg shadow">
                
              </div>
              <p className="font-baskerville italic text-sm font-bold text-[#c9b38f] mt-2">
                {data.info.headBrewer}
              </p>
              <p className="text-[10px] font-mono-brew text-slate-300">
                Maestro Cervecero & Jefe de Planta
              </p>
              <p className="text-[9px] font-mono-brew text-[#b89764] mt-1 uppercase">
                Sello de Calidad Aprobado
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL: FICHA DE CATA SOMMELIER & RECETA MAESTRA */}
      {selectedBeerModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#fdfbf7] border-2 border-[#b89764] rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden my-8 animate-modalScale">
            {/* Header Modal */}
            <div
              className="p-6 text-white flex items-center justify-between relative"
              style={{ backgroundColor: '#0e2334' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-14 rounded-lg border-2 border-white/80 shadow relative overflow-hidden"
                  style={{ backgroundColor: selectedBeerModal.liquidColor || '#c4591f' }}
                >
                  <div className="absolute top-0 inset-x-0 h-2 bg-white/70"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="spec-badge bg-[#b89764] text-[#1d1d1b] font-bold">
                      {selectedBeerModal.id}
                    </span>
                    <span className="text-xs font-mono-brew text-[#c9b38f]">
                      {selectedBeerModal.srmColor} SRM
                    </span>
                  </div>
                  <h3 className="font-cinzel text-2xl font-bold text-[#f7f4ed]">
                    {selectedBeerModal.name}
                  </h3>
                  <p className="font-baskerville italic text-xs text-[#c9b38f]">
                    {selectedBeerModal.style}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBeerModal(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-lg font-bold transition"
              >
                
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto font-lato text-slate-800">
              {/* Métricas Técnicas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#eee7da] rounded-xl p-3 text-center border border-[#4d3720]/15">
                  <span className="text-[10px] font-mono-brew text-[#4d3720] uppercase font-bold">Graduación</span>
                  <p className="font-mono-brew text-lg font-extrabold text-[#0e2334]">{selectedBeerModal.abv}% ABV</p>
                </div>
                <div className="bg-[#eee7da] rounded-xl p-3 text-center border border-[#4d3720]/15">
                  <span className="text-[10px] font-mono-brew text-[#4d3720] uppercase font-bold">Amargor IBU</span>
                  <p className="font-mono-brew text-lg font-extrabold text-[#0e2334]">{selectedBeerModal.ibu} IBU</p>
                </div>
                <div className="bg-[#eee7da] rounded-xl p-3 text-center border border-[#4d3720]/15">
                  <span className="text-[10px] font-mono-brew text-[#4d3720] uppercase font-bold">Densidades</span>
                  <p className="font-mono-brew text-xs font-extrabold text-[#0e2334] mt-1">OG: {selectedBeerModal.og} | FG: {selectedBeerModal.fg}</p>
                </div>
                <div className="bg-[#eee7da] rounded-xl p-3 text-center border border-[#4d3720]/15">
                  <span className="text-[10px] font-mono-brew text-[#4d3720] uppercase font-bold">Servicio</span>
                  <p className="font-mono-brew text-xs font-extrabold text-[#0e2334] mt-1">{selectedBeerModal.servingTemp || "6-8°C"}</p>
                </div>
              </div>

              {/* Perfil Sensorial */}
              <div className="space-y-2 bg-[#fdfbf7] p-4 rounded-xl border border-[#4d3720]/15">
                <h4 className="font-cinzel text-sm font-bold text-[#0e2334] flex items-center gap-2">
                   Notas de Cata del Sommelier
                </h4>
                <p className="font-baskerville italic text-slate-700 text-sm leading-relaxed">
                  "{selectedBeerModal.sensoryDescription}"
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {(selectedBeerModal.sensoryTags || []).map((tag, idx) => (
                    <span key={idx} className="spec-badge bg-[#0e2334]/10 text-[#0e2334]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Formulación de Granos (Malt Bill) */}
              <div className="space-y-2">
                <h4 className="font-cinzel text-sm font-bold text-[#0e2334] flex items-center gap-2">
                   Formulación de Granos (Malt Bill)
                </h4>
                <div className="bg-white rounded-xl border border-[#4d3720]/15 overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#f2ebd9] text-[#4d3720] font-mono-brew">
                      <tr>
                        <th className="p-2.5">Variedad de Malta</th>
                        <th className="p-2.5 text-center">% Grist</th>
                        <th className="p-2.5 text-right">Peso (1000L)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(selectedBeerModal.grains || []).map((g, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-medium text-slate-700">{g.name}</td>
                          <td className="p-2.5 text-center font-mono-brew font-bold text-[#b89764]">{g.percentage}%</td>
                          <td className="p-2.5 text-right font-mono-brew text-slate-600">{g.kg} kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lúpulos y Levadura */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-cinzel text-sm font-bold text-[#0e2334] flex items-center gap-2">
                     Cronograma de Lúpulos
                  </h4>
                  <div className="bg-white rounded-xl border border-[#4d3720]/15 p-3 space-y-2 text-xs">
                    {(selectedBeerModal.hops || []).map((h, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b pb-1 last:border-b-0">
                        <span className="font-medium text-slate-700">{h.name}</span>
                        <span className="font-mono-brew font-bold text-[#3a452d]">{h.g}g</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-cinzel text-sm font-bold text-[#0e2334] flex items-center gap-2">
                     Levadura & Maceración
                  </h4>
                  <div className="bg-white rounded-xl border border-[#4d3720]/15 p-3 space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-[#4d3720] block">Cepa de Levadura:</span>
                      <p className="text-slate-600">{selectedBeerModal.yeast}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#4d3720] block">Perfil Macerado:</span>
                      <p className="font-mono-brew text-slate-600">{selectedBeerModal.mashTemp}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maridaje y Cristalería */}
              <div className="p-4 bg-[#eee7da] rounded-xl border border-[#4d3720]/15 space-y-1 text-xs">
                <span className="font-cinzel font-bold text-[#0e2334] block">Maridaje Sommelier Sugerido:</span>
                <p className="text-slate-700 italic">
                  {selectedBeerModal.pairing || "Carnes maduradas, quesos de guarda y platos de autor."}
                </p>
                <p className="text-[11px] text-[#4d3720] font-mono-brew pt-1">
                  Cristalería sugerida: {selectedBeerModal.glassware}
                </p>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-[#f2ebd9] border-t border-[#4d3720]/20 flex justify-end">
              <button
                onClick={() => setSelectedBeerModal(null)}
                className="px-6 py-2 rounded-xl bg-[#0e2334] text-white font-cinzel text-xs font-bold hover:bg-[#b89764] hover:text-[#1d1d1b] transition shadow"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: LIGHTBOX DE FOTOGRAFÍA / MOODBOARD */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1d1d1b] border-2 border-[#b89764] rounded-2xl overflow-hidden shadow-2xl my-8 animate-modalScale"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[65vh] bg-black flex items-center justify-center">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-full max-w-full object-contain"
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 hover:bg-[#b89764] text-white hover:text-[#1d1d1b] flex items-center justify-center text-lg font-bold transition shadow"
              >
                
              </button>
            </div>
            <div className="p-5 bg-[#1d1d1b] border-t border-[#b89764]/40 flex items-center justify-between text-white">
              <div>
                <h4 className="font-cinzel text-lg font-bold text-[#c9b38f]">
                  {lightboxImage.title}
                </h4>
                <p className="font-lato text-xs text-slate-300">
                  {lightboxImage.subtitle}
                </p>
              </div>
              <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">
                Archivo Visual NORTA
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// MODALES NUEVOS

// ==========================================================================
// COMPONENTE: BreweryApp
// ==========================================================================
function BreweryApp() {
  const [data, setData] = useState(() => {
    // Limpieza de claves de demo anteriores para cargar semilla V14 Brand Book Enterprise
    ['CERVECERIA_NORTA_DATA', 'CERVECERIA_NORTA_DATA_V2', 'CERVECERIA_NORTA_DATA_V3', 'CERVECERIA_NORTA_DATA_V4', 'CERVECERIA_NORTA_DATA_V5', 'CERVECERIA_NORTA_DATA_V6', 'CERVECERIA_NORTA_DATA_V7', 'CERVECERIA_NORTA_DATA_V8', 'CERVECERIA_NORTA_DATA_V9', 'CERVECERIA_NORTA_DATA_V10', 'CERVECERIA_NORTA_DATA_V11', 'CERVECERIA_NORTA_DATA_V12', 'CERVECERIA_NORTA_DATA_V13'].forEach(k => localStorage.removeItem(k));
    
    const saved = localStorage.getItem("CERVECERIA_NORTA_DATA_V14");
    if (saved) {
      try { 
        const parsed = JSON.parse(saved); 
        if (parsed.documentRepository && parsed.architectureBenchmarking) {
          return {
            ...INITIAL_BREWERY_DATA,
            ...parsed,
            brandIdentity: INITIAL_BREWERY_DATA.brandIdentity,
            recipes: INITIAL_BREWERY_DATA.recipes,
            invimaControlSystem: parsed.invimaControlSystem || INITIAL_BREWERY_DATA.invimaControlSystem,
            waterControlMetadata: parsed.waterControlMetadata || INITIAL_BREWERY_DATA.waterControlMetadata,
            waterControlLogs: parsed.waterControlLogs || INITIAL_BREWERY_DATA.waterControlLogs,
            storageIngressMetadata: parsed.storageIngressMetadata || INITIAL_BREWERY_DATA.storageIngressMetadata,
            storageIngressLogs: parsed.storageIngressLogs || INITIAL_BREWERY_DATA.storageIngressLogs
          }; 
        }
      } catch (e) { console.error(e); }
    }
    return INITIAL_BREWERY_DATA;
  });

  const [theme, setTheme] = useState(() => localStorage.getItem("NORTA_THEME") || 'light');
  
  // Módulos: 'dashboard' | 'brand' | 'production' | 'erp' | 'crm' | 'b2b_portal' | 'docs' | 'processes' | 'hr' | 'legal' | 'architecture'
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // Sub-pestañas
  const [prodTab, setProdTab] = useState('batches');
  const [erpTab, setErpTab] = useState('raw');
  const [crmTab, setCrmTab] = useState('clients');
  const [procTab, setProcTab] = useState('cip');
  const [hrTab, setHrTab] = useState('team');
  const [legalTab, setLegalTab] = useState('sanitary');

  // Modales y estados
  const [modalType, setModalType] = useState(null); // 'newBatch' | 'batchDetail' | 'tankDetail' | 'newOrder' | 'newCip' | 'newLab' | 'recipeDetail' | 'newDocument' | 'logFermentation'
  const [selectedItem, setSelectedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recallSearchLot, setRecallSearchLot] = useState('LOT-2026-088');

  // Portal B2B State
  const [b2bClient, setB2bClient] = useState(data.clients[0]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.setItem("CERVECERIA_NORTA_DATA_V14", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("NORTA_THEME", theme);
  }, [theme]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };





  // --- HANDLERS MÓDULO 3: CALIBRACIÓN (BPM-FO-27) ---
  const handleAddPhMeterLog = (newEntry) => {
    setData(prev => ({
      ...prev,
      phMeterLogs: [newEntry, ...(prev.phMeterLogs || [])]
    }));
    showToast(`Verificación de pH-metro del ${newEntry.date} registrada en BPM-FO-27.`);
  };

  const handleDeletePhMeterLog = (logId) => {
    if (confirm("¿Estás seguro de eliminar este registro de verificación de pH-metro?")) {
      setData(prev => ({ ...prev, phMeterLogs: (prev.phMeterLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro de pH-metro eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 4: CAPACITACIÓN (FO-CAP-001) ---
  const handleAddTrainingAttendance = (newEntry) => {
    setData(prev => ({
      ...prev,
      trainingAttendance: [newEntry, ...(prev.trainingAttendance || [])]
    }));
    showToast(`Asistencia de ${newEntry.employee} a capacitaciones registrada.`);
  };

  const handleDeleteTrainingAttendance = (logId) => {
    if (confirm("¿Estás seguro de eliminar este registro de asistencia?")) {
      setData(prev => ({ ...prev, trainingAttendance: (prev.trainingAttendance || []).filter(l => l.id !== logId) }));
      showToast("Registro de asistencia eliminado.");
    }
  };


  // --- HANDLERS MÓDULO 6: LIMPIEZA Y DESINFECCIÓN (FO-LD-001) ---
  const handleAddCleaningLog = (newEntry) => {
    setData(prev => ({ ...prev, cleaningSanitationLogs: [newEntry, ...(prev.cleaningSanitationLogs || [])] }));
    showToast(`Limpieza POES de ${newEntry.area} registrada.`);
  };
  const handleDeleteCleaningLog = (logId) => {
    if (confirm("¿Eliminar registro de limpieza?")) {
      setData(prev => ({ ...prev, cleaningSanitationLogs: (prev.cleaningSanitationLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 7: MANEJO DE RESIDUOS (FO-RS-001) ---
  const handleAddWasteLog = (newEntry) => {
    setData(prev => ({ ...prev, wasteManagementLogs: [newEntry, ...(prev.wasteManagementLogs || [])] }));
    showToast(`Entrega de ${newEntry.wasteType} registrada.`);
  };
  const handleDeleteWasteLog = (logId) => {
    if (confirm("¿Eliminar registro de residuos?")) {
      setData(prev => ({ ...prev, wasteManagementLogs: (prev.wasteManagementLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 8: MANTENIMIENTO (FO-MTTO-001) ---
  const handleAddMaintenanceLog = (newEntry) => {
    setData(prev => ({ ...prev, maintenanceLogs: [newEntry, ...(prev.maintenanceLogs || [])] }));
    showToast(`Mantenimiento de ${newEntry.equipment} registrado.`);
  };
  const handleDeleteMaintenanceLog = (logId) => {
    if (confirm("¿Eliminar registro de mantenimiento?")) {
      setData(prev => ({ ...prev, maintenanceLogs: (prev.maintenanceLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 9: MUESTREO Y CUARTOS FRÍOS (FO-MUE-001 / FO-CF-001) ---
  const handleAddSamplingLog = (newEntry) => {
    setData(prev => ({ ...prev, samplingLogs: [newEntry, ...(prev.samplingLogs || [])] }));
    showToast(`Muestreo de ${newEntry.sampleObject} registrado.`);
  };
  const handleDeleteSamplingLog = (logId) => {
    if (confirm("¿Eliminar registro de muestreo?")) {
      setData(prev => ({ ...prev, samplingLogs: (prev.samplingLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 10: PROVEEDORES (FO-PROV-001) ---
  const handleAddSupplier = (newEntry) => {
    setData(prev => ({ ...prev, suppliersList: [newEntry, ...(prev.suppliersList || [])] }));
    showToast(`Proveedor ${newEntry.name} registrado.`);
  };
  const handleDeleteSupplier = (logId) => {
    if (confirm("¿Eliminar proveedor?")) {
      setData(prev => ({ ...prev, suppliersList: (prev.suppliersList || []).filter(l => l.id !== logId) }));
      showToast("Proveedor eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 11: TRAZABILIDAD Y CONTRAMUESTRAS (FO-TRA-001) ---
  const handleAddRetainedSample = (newEntry) => {
    setData(prev => ({ ...prev, retainedSamplesLogs: [newEntry, ...(prev.retainedSamplesLogs || [])] }));
    showToast(`Contramuestra de ${newEntry.beerName} (${newEntry.batchLot}) registrada.`);
  };
  const handleDeleteRetainedSample = (logId) => {
    if (confirm("¿Eliminar registro de contramuestra?")) {
      setData(prev => ({ ...prev, retainedSamplesLogs: (prev.retainedSamplesLogs || []).filter(l => l.id !== logId) }));
      showToast("Contramuestra eliminada.");
    }
  };

  // --- HANDLERS MÓDULO 5: CONTROL DE PLAGAS (PG-GC-004) ---
  const handleAddPestLog = (newEntry) => {
    setData(prev => ({
      ...prev,
      pestControlLogs: [newEntry, ...(prev.pestControlLogs || [])]
    }));
    showToast(`Inspección de plagas en ${newEntry.station} registrada.`);
  };

  const handleDeletePestLog = (logId) => {
    if (confirm("¿Estás seguro de eliminar este registro de control de plagas?")) {
      setData(prev => ({ ...prev, pestControlLogs: (prev.pestControlLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro de inspección de plagas eliminado.");
    }
  };

  // --- HANDLERS PARA EL FORMATO DE INGRESO DE MATERIALES (FO-ALM-001) ---
  const handleAddStorageLog = (newEntry) => {
    setData(prev => ({
      ...prev,
      storageIngressLogs: [newEntry, ...(prev.storageIngressLogs || [])]
    }));
    showToast(`Ingreso de ${newEntry.product} registrado en formato FO-ALM-001.`);
  };

  const handleDeleteStorageLog = (logId) => {
    if (confirm("¿Estás seguro de eliminar este registro de ingreso de material?")) {
      setData(prev => ({
        ...prev,
        storageIngressLogs: (prev.storageIngressLogs || []).filter(l => l.id !== logId)
      }));
      showToast("Registro de ingreso de material eliminado.");
    }
  };

  // --- HANDLERS PARA EL FORMATO DE CONTROL DE AGUA POTABLE (FO-AG-002) ---
  const handleAddWaterLog = (newEntry) => {
    setData(prev => ({
      ...prev,
      waterControlLogs: [newEntry, ...(prev.waterControlLogs || [])]
    }));
    showToast(`Medición de agua en ${newEntry.location} registrada en formato FO-AG-002.`);
  };

  const handleDeleteWaterLog = (logId) => {
    if (confirm("¿Estás seguro de eliminar este registro de control de agua?")) {
      setData(prev => ({
        ...prev,
        waterControlLogs: (prev.waterControlLogs || []).filter(l => l.id !== logId)
      }));
      showToast("Registro de control de agua eliminado.");
    }
  };

  // --- FUNCIONES DEL SISTEMA DE CONTROL INVIMA (11 CARPETAS) ---
  const handleAddInvimaDoc = (docData) => {
    setData(prev => {
      const programs = prev.invimaControlSystem || [];
      const updatedPrograms = programs.map(p => {
        if (p.folderName === docData.folderName) {
          return {
            ...p,
            fileCount: p.fileCount + 1,
            files: [docData, ...p.files]
          };
        }
        return p;
      });
      return { ...prev, invimaControlSystem: updatedPrograms };
    });
    setModalType(null);
    showToast(`Documento "${docData.name}" subido a la carpeta ${docData.folderName}.`);
  };

  const handleDeleteInvimaDoc = (programId, docId, docName) => {
    if (confirm(`¿Estás seguro de eliminar el documento "${docName}" del sistema INVIMA?`)) {
      setData(prev => {
        const programs = prev.invimaControlSystem || [];
        const updatedPrograms = programs.map(p => {
          if (p.id === programId) {
            const filteredFiles = p.files.filter(f => f.id !== docId);
            return {
              ...p,
              fileCount: filteredFiles.length,
              files: filteredFiles
            };
          }
          return p;
        });
        return { ...prev, invimaControlSystem: updatedPrograms };
      });
      showToast(`Documento "${docName}" eliminado del sistema INVIMA.`);
    }
  };

  const handleAddInvimaProgram = (newProgramName) => {
    const newProg = {
      id: `PRG-${Math.floor(10 + Math.random() * 90)}`,
      folderName: newProgramName,
      title: newProgramName,
      fileCount: 0,
      status: "Vigente",
      files: []
    };
    setData(prev => ({
      ...prev,
      invimaControlSystem: [...(prev.invimaControlSystem || []), newProg]
    }));
    setModalType(null);
    showToast(`Nueva carpeta/programa "${newProgramName}" creada.`);
  };

  // --- DESCUENTO AUTOMÁTICO DE INVENTARIO (BOM DEDUCT-ON-BREW) ---
  const handleCreateBatch = (newBatchData) => {
    // Buscar la receta seleccionada
    const recipe = data.recipes.find(r => r.id === newBatchData.recipeId) || data.recipes[0];
    
    // Descuento automático de stock de materia prima
    const updatedRawInventory = data.rawInventory.map(item => {
      let deductedAmount = 0;
      // Verificar maltas
      recipe.grains.forEach(g => {
        if (g.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])) {
          deductedAmount += g.kg;
        }
      });
      // Verificar lúpulos
      recipe.hops.forEach(h => {
        if (h.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])) {
          deductedAmount += (h.g / 1000); // gramos a kg
        }
      });
      return {
        ...item,
        stock: Math.max(0, parseFloat((item.stock - deductedAmount).toFixed(2)))
      };
    });

    setData(prev => ({
      ...prev,
      rawInventory: updatedRawInventory,
      batches: [newBatchData, ...prev.batches],
      tanks: prev.tanks.map(t => {
        if (t.id === newBatchData.tankId) {
          return {
            ...t,
            currentBatchId: newBatchData.id,
            beerName: newBatchData.recipeName,
            status: "Fermentando",
            currentL: newBatchData.volumeLiters,
            daysInTank: 1
          };
        }
        return t;
      })
    }));
    setModalType(null);
    showToast(`¡Nuevo lote ${newBatchData.id} registrado! Se descontó materia prima del inventario BOM.`);
  };

  // --- REGISTRO DIARIO DE LECTURA FERMENTATIVA (BEER30 STYLE TIME-SERIES) ---
  const handleAddFermentationLog = (batchId, logEntry) => {
    setData(prev => ({
      ...prev,
      batches: prev.batches.map(b => {
        if (b.id === batchId) {
          const currentLogs = b.fermentationLogs || [];
          return {
            ...b,
            currentGravity: logEntry.sg,
            currentTemp: logEntry.tempC,
            fermentationLogs: [...currentLogs, logEntry]
          };
        }
        return b;
      })
    }));
    setModalType(null);
    showToast(`Lectura fermentativa registrada para el lote ${batchId}.`);
  };

  // --- CARGA DE DOCUMENTOS AL REPOSITORIO DMS ---
  const handleAddDocument = (newDoc) => {
    setData(prev => ({
      ...prev,
      documentRepository: [newDoc, ...prev.documentRepository]
    }));
    setModalType(null);
    showToast(`Documento "${newDoc.title}" cargado al Repositorio DMS.`);
  };

  // --- EXPORTADOR CSV CONTABLE (SIIGO / QUICKBOOKS / XERO / EXCEL) ---
  const exportToCSV = (filename, rows) => {
    if (!rows || !rows.length) return;
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date ? cell.toLocaleString() : cell.toString();
          cell = cell.replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Reporte ${filename}.csv exportado exitosamente.`);
  };

  const handleAdvanceBatchStage = (batchId) => {
    const currentBatch = data.batches?.find(b => b.id === batchId);
    if (!currentBatch) return;

    const stages = ["Maceración", "Hervor", "Fermentación", "Maduración", "Acondicionado", "Envasado", "Completado"];
    const currentIndex = stages.indexOf(currentBatch.stage);
    const nextStage = stages[Math.min(currentIndex + 1, stages.length - 1)];

    // [CLEAN BOUNDARY HARNESS / POKA-YOKE SANITARIO]
    const currentTank = data.tanks?.find(t => t.id === currentBatch.tankId);
    const latestWaterLog = data.waterControlLogs?.[0];

    const evaluation = evaluateBatchStageAdvance(currentBatch, nextStage, {
      latestWaterLog,
      tank: currentTank
    });

    if (!evaluation.canAdvance && evaluation.blockReason) {
      alert(`[BLOQUEO SANITARIO / POKA-YOKE]\n\n${evaluation.blockReason.title}\n\n${evaluation.blockReason.detail}`);
      showToast(`[BLOQUEO SANITARIO] ${evaluation.blockReason.title}`);
      return;
    }

    setData(prev => {
      let targetBatch = null;
      const updatedBatches = prev.batches.map(b => {
        if (b.id === batchId) {
          const newProgress = Math.min(Math.round(((currentIndex + 2) / stages.length) * 100), 100);
          targetBatch = {
            ...b,
            stage: nextStage,
            stageProgress: newProgress,
            status: nextStage === "Completado" ? "Completado" : "Activo"
          };
          return targetBatch;
        }
        return b;
      });

      // 1. Si el lote avanza a 'Envasado' o 'Completado', incrementar stock de Producto Terminado (finishedGoods)
      let updatedFinishedGoods = prev.finishedGoods;
      if (targetBatch && (targetBatch.stage === "Envasado" || targetBatch.stage === "Completado")) {
        const unitsProduced = Math.round((targetBatch.volumeLiters || 500) / 0.5); // Botellas de 500ml
        updatedFinishedGoods = prev.finishedGoods.map(fg => {
          if (fg.beerName.toLowerCase().includes(targetBatch.recipeName.toLowerCase()) || 
              targetBatch.recipeName.toLowerCase().includes(fg.beerName.toLowerCase())) {
            return { ...fg, stockUnits: fg.stockUnits + unitsProduced };
          }
          return fg;
        });
      }

      // 2. Si el lote se completa, liberar el tanque y marcarlo 'CIP_Pendiente' en el Cellar Map
      let updatedTanks = prev.tanks;
      if (targetBatch && targetBatch.stage === "Completado") {
        updatedTanks = prev.tanks.map(t => {
          if (t.id === targetBatch.tankId) {
            return { ...t, status: "CIP_Pendiente", currentL: 0, beerName: "Vacío (Pendiente Lavado CIP)" };
          }
          return t;
        });
      }

      return {
        ...prev,
        batches: updatedBatches,
        finishedGoods: updatedFinishedGoods,
        tanks: updatedTanks
      };
    });
    showToast(`Lote ${batchId} avanzado a etapa siguiente con actualización en stock y Cellar Map.`);
  };

  const handleUpdateTankStatus = (tankId, newStatus, newTemp) => {
    setData(prev => ({
      ...prev,
      tanks: prev.tanks.map(t => {
        if (t.id === tankId) {
          return {
            ...t,
            status: newStatus,
            tempC: newTemp !== undefined ? parseFloat(newTemp) : t.tempC,
            currentL: newStatus === "CIP Aprobado" || newStatus === "Pendiente CIP" ? 0 : t.currentL
          };
        }
        return t;
      })
    }));
    setModalType(null);
    showToast(`Tanque ${tankId} actualizado.`);
  };

  const handleCreateOrder = (order) => {
    setData(prev => {
      // 1. Deducción automática de stock de Producto Terminado (finishedGoods)
      const updatedFinishedGoods = prev.finishedGoods.map(fg => {
        let totalDeduct = 0;
        
        // Si el pedido proviene del Portal B2B con múltiples ítems en carrito
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach(item => {
            if (item.beerName === fg.beerName || fg.beerName.includes(item.beerName) || item.beerName.includes(fg.beerName)) {
              totalDeduct += (item.quantity || 0);
            }
          });
        } 
        // Si el pedido es directo por formulario simple
        else if (order.beerName && (fg.beerName === order.beerName || fg.beerName.includes(order.beerName) || order.beerName.includes(fg.beerName))) {
          totalDeduct += (order.quantity || 0);
        }

        if (totalDeduct > 0) {
          const newStock = Math.max(0, fg.stockUnits - totalDeduct);
          return { ...fg, stockUnits: newStock };
        }
        return fg;
      });

      return {
        ...prev,
        salesOrders: [order, ...prev.salesOrders],
        finishedGoods: updatedFinishedGoods
      };
    });
    setModalType(null);
    showToast(`Pedido ${order.id} registrado y stock de producto terminado descontado en ERP.`);
  };

  const handleCreateCipLog = (cip) => {
    setData(prev => ({
      ...prev,
      cipLogs: [cip, ...prev.cipLogs],
      tanks: prev.tanks.map(t => {
        if (cip.equipment.includes(t.id)) {
          return { ...t, status: "CIP Aprobado", lastCipDate: cip.date.split(' ')[0], currentL: 0, beerName: "Disponible para siembra" };
        }
        return t;
      })
    }));
    setModalType(null);
    showToast(`Registro CIP ${cip.id} completado.`);
  };

  const handleCreateQualityTest = (test) => {
    setData(prev => ({
      ...prev,
      qualityTests: [test, ...prev.qualityTests]
    }));
    setModalType(null);
    showToast(`Análisis de laboratorio ${test.id} guardado.`);
  };

  const handleResetData = () => {
    if (confirm("¿Deseas restaurar los datos de fábrica de NORTA Brand Book 5.0?")) {
      setData(INITIAL_BREWERY_DATA);
      ['CERVECERIA_NORTA_DATA', 'CERVECERIA_NORTA_DATA_V2', 'CERVECERIA_NORTA_DATA_V3', 'CERVECERIA_NORTA_DATA_V4', 'CERVECERIA_NORTA_DATA_V5', 'CERVECERIA_NORTA_DATA_V6', 'CERVECERIA_NORTA_DATA_V7', 'CERVECERIA_NORTA_DATA_V8', 'CERVECERIA_NORTA_DATA_V9', 'CERVECERIA_NORTA_DATA_V10', 'CERVECERIA_NORTA_DATA_V11', 'CERVECERIA_NORTA_DATA_V12', 'CERVECERIA_NORTA_DATA_V13', 'CERVECERIA_NORTA_DATA_V14'].forEach(k => localStorage.removeItem(k));
      showToast("Datos empresariales & Brand Book restaurados.");
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#141412] text-[#f8fafc]' : 'theme-light bg-[#f7f4ed] text-[#111827]'} font-sans transition-colors duration-300`}>
      
      {/* SIDEBAR NORTA */}
      <aside className={`w-64 ${theme === 'dark' ? 'bg-[#181816] border-[#2d2a24]' : 'bg-[#eee7da] border-[#d4c8b5]'} border-r flex flex-col justify-between shrink-0 select-none`}>
        <div>
          <div className={`p-5 border-b ${theme === 'dark' ? 'border-[#2d2a24] bg-[#121210]' : 'border-[#d4c8b5] bg-[#e6dfce]'} flex items-center gap-3`}>
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#c9b38f]/60 shadow-md shrink-0 bg-[#0e2334] flex items-center justify-center p-0.5">
              <img src="./assets/logo_norta_principal.png" alt="Logo NORTA" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className={`brand-title text-xl font-bold ${theme === 'dark' ? 'text-[#c9b38f]' : 'text-[#0e2334]'} tracking-widest leading-none`}>NORTA</h1>
              <p className={`text-[10px] ${theme === 'dark' ? 'text-[#a39e93]' : 'text-[#4d3720]'} tracking-widest uppercase mt-1 font-bold`}>Enterprise Suite 5.0</p>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            <NavItem icon={<SvgCompass className="w-4 h-4 inline" />} label="Identidad NORTA" active={activeModule === 'brand'} badge="Brand Book" badgeColor="bg-[#b89764] text-[#1d1d1b] font-bold shadow" onClick={() => setActiveModule('brand')} theme={theme} />
                        <NavItem icon={<SvgLayoutDashboard className="w-4 h-4 inline" />} label="Dashboard Ejecutivo" active={activeModule === 'dashboard'} badge="En Vivo" badgeColor="bg-[#3a452d]/80 text-white" onClick={() => setActiveModule('dashboard')} theme={theme} />
            <NavItem icon={<SvgBuilding className="w-4 h-4 inline" />} label="Control INVIMA (14 Carpetas)" active={activeModule === 'invima_system'} badge="14 Carpetas" badgeColor="bg-[#0e2334] text-[#c9b38f] font-bold shadow" onClick={() => setActiveModule('invima_system')} theme={theme} />
            <NavItem icon={<SvgBeer className="w-4 h-4 inline" />} label="Producción & Lotes" active={activeModule === 'production'} badge={`${data.batches.filter(b => b.status === 'Activo').length} Activos`} badgeColor="bg-[#4d3720]/80 text-white" onClick={() => setActiveModule('production')} theme={theme} />
            <NavItem icon={<SvgPackage className="w-4 h-4 inline" />} label="ERP & Inventarios" active={activeModule === 'erp'} onClick={() => setActiveModule('erp')} theme={theme} />
            <NavItem icon={<SvgUsers className="w-4 h-4 inline" />} label="CRM & Ventas B2B" active={activeModule === 'crm'} onClick={() => setActiveModule('crm')} theme={theme} />
            <NavItem icon={<SvgShoppingCart className="w-4 h-4 inline" />} label="Portal Autopedidos B2B" active={activeModule === 'b2b_portal'} badge="Breww B2B" badgeColor="bg-[#0e2334] text-white" onClick={() => setActiveModule('b2b_portal')} theme={theme} />
                                    <NavItem icon={<SvgFolder className="w-4 h-4 inline" />} label="Repositorio DMS / BPM" active={activeModule === 'docs'} badge={`${data.documentRepository.length} Docs`} badgeColor="bg-[#4d3720] text-white" onClick={() => setActiveModule('docs')} theme={theme} />
            <NavItem icon={<SvgFlaskConical className="w-4 h-4 inline" />} label="Procesos & Calidad CIP" active={activeModule === 'processes'} onClick={() => setActiveModule('processes')} theme={theme} />
            <NavItem icon={<SvgUsers className="w-4 h-4 inline" />} label="Talento Humano" active={activeModule === 'hr'} onClick={() => setActiveModule('hr')} theme={theme} />
            <NavItem icon={<SvgScale className="w-4 h-4 inline" />} label="Cumplimiento Legal" active={activeModule === 'legal'} badge="1 Alerta" badgeColor="bg-red-700 text-white animate-pulse" onClick={() => setActiveModule('legal')} theme={theme} />
            <NavItem icon={<SvgBoxes className="w-4 h-4 inline" />} label="Matriz de Arquitecturas" active={activeModule === 'architecture'} badge="Benchmarking" badgeColor="bg-[#0e2334] text-white" onClick={() => setActiveModule('architecture')} theme={theme} />
          </nav>
        </div>

        <div className={`p-4 border-t ${theme === 'dark' ? 'border-[#2d2a24] bg-[#121210]' : 'border-[#d4c8b5] bg-[#e6dfce]'}`}>
          <div className={`mb-2.5 p-2 rounded-lg ${theme === 'dark' ? 'bg-[#181816]/70 border border-[#2d2a24]/70' : 'bg-[#f4efe4]/80 border border-[#d4c8b5]/70'} text-center transition-all`}>
            <span className={`block text-[8.5px] uppercase tracking-widest font-semibold ${theme === 'dark' ? 'text-[#8c8273]' : 'text-[#78716c]'}`}>
              Creado por:
            </span>
            <span className={`block text-[10px] font-medium tracking-wide mt-0.5 ${theme === 'dark' ? 'text-[#c9b38f]' : 'text-[#0e2334]'} font-serif`}>
              MSc. Ing. Julio Roberto Cristancho Barrera
            </span>
          </div>
          <div className={`flex items-center justify-between pt-2 border-t ${theme === 'dark' ? 'border-[#242420]' : 'border-[#d4c8b5]'} text-[11px] ${theme === 'dark' ? 'text-[#a39e93]' : 'text-[#4d3720]'}`}>
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3a452d]"></span>
              Planta Activa
            </span>
            <button onClick={handleResetData} title="Restaurar demo" className="font-bold hover:text-[#0e2334] transition">
               Demo V5.0
            </button>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-y-auto h-screen">
        <header className={`h-16 border-b ${theme === 'dark' ? 'border-[#2d2a24] bg-[#181816]/95' : 'border-[#d4c8b5] bg-[#eee7da]/95'} backdrop-blur sticky top-0 z-30 px-6 flex items-center justify-between shadow-sm`}>
          <div className="flex items-center gap-4">
            <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#dcd7cc]' : 'text-[#111827]'} flex items-center gap-2`}>
              <span className="brand-title text-[#0e2334] font-extrabold tracking-widest uppercase">NORTA</span>
              <span className="text-[#a39e93]">/</span>
              <span className="capitalize font-bold text-[#0e2334]">
                {activeModule === 'invima_system' && 'Documentos del Sistema de Control INVIMA (14 Carpetas Oficiales)'}
                {activeModule === 'brand' && 'Identidad NORTA • Brand Book Digital Oficial'}
                {activeModule === 'dashboard' && 'Dashboard Ejecutivo & Cellar Map en Vivo'}
                {activeModule === 'production' && 'Control de Producción & Curvas Fermentativas'}
                {activeModule === 'erp' && 'ERP, Inventarios BOM & Costeo COGS'}
                {activeModule === 'crm' && 'CRM Comercial & Despachos B2B'}
                {activeModule === 'b2b_portal' && 'Portal de Autogestión B2B para Bares & Restaurantes'}
                {activeModule === 'docs' && 'Repositorio Documental Inteligente (DMS / BPM / INVIMA / COA)'}
                {activeModule === 'processes' && 'Procesos Operativos, Limpieza CIP & Laboratorio'}
                {activeModule === 'hr' && 'Gestión de Talento Humano & Cuadrantes'}
                {activeModule === 'legal' && 'Cumplimiento Regulatorio, Sanitario & Legal'}
                {activeModule === 'architecture' && 'Matriz Comparativa de Arquitecturas (Breww, Beer30, Ekos, Odoo)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="btn-norta-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 font-extrabold border-[#0e2334]" title="Cambiar tema">
              <span>{theme === 'dark' ? ' Modo Claro' : ' Modo Oscuro'}</span>
            </button>

                        <button onClick={() => setActiveModule('invima_system')} className="btn-norta-primary text-xs font-bold shadow flex items-center gap-1.5 bg-[#0e2334] text-white border border-[#c9b38f]" title="Abrir las 11 Carpetas del Sistema de Control INVIMA">
              
              <span>11 Carpetas INVIMA</span>
            </button>
            <button onClick={() => setModalType('uploadInvimaDoc')} className="btn-norta-primary text-xs font-bold shadow" title="Subir Documento al Sistema de Control INVIMA">
               Subir Doc INVIMA
            </button>
            <button onClick={() => setModalType('newDocument')} className="btn-norta-secondary text-xs font-bold border-[#0e2334]" title="Cargar archivo al Repositorio DMS">
               Cargar Doc DMS
            </button>

            <button onClick={() => setModalType('newBatch')} className="btn-norta-primary text-xs">
              <span>+</span> Nuevo Lote
            </button>
          </div>
        </header>

        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#c9b38f] text-[#1d1d1b] font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#dfcaa8] animate-bounce">
            
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {activeModule === 'invima_system' && <InvimaControlSystemModule data={data} onOpenUploadDoc={() => setModalType('uploadInvimaDoc')} onOpenNewProgram={() => setModalType('newInvimaProgram')} onDeleteDoc={handleDeleteInvimaDoc} onAddStorageLog={handleAddStorageLog} onDeleteStorageLog={handleDeleteStorageLog} onAddWaterLog={handleAddWaterLog} onDeleteWaterLog={handleDeleteWaterLog} onAddPhMeterLog={handleAddPhMeterLog} onDeletePhMeterLog={handleDeletePhMeterLog} onAddTrainingAttendance={handleAddTrainingAttendance} onDeleteTrainingAttendance={handleDeleteTrainingAttendance} onAddPestLog={handleAddPestLog} onDeletePestLog={handleDeletePestLog} onAddCleaningLog={handleAddCleaningLog} onDeleteCleaningLog={handleDeleteCleaningLog} onAddWasteLog={handleAddWasteLog} onDeleteWasteLog={handleDeleteWasteLog} onAddMaintenanceLog={handleAddMaintenanceLog} onDeleteMaintenanceLog={handleDeleteMaintenanceLog} onAddSamplingLog={handleAddSamplingLog} onDeleteSamplingLog={handleDeleteSamplingLog} onAddSupplier={handleAddSupplier} onDeleteSupplier={handleDeleteSupplier} onAddRetainedSample={handleAddRetainedSample} onDeleteRetainedSample={handleDeleteRetainedSample} onExportCSV={exportToCSV} />}
          {activeModule === 'brand' && <BrandIdentityModule data={data} />}
          {activeModule === 'dashboard' && <DashboardModule data={data} onOpenNewBatch={() => setModalType('newBatch')} onOpenNewOrder={() => setModalType('newOrder')} onOpenBatchDetail={(b) => { setSelectedItem(b); setModalType('batchDetail'); }} onOpenTankDetail={(t) => { setSelectedItem(t); setModalType('tankDetail'); }} onSelectModule={setActiveModule} />}
          {activeModule === 'production' && <ProductionModule data={data} tab={prodTab} setTab={setProdTab} onAdvanceBatch={handleAdvanceBatchStage} onOpenNewBatch={() => setModalType('newBatch')} onOpenBatchDetail={(b) => { setSelectedItem(b); setModalType('batchDetail'); }} onOpenRecipeDetail={(r) => { setSelectedItem(r); setModalType('recipeDetail'); }} onOpenTankDetail={(t) => { setSelectedItem(t); setModalType('tankDetail'); }} onOpenLogFerment={(b) => { setSelectedItem(b); setModalType('logFermentation'); }} />}
          {activeModule === 'erp' && <ErpModule data={data} tab={erpTab} setTab={setErpTab} onExportCSV={exportToCSV} />}
          {activeModule === 'crm' && <CrmModule data={data} tab={crmTab} setTab={setCrmTab} onOpenNewOrder={() => setModalType('newOrder')} onExportCSV={exportToCSV} />}
          {activeModule === 'b2b_portal' && <B2bPortalModule data={data} client={b2bClient} setClient={setB2bClient} cart={cart} setCart={setCart} onSubmitOrder={handleCreateOrder} showToast={showToast} />}
          {activeModule === 'docs' && <DocumentRepositoryModule data={data} onOpenNewDoc={() => setModalType('newDocument')} />}
          {activeModule === 'processes' && <ProcessesModule data={data} tab={procTab} setTab={setProcTab} onOpenNewCip={() => setModalType('newCip')} onOpenNewLab={() => setModalType('newLab')} />}
          {activeModule === 'hr' && <HrModule data={data} tab={hrTab} setTab={setHrTab} />}
          {activeModule === 'legal' && <LegalModule data={data} tab={legalTab} setTab={setLegalTab} recallSearchLot={recallSearchLot} setRecallSearchLot={setRecallSearchLot} onExportCSV={exportToCSV} />}
          {activeModule === 'architecture' && <ArchitectureModule data={data} />}
        </div>
      </main>

      {/* MODALES */}
      {modalType === 'newBatch' && <NewBatchModal recipes={data.recipes} tanks={data.tanks} onClose={() => setModalType(null)} onSubmit={handleCreateBatch} />}
      {modalType === 'batchDetail' && selectedItem && <BatchDetailModal batch={selectedItem} onClose={() => setModalType(null)} onAdvance={() => { handleAdvanceBatchStage(selectedItem.id); setModalType(null); }} onOpenLogFerment={() => setModalType('logFermentation')} />}
      {modalType === 'tankDetail' && selectedItem && <TankDetailModal tank={selectedItem} onClose={() => setModalType(null)} onUpdate={handleUpdateTankStatus} />}
      {modalType === 'newOrder' && <NewOrderModal clients={data.clients} finishedGoods={data.finishedGoods} onClose={() => setModalType(null)} onSubmit={handleCreateOrder} />}
      {modalType === 'newCip' && <NewCipModal tanks={data.tanks} onClose={() => setModalType(null)} onSubmit={handleCreateCipLog} />}
      {modalType === 'newLab' && <NewLabModal batches={data.batches} onClose={() => setModalType(null)} onSubmit={handleCreateQualityTest} />}
      {modalType === 'recipeDetail' && selectedItem && <RecipeDetailModal recipe={selectedItem} onClose={() => setModalType(null)} onBrew={() => setModalType('newBatch')} />}
            {modalType === 'uploadInvimaDoc' && <UploadInvimaDocModal programs={data.invimaControlSystem || []} onClose={() => setModalType(null)} onSubmit={handleAddInvimaDoc} />}
      {modalType === 'newInvimaProgram' && <NewInvimaProgramModal onClose={() => setModalType(null)} onSubmit={handleAddInvimaProgram} />}
      {modalType === 'newDocument' && <NewDocumentModal batches={data.batches} onClose={() => setModalType(null)} onSubmit={handleAddDocument} />}
      {modalType === 'logFermentation' && selectedItem && <LogFermentationModal batch={selectedItem} onClose={() => setModalType(null)} onSubmit={(log) => handleAddFermentationLog(selectedItem.id, log)} />}
    </div>
  );
}



// ==========================================================================
// COMPONENTE: FORMATO DE INGRESO DE MATERIALES (FO-ALM-001 - ALMACENAMIENTO)
// ==========================================================================


// ==========================================================================
// MÓDULO 3: CALIBRACIÓN & VERIFICACIÓN DE pH-METRO (BPM-FO-27 / BPM-FO-26)
// ==========================================================================
// ==========================================================================
// MÓDULO 4: CAPACITACIÓN EN INOCUIDAD & BPM (FO-CAP-001)
// ==========================================================================
// ==========================================================================
// MÓDULO 5: MANEJO INTEGRADO DE PLAGAS & HERMETIZACIÓN (PG-GC-004)
// ==========================================================================


// ==========================================================================
// MÓDULO 6: LIMPIEZA Y DESINFECCIÓN POES (FO-LD-001 / BPM-PR-01a25)
// ==========================================================================
// ==========================================================================
// MÓDULO 7: MANEJO DE RESIDUOS SÓLIDOS & ORGÁNICOS (FO-RS-001)
// ==========================================================================
// ==========================================================================
// MÓDULO 8: MANTENIMIENTO PREVENTIVO & CORRECTIVO (FO-MTTO-001)
// ==========================================================================
// ==========================================================================
// MÓDULO 9: MUESTREO & CUARTOS FRÍOS (FO-MUE-001 / FO-CF-001)
// ==========================================================================
// ==========================================================================
// MÓDULO 10: CONTROL DE PROVEEDORES HOMOLOGADOS (FO-PROV-001)
// ==========================================================================
// ==========================================================================
// MÓDULO 11: TRAZABILIDAD & CONTROL DE CONTRAMUESTRAS (FO-TRA-001)
// ==========================================================================


// ==========================================================================
// COMPONENTE: FermentationSvgChart (GRAFICADOR VECTORIAL SVG TIME-SERIES)
// ==========================================================================


export default BreweryApp;
