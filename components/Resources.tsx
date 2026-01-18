
import React from 'react';
import { IconBookOpen, IconMail, IconMessageSquare, IconHelpCircle, IconArrowRight } from './Icons';

const Resources: React.FC = () => {
  const resources = [
    {
      title: "Blog",
      desc: "Latest strategies on local lead gen and sales psychology.",
      icon: IconBookOpen,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      link: "https://example.com/blog"
    },
    {
      title: "Cold Email Templates",
      desc: "Copy-paste our highest performing outreach sequences.",
      icon: IconMail,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      link: "https://example.com/templates"
    },
    {
      title: "Sales Scripts",
      desc: "Exact words to use to handle gatekeepers and book meetings.",
      icon: IconMessageSquare,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      link: "https://example.com/scripts"
    },
    {
      title: "Support Center",
      desc: "Guides, tutorials, and documentation to get you started.",
      icon: IconHelpCircle,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-500/10",
      link: "https://example.com/support"
    }
  ];

  return (
    <section id="resources" className="py-24 bg-white dark:bg-[#030712] relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Resources to help you <span className="text-primary-500">win.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Don't just find leads. Close them with our battle-tested assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((item, i) => (
            <a 
              key={i} 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl p-8 hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/20 flex flex-col"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                {item.desc}
              </p>
              
              <div className="flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                Access Now
                <IconArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
