import React from 'react';
import { motion } from "framer-motion";
import { Heart, Mail, Linkedin, Github, Globe } from "lucide-react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 border-t border-purple-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main footer content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                    {/* Brand column */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center md:text-left"
                    >
                        <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 mb-3">
                            <Globe size={16} className="mr-2 text-purple-700" />
                            <span className="text-sm font-medium text-purple-700">Multilingual Portfolio Project</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Global <span className="text-purple-600">Feedback</span> Analyzer
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Breaking language barriers with AI-powered feedback analysis in any language.
                        </p>
                    </motion.div>

                    {/* Connect column */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center md:text-right"
                    >
                        <h4 className="font-semibold text-gray-800 mb-3">Connect With Me</h4>
                        <div className="flex items-center justify-center md:justify-end space-x-4">
                            <a
                                href="https://github.com/MSK2918"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm hover:bg-purple-100 transition-colors duration-200"
                                aria-label="GitHub"
                            >
                                <Github size={20} className="text-gray-700" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/susheel-panchabhai-958074295"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm hover:bg-purple-100 transition-colors duration-200"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} className="text-gray-700" />
                            </a>
                            <a
                                href="mailto:susheelpanchabhai@gmail.com"
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm hover:bg-purple-100 transition-colors duration-200"
                                aria-label="Email"
                            >
                                <Mail size={20} className="text-gray-700" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Language indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-2 mb-6"
                >
                    {['EN', 'ES', 'FR', 'DE', 'ZH', 'JA', 'RU', 'AR', 'HI'].map((lang) => (
                        <span key={lang} className="text-xs bg-white px-2 py-1 rounded shadow-sm text-gray-600">
                            {lang}
                        </span>
                    ))}
                    <span className="text-xs bg-purple-100 px-2 py-1 rounded shadow-sm text-purple-700">
                        100+ languages
                    </span>
                </motion.div>

                {/* Bottom section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="border-t border-purple-100 pt-6 flex flex-col sm:flex-row justify-between items-center"
                >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start">
                        <p className="text-gray-500 text-sm mb-2 sm:mb-0 sm:mr-4">
                            &copy; {currentYear} Multilingual Feedback Analyzer. All rights reserved.
                        </p>
                        <div className="flex items-center text-sm text-purple-600 font-medium">
                            <span>Made with</span>
                            <Heart size={16} className="mx-1 text-red-500 fill-red-500" />
                            <span>by Susheel</span>
                        </div>
                    </div>
                    <div className="flex space-x-6 mt-4 sm:mt-0">
                        <a href="#" className="text-gray-500 hover:text-purple-700 transition-colors duration-200 text-sm">Privacy</a>
                        <a href="#" className="text-gray-500 hover:text-purple-700 transition-colors duration-200 text-sm">Terms</a>
                        <a href="#" className="text-gray-500 hover:text-purple-700 transition-colors duration-200 text-sm">Contact</a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

export default Footer;