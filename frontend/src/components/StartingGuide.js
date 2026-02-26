import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const StartingGuide = ({ nodesCount }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (nodesCount > 0) {
            setIsVisible(false);
        }
    }, [nodesCount]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-white/30 backdrop-blur-[0.5px]" />


                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0.6, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="absolute left-4 top-4"
                        >
                            <div className="border border-slate-300/50 rounded-lg p-2 bg-white/40 backdrop-blur-sm">
                                <div className="w-5 h-5 border border-slate-400/30 rounded"></div>
                            </div>
                        </motion.div>


                        <motion.div
                            initial={{ x: 120, y: -40 }}
                            animate={{
                                x: [120, 280, 280, 120],
                                y: [-40, 220, 280, -40],
                            }}
                            transition={{
                                duration: 3,
                                times: [0, 0.4, 0.7, 1],
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatDelay: 0.5
                            }}
                            className="absolute top-0 left-0 z-[100] text-slate-800"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                                <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4-4.4 4.8z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                        </motion.div>


                        <motion.div
                            initial={{ x: 100, y: -60, scale: 0.9 }}
                            animate={{
                                x: [100, 260, 260, 100],
                                y: [-60, 200, 260, -60],
                                scale: [0.9, 1, 1, 0.9],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 3,
                                times: [0, 0.4, 0.7, 1],
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatDelay: 0.5
                            }}
                            className="absolute top-0 left-0"
                        >
                            <div className="relative bg-white border-2 border-slate-200 rounded-lg shadow-2xl w-56 overflow-hidden">
                                <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="text-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Input</span>
                                    </div>
                                    <div className="w-3.5 h-3.5 rounded-full bg-slate-200"></div>
                                </div>

                                <div className="p-4 flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        <div className="w-10 h-2.5 bg-slate-200 rounded"></div>
                                        <div className="w-full h-8 bg-slate-100 border border-slate-200 rounded-md"></div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="w-10 h-2.5 bg-slate-200 rounded"></div>
                                        <div className="w-full h-8 bg-slate-100 border border-slate-200 rounded-md"></div>
                                    </div>
                                </div>

        
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                                    <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-400 bg-white"></div>
                                </div>
                            </div>
                        </motion.div>


                        <motion.div
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.15 }}
                            transition={{ delay: 1, duration: 1.5 }}
                            className="absolute top-0 left-0 w-[80px] h-[80px] pointer-events-none"
                        >
                            <svg width="40%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                                <path
                                    d="M 130,-10 L 300,250 L 300,300"
                                    stroke="#94a3b8"
                                    strokeWidth="1"
                                    fill="none"
                                    strokeDasharray="4,4"
                                    opacity="0.2"
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};