
import React from 'react';
import { IconSearch, IconZap, IconFileDown, IconClock } from './Icons';

const WhatItDoes: React.FC = () => {
  const steps = [
    {
      id: "01",
      icon: IconSearch,
      title: "Map Scan",
      desc: "Type \"Plumbers in Austin\". We scan Google Maps listings in that specific area instantly.",
      colorClass: "text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300",
      bgClass: "bg-blue-50 dark:bg-white/5 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20",
      borderClass: "border-blue-100 dark:border-white/10 group-hover:border-blue-200 dark:group-hover:border-blue-500/30",
      shadowClass: "group-hover:shadow-blue-200 dark:group-hover:shadow-blue-500/20"
    },
    {
      id: "02",
      icon: IconZap,
      title: "Website Check",
      desc: "We visit every profile. If the \"Website\" button is missing, they go onto your \"Hot Lead\" list.",
      colorClass: "text-purple-500 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300",
      bgClass: "bg-purple-50 dark:bg-white/5 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20",
      borderClass: "border-purple-100 dark:border-white/10 group-hover:border-purple-200 dark:group-hover:border-purple-500/30",
      shadowClass: "group-hover:shadow-purple-200 dark:group-hover:shadow-purple-500/20"
    },
    {
      id: "03",
      icon: IconFileDown,
      title: "Clean Export",
      desc: "Get a formatted CSV file with business name, phone number, address, and map link.",
      colorClass: "text-pink-500 dark:text-pink-400 group-hover:text-pink-600 dark:group-hover:text-pink-300",
      bgClass: "bg-pink-50 dark:bg-white/5 group-hover:bg-pink-100 dark:group-hover:bg-pink-500/20",
      borderClass: "border-pink-100 dark:border-white/10 group-hover:border-pink-200 dark:group-hover:border-pink-500/30",
      shadowClass: "group-hover:shadow-pink-200 dark:group-hover:shadow-pink-500/20"
    },
    {
      id: "04",
      icon: IconClock,
      title: "Time Saved",
      desc: "What used to take you 3 hours of clicking now happens in the background while you relax.",
      colorClass: "text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300",
      bgClass: "bg-emerald-50 dark:bg-white/5 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20",
      borderClass: "border-emerald-100 dark:border-white/10 group-hover:border-emerald-200 dark:group-hover:border-emerald-500/30",
      shadowClass: "group-hover:shadow-emerald-200 dark:group-hover:shadow-emerald-500/20"
    }
  ];

  return (
    <section id="what-it-does" className="py-24 bg-slate-50 dark:bg-[#020617] border-y border-slate-200 dark:border-white/5 relative transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.03] bg-[size:32px_32px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-primary-600 dark:text-primary-400 font-bold uppercase tracking-wider text-xs mb-2 block">The Workflow</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            From search to spreadsheet in <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-600 dark:from-primary-400 dark:to-orange-400">under 2 minutes.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Finding clients manually is boring work. Our system automates the tedious parts so you can focus on selling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent -z-10"></div>

          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`relative group bg-white dark:bg-white/[0.03] backdrop-blur-sm p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-black/40 ${step.borderClass} ${step.shadowClass}`}
            >
              {/* Step Number Background */}
              <div className="absolute -right-2 -top-6 text-[8rem] font-bold text-slate-900 dark:text-white opacity-[0.03] dark:opacity-[0.02] select-none group-hover:opacity-[0.05] dark:group-hover:opacity-[0.04] transition-opacity font-sans pointer-events-none">
                {step.id.charAt(1)}
              </div>
              
              <div className="mb-6 relative">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${step.bgClass} ${step.borderClass} ${step.colorClass}`}>
                    <step.icon className="w-7 h-7 transition-all duration-500 ease-out group-hover:rotate-12 group-hover:scale-110" style={{ color: 'inherit' }} />
                 </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 transition-colors">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhatItDoes;
