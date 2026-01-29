import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IconArrowRight, IconSearch, IconFileDown, IconMapPin, IconActivity, IconZap, IconShield, IconGlobe, IconChevronDown, IconCrown, IconLock } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { searchLeads, exportToCSV, autocompleteCities, CitySuggestion } from '../lib/api';
import { Lead, SubscriptionTier } from '../lib/types';
import { Session } from '@supabase/supabase-js';
import Background3D from './Background3D';

// Debounce helper function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

interface HeroProps {
  session: Session | null;
  onLoginClick: () => void;
  subscriptionTier?: SubscriptionTier; // Pass user's subscription tier for tiered search
}

const Hero: React.FC<HeroProps> = ({ session, onLoginClick, subscriptionTier = 'free' }) => {
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [focusedField, setFocusedField] = useState<'keyword' | 'city' | null>(null);
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const inputRefKeyword = useRef<HTMLInputElement>(null);
  const inputRefCity = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const categories = [
    { name: "Restaurants", icon: <IconSearch className="w-4 h-4" />, isPremium: true },
    { name: "Hotels", icon: <IconMapPin className="w-4 h-4" />, isPremium: true },
    { name: "Gyms", icon: <IconShield className="w-4 h-4" />, isPremium: true },
    { name: "Dentists", icon: <IconActivity className="w-4 h-4" />, isPremium: true },
    { name: "Clinics", icon: <IconActivity className="w-4 h-4" />, isPremium: true },
    { name: "Salons", icon: <IconGlobe className="w-4 h-4" />, isPremium: false },
    { name: "Spas", icon: <IconGlobe className="w-4 h-4" />, isPremium: false },
    { name: "Cafes", icon: <IconSearch className="w-4 h-4" />, isPremium: false },
    { name: "Bakeries", icon: <IconSearch className="w-4 h-4" />, isPremium: false },
    { name: "Pet Shops", icon: <IconShield className="w-4 h-4" />, isPremium: false },
    { name: "Pharmacies", icon: <IconActivity className="w-4 h-4" />, isPremium: false },
    { name: "Florists", icon: <IconGlobe className="w-4 h-4" />, isPremium: false },
    { name: "Boutiques", icon: <IconGlobe className="w-4 h-4" />, isPremium: false },
    { name: "Car Dealers", icon: <IconMapPin className="w-4 h-4" />, isPremium: true },
    { name: "Auto Workshops", icon: <IconZap className="w-4 h-4" />, isPremium: true },
    { name: "Jewelry Stores", icon: <IconGlobe className="w-4 h-4" />, isPremium: true },
    { name: "Optical Stores", icon: <IconActivity className="w-4 h-4" />, isPremium: false },
    { name: "Furniture Stores", icon: <IconMapPin className="w-4 h-4" />, isPremium: false },
    { name: "Electronics Stores", icon: <IconZap className="w-4 h-4" />, isPremium: false },
    { name: "Grocery Stores", icon: <IconSearch className="w-4 h-4" />, isPremium: false },
  ];

  const defaultCitySuggestions = ["Austin, TX", "New York, NY", "Los Angeles, CA", "Miami, FL", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Denver, CO"];

  // Debounced city autocomplete
  const debouncedCitySearch = useCallback(
    debounce(async (input: string) => {
      if (input.length < 2) {
        setCitySuggestions([]);
        return;
      }
      setIsLoadingCities(true);
      try {
        const suggestions = await autocompleteCities(input);
        setCitySuggestions(suggestions);
      } catch (error) {
        console.error('City autocomplete error:', error);
      } finally {
        setIsLoadingCities(false);
      }
    }, 300),
    []
  );

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    debouncedCitySearch(value);
  };

  // Filter categories based on input
  const filteredCategories = keyword.length > 0
    ? categories.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()))
    : categories;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setFocusedField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [tickerIndex, setTickerIndex] = useState(0);
  const tickers = [
    "⚡ Live: Found 3 Roofers in Austin without a site",
    "⚡ Live: Found 5 Dentists in Miami without a site",
    "⚡ Live: Found 2 Gyms in Denver without a site",
    "⚡ Live: Found 4 Cafes in Portland without a site"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Allow search without login for testing
    // if (!session) {
    //   onLoginClick();
    //   return;
    // }
    if (!keyword || !city) return;

    setFocusedField(null);
    setLoading(true);
    setHasSearched(true);
    setLeads([]);

    // Pro/Business users get comprehensive search (more results, more API calls)
    // Free/Starter users get basic search (fewer results, lower cost)
    const isPro = subscriptionTier === 'pro' || subscriptionTier === 'business';

    try {
      const results = await searchLeads({ keyword, city, isPro });
      setLeads(results);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (value: string) => {
    setKeyword(value);
    // Auto-advance to city field for better UX
    setTimeout(() => {
        inputRefCity.current?.focus();
        setFocusedField('city');
    }, 100);
  };

  const handleCitySelect = (value: string) => {
    setCity(value);
    setFocusedField(null);
    setCitySuggestions([]);
  };

  // Filter state - show all or only without website
  const [showOnlyNoWebsite, setShowOnlyNoWebsite] = useState(true);

  const filteredLeads = showOnlyNoWebsite
    ? leads.filter(l => !l.has_website)
    : leads;

  const leadsWithoutWebsite = leads.filter(l => !l.has_website).length;
  const leadsWithWebsite = leads.filter(l => l.has_website).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  const gradientWordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }
  };

  const centeredDropdownVariants = {
    hidden: { opacity: 0, y: -10, x: "-50%", scale: 0.95 },
    visible: { opacity: 1, y: 0, x: "-50%", scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, x: "-50%", scale: 0.95, transition: { duration: 0.15 } }
  };

  // Improved Split Island Animation
  const getFieldStyle = (isFocused: boolean, isOtherFocused: boolean) => {
      if (isFocused) {
          return {
              flex: 1.2,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              y: 0,
              zIndex: 30
          };
      }
      if (isOtherFocused) {
          return {
              flex: 1,
              opacity: 0.4,
              scale: 0.98,
              filter: "blur(2px)",
              y: -8, // Reduced slide up distance
              zIndex: 10
          };
      }
      return {
          flex: 1,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          zIndex: 20
      };
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 min-h-screen flex flex-col items-center justify-start bg-white dark:bg-[#030712] transition-colors duration-300 overflow-visible">

      <Background3D />

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-grid-black/[0.04] dark:bg-grid-white/[0.04] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center relative z-10 w-full">

        {/* Modern Glass Ticker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-fit mb-8"
        >
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={tickerIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 tracking-wide"
                    >
                        {tickers[tickerIndex]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.9] mx-auto max-w-6xl"
        >
          <span className="inline-block">
            {["Find", "clients", "who"].map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block mr-2 md:mr-4">
                {word}
              </motion.span>
            ))}
          </span>
          <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-orange-500 to-amber-500 dark:from-primary-400 dark:via-orange-400 dark:to-amber-400 inline-block pb-3">
             {["actually", "need", "you."].map((word, i) => (
              <motion.span key={i} variants={gradientWordVariants} className="inline-block mr-2 md:mr-4">
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
        >
          Stop cold calling businesses that already have great websites. We identify local companies with <strong>zero digital footprint</strong> so you can offer immediate value.
        </motion.p>

        {/* Search Bar / Login Gate */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto mb-16 relative z-30"
        >
          {/* Always show form for testing, removed session check */}
          <form
            ref={formRef}
            onSubmit={handleSearch}
            className="relative flex flex-col md:flex-row items-center bg-white dark:bg-slate-900 p-1 rounded-[2.5rem] md:rounded-full border border-slate-200 dark:border-slate-800 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out hover:shadow-xl dark:hover:shadow-2xl group/search"
          >

              {/* Category Input */}
              <motion.div
                  layout
                  className="relative group px-4 py-1.5 cursor-pointer rounded-3xl md:rounded-l-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors duration-300"
                  onClick={() => inputRefKeyword.current?.focus()}
                  animate={getFieldStyle(focusedField === 'keyword', focusedField === 'city')}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                  <div className="flex flex-col items-start justify-center h-full relative">
                        <div className="flex items-center gap-2 mb-0">
                            <label className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${focusedField === 'keyword' ? 'text-primary-500' : 'text-slate-500 dark:text-slate-400'}`}>Category</label>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                           <IconSearch className={`w-3.5 h-3.5 transition-colors ${focusedField === 'keyword' ? 'text-primary-500' : 'text-slate-400 dark:text-slate-500'}`} />
                           <input
                              ref={inputRefKeyword}
                              type="text"
                              className="w-full bg-transparent border-none p-0 text-base font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 outline-none leading-none tracking-tight cursor-pointer"
                              placeholder="Select Category..."
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                              onFocus={() => setFocusedField('keyword')}
                              autoComplete="off"
                            />
                            <IconChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${focusedField === 'keyword' ? 'rotate-180 text-primary-500' : 'text-slate-400 dark:text-slate-500'}`} />
                        </div>
                  </div>
              </motion.div>

              {/* Vertical Divider */}
              <motion.div
                layout
                animate={{
                    opacity: focusedField ? 0 : 0.2,
                    scaleY: focusedField ? 0 : 1
                }}
                className="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"
              ></motion.div>
              <div className="md:hidden h-px w-full bg-slate-200 dark:bg-slate-800 my-2"></div>

              {/* Location Input */}
              <motion.div
                  layout
                  className="relative group px-4 py-1.5 cursor-text rounded-3xl md:rounded-r-full md:mr-1 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors duration-300"
                  onClick={() => inputRefCity.current?.focus()}
                  animate={getFieldStyle(focusedField === 'city', focusedField === 'keyword')}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                    <div className="flex flex-col items-start justify-center h-full relative">
                        <div className="flex items-center gap-2 mb-0">
                             <label className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${focusedField === 'city' ? 'text-primary-500' : 'text-slate-500 dark:text-slate-400'}`}>Location</label>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <IconMapPin className={`w-3.5 h-3.5 transition-colors ${focusedField === 'city' ? 'text-primary-500' : 'text-slate-400 dark:text-slate-500'}`} />
                            <input
                                  ref={inputRefCity}
                                  type="text"
                                  className="w-full bg-transparent border-none p-0 text-base font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 outline-none leading-none tracking-tight"
                                  placeholder="Type city name..."
                                  value={city}
                                  onChange={handleCityChange}
                                  onFocus={() => setFocusedField('city')}
                                  autoComplete="off"
                                />
                        </div>
                  </div>
                  <AnimatePresence>
                    {focusedField === 'city' && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-[120%] left-0 w-full min-w-[280px] max-h-[300px] overflow-y-auto p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl z-50 text-left"
                      >
                        {isLoadingCities && (
                          <div className="flex items-center justify-center py-4">
                            <div className="w-5 h-5 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                          </div>
                        )}

                        {!isLoadingCities && citySuggestions.length > 0 && (
                          <>
                            <div className="px-4 py-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                              {city.length >= 2 ? 'Matching Cities' : 'Popular Locations'}
                            </div>
                            {citySuggestions.map((item) => (
                              <motion.button
                                key={item.placeId}
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleCitySelect(item.description); }}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-3 group/item"
                                whileHover={{ x: 4 }}
                              >
                                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover/item:text-primary-500 group-hover/item:bg-primary-500/10 transition-colors">
                                  <IconMapPin className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-slate-900 dark:text-white">{item.mainText}</span>
                                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.secondaryText}</span>
                                </div>
                              </motion.button>
                            ))}
                          </>
                        )}

                        {!isLoadingCities && citySuggestions.length === 0 && city.length < 2 && (
                          <div className="px-4 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                            Start typing a city name...
                          </div>
                        )}

                        {!isLoadingCities && citySuggestions.length === 0 && city.length >= 2 && (
                          <div className="px-4 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                            No cities found. Try a different search.
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
              </motion.div>

              {/* Search Button */}
              <button
                  type="submit"
                  className="hidden md:flex bg-primary-500 hover:bg-primary-400 text-white rounded-full w-10 h-10 items-center justify-center transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 active:scale-95 z-30 relative overflow-hidden group/btn"
              >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                      <IconSearch className="w-4 h-4" />
                  )}
              </button>

               {/* Mobile Search Button */}
              <button
                  type="submit"
                  className="md:hidden w-full mt-2 bg-primary-500 hover:bg-primary-400 text-white rounded-2xl p-3 font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                  {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <IconSearch className="w-5 h-5" />
                      Search
                    </>
                  )}
              </button>

                  <AnimatePresence>
                    {focusedField === 'keyword' && (
                      <motion.div
                        variants={centeredDropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-[120%] left-1/2 w-[92vw] max-w-5xl overflow-y-auto p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl z-50 text-left min-h-[300px]"
                      >
                         <div className="px-2 py-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10 mx-1">
                           {keyword.length > 0 ? 'Matching Categories' : 'Browse Categories'}
                         </div>
                        {filteredCategories.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                           {filteredCategories.map((item) => (
                            <motion.button
                              key={item.name}
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleCategorySelect(item.name); }}
                              className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-2.5 group/item border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover/item:text-primary-500 group-hover/item:bg-primary-500/10 transition-colors shrink-0">
                                 {item.icon}
                              </div>
                              <span className="truncate">{item.name}</span>
                              {item.isPremium && (
                                <div className="ml-auto w-5 h-5 flex items-center justify-center text-amber-500" title="Premium Category">
                                   <IconCrown className="w-3.5 h-3.5 fill-current" />
                                </div>
                              )}
                            </motion.button>
                          ))}
                          </div>
                        ) : (
                          <div className="px-4 py-3">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">No matching categories. You can search for:</p>
                            <p className="text-sm font-semibold text-primary-500">"{keyword}"</p>
                            <button
                              type="button"
                              onClick={() => { setFocusedField(null); inputRefCity.current?.focus(); setFocusedField('city'); }}
                              className="mt-2 text-xs text-primary-500 hover:text-primary-400 font-medium"
                            >
                              Continue with this category →
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
            </form>
        </motion.div>

        {/* Results Interface */}
        <AnimatePresence>
        {(hasSearched || loading) && (
          <motion.div
             initial={{ opacity: 0, y: 40, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 20, scale: 0.95 }}
             transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative mx-auto max-w-6xl text-left pb-20"
          >
            <div className="rounded-3xl bg-white dark:bg-[#0f172a] backdrop-blur-xl shadow-2xl dark:shadow-black/50 ring-1 ring-slate-200 dark:ring-white/10 overflow-hidden min-h-[500px] flex flex-col border border-slate-100 dark:border-white/5 relative transition-colors duration-300">
              {/* Top Highlight Line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] px-6 py-4 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                   </div>
                   <div className="h-4 w-px bg-slate-300 dark:bg-white/10 ml-2"></div>
                   <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <IconActivity className="w-3 h-3 text-primary-500 dark:text-primary-400" />
                      {loading ? 'STATUS: SCANNING' : `STATUS: COMPLETE (${leads.length} TOTAL)`}
                   </div>
                </div>

                {!loading && leads.length > 0 && (
                  <div className="flex items-center gap-3">
                    {/* Filter Toggle */}
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 rounded-lg p-1 text-xs">
                      <button
                        onClick={() => setShowOnlyNoWebsite(false)}
                        className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                          !showOnlyNoWebsite
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        All ({leads.length})
                      </button>
                      <button
                        onClick={() => setShowOnlyNoWebsite(true)}
                        className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                          showOnlyNoWebsite
                            ? 'bg-primary-500 text-white shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                      >
                        No Website ({leadsWithoutWebsite})
                      </button>
                    </div>

                    <button
                      onClick={() => exportToCSV(filteredLeads)}
                      className="flex items-center gap-2 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:text-primary-800 dark:hover:text-primary-200 transition-all border border-primary-200 dark:border-primary-500/20 shadow-sm"
                    >
                      <IconFileDown className="w-3.5 h-3.5" />
                      Download CSV
                    </button>
                  </div>
                )}
              </div>

              {/* Stats Bar */}
              {!loading && leads.length > 0 && (
                <div className="flex items-center gap-6 px-6 py-3 bg-slate-50/50 dark:bg-white/[0.01] border-b border-slate-200 dark:border-white/5 text-xs">
                  {/* Search Mode Badge */}
                  {(subscriptionTier === 'pro' || subscriptionTier === 'business') ? (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                      <IconZap className="w-3 h-3 text-amber-500" />
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">Pro Search</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Basic Search</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-600 dark:text-slate-400">
                      <strong className="text-emerald-600 dark:text-emerald-400">{leadsWithoutWebsite}</strong> without website (leads!)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span className="text-slate-600 dark:text-slate-400">
                      <strong>{leadsWithWebsite}</strong> with website
                    </span>
                  </div>
                  {(subscriptionTier === 'free' || subscriptionTier === 'starter') && (
                    <div className="ml-auto text-[10px] text-slate-400 dark:text-slate-500">
                      <span className="text-primary-500 hover:underline cursor-pointer" onClick={() => window.scrollTo({ top: document.getElementById('pricing')?.offsetTop || 0, behavior: 'smooth' })}>
                        Upgrade to Pro for 3x more results →
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Content Area */}
              <div className="flex-1 relative bg-white dark:bg-transparent transition-colors">
                 {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/50 dark:bg-[#020617]/50 backdrop-blur-sm">
                       <div className="flex flex-col items-center gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary-500/30 dark:border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <IconSearch className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                            </div>
                          </div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">
                            {(subscriptionTier === 'pro' || subscriptionTier === 'business')
                              ? `Deep scanning ${city} area (Pro)...`
                              : `Scanning ${city} area...`
                            }
                          </span>
                          {(subscriptionTier === 'pro' || subscriptionTier === 'business') && (
                            <span className="text-xs text-slate-400 dark:text-slate-500">Running comprehensive search for more results</span>
                          )}
                       </div>
                    </div>
                 )}

                 {!loading && filteredLeads.length === 0 && leads.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                       <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-6 ring-1 ring-slate-200 dark:ring-white/10 shadow-lg">
                         <IconSearch className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                       </div>
                       <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-2">No results found</h3>
                       <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">We couldn't find any businesses matching "{keyword}" in "{city}". Try a different category or location.</p>
                    </div>
                 )}

                 {!loading && filteredLeads.length === 0 && leads.length > 0 && showOnlyNoWebsite && (
                    <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                       <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-6 ring-1 ring-emerald-200 dark:ring-emerald-500/20 shadow-lg">
                         <IconGlobe className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
                       </div>
                       <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-2">All businesses have websites!</h3>
                       <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-4">
                         We found {leads.length} businesses, but they all have websites already.
                       </p>
                       <button
                         onClick={() => setShowOnlyNoWebsite(false)}
                         className="text-primary-500 hover:text-primary-400 font-semibold text-sm flex items-center gap-2"
                       >
                         View all {leads.length} results anyway
                         <IconArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                 )}

                 {filteredLeads.length > 0 && (
                   <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm border-collapse">
                       <thead>
                         <tr className="border-b border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider bg-slate-50 dark:bg-white/[0.02]">
                           <th className="px-6 py-4 font-medium pl-8">Business Info</th>
                           <th className="px-6 py-4 font-medium">Location</th>
                           <th className="px-6 py-4 font-medium">Web Status</th>
                           <th className="px-6 py-4 font-medium text-right pr-8">Link</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                         {filteredLeads.map((row, i) => (
                           <motion.tr
                              key={row.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="group transition-all duration-300 hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:shadow-[0_0_30px_-5px_rgba(253,107,46,0.15)] dark:hover:shadow-[0_0_30px_-5px_rgba(253,107,46,0.1)] relative hover:z-10"
                           >
                             <td className="px-6 py-4 pl-8">
                                <div className="flex flex-col gap-1">
                                   <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-base">{row.business_name}</span>
                                   <div className="flex items-center gap-2">
                                     {subscriptionTier === 'free' || subscriptionTier === 'starter' ? (
                                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded cursor-help" title="Upgrade to view phone number">
                                          <IconLock className="w-3 h-3 text-slate-400" />
                                          <span className="text-xs text-slate-400 font-mono blur-[3px] select-none">+1 (555) 000-0000</span>
                                        </div>
                                     ) : (
                                        <span className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded">{row.phone}</span>
                                     )}
                                     <span className="text-xs text-slate-500 dark:text-slate-500">{row.category}</span>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-slate-500 dark:text-slate-400 max-w-xs truncate">
                                {subscriptionTier === 'free' || subscriptionTier === 'starter' ? (
                                   <div className="flex items-center gap-2 cursor-help" title="Upgrade to view location">
                                      <IconLock className="w-3 h-3 text-slate-400 shrink-0" />
                                      <span className="blur-[4px] select-none">123 Hidden Business St, City, State</span>
                                   </div>
                                ) : (
                                   row.address
                                )}
                             </td>
                             <td className="px-6 py-4">
                               <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 shadow-sm dark:shadow-[0_0_10px_rgba(244,63,94,0.1)]">
                                 <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                                 No Website
                               </span>
                             </td>
                             <td className="px-6 py-4 text-right pr-8">
                                {subscriptionTier === 'free' || subscriptionTier === 'starter' ? (
                                   <button
                                     className="inline-flex items-center gap-1 text-slate-400 dark:text-slate-600 font-medium text-xs bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5 cursor-not-allowed opacity-70"
                                     title="Upgrade to view map"
                                   >
                                     <IconLock className="w-3 h-3" />
                                     Open Maps
                                   </button>
                                ) : (
                                   <a
                                     href={row.google_maps_url}
                                     target="_blank"
                                     rel="noreferrer"
                                     className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-xs transition-colors bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5"
                                   >
                                     Open Maps
                                     <IconArrowRight className="w-3 h-3" />
                                   </a>
                                )}
                             </td>
                           </motion.tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                 )}
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
