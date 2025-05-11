import React from 'react';
import { motion } from "framer-motion";
import { BookOpen, Users, Target } from "lucide-react";
import Illustration from '../assets/loginImage.png';

function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-16 px-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 mb-4"
                >
                    <BookOpen size={16} className="mr-2 text-purple-700" />
                    <span className="text-sm font-medium text-purple-700">My Project</span>
                </motion.div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                    About <span className="text-purple-600">Multilingual Feedback Analyzer</span>
                </h1>
                <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
                    The multilingual analysis engine leverages advanced Python NLP libraries to detect emotional tone, urgency, and feature requests across various languages—converting global user feedback into actionable insights for product teams.
                </p>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl opacity-20 blur-lg"></div>
                            <div className="relative overflow-hidden rounded-xl shadow-xl">
                                <img
                                    src={Illustration}
                                    alt="Multilingual Feedback Analyzer visualization"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                            Showcasing Modern Full-Stack & NLP Capabilities
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            <span className="font-bold">Multilingual Feedback Analyzer</span> showcases my expertise in modern web technologies, natural language processing, and scalable deployment strategies. This application processes user feedback in any language, extracting sentiment patterns and valuable insights without linguistic limitations.
                        </p>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            The frontend is built with <span className="font-bold">React.js</span> and deployed on <span className="font-bold">Netlify</span>. The backend is architected as microservices using <span className="font-bold">Spring Boot</span> and <span className="font-bold">FastAPI</span>, both containerized with <span className="font-bold">Docker</span> for portability and scalability. These containers are built into images and deployed on <span className="font-bold">Railway</span>, ensuring a seamless CI/CD workflow. For data persistence, the system uses <span className="font-bold">MySQL</span>, while <span className="font-bold">Redis</span> is integrated to enhance API performance through intelligent caching and rapid data retrieval.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { icon: <Users className="text-purple-700" />, title: "Full-Stack", desc: "React.js frontend with Spring Boot & FastAPI backends" },
                                { icon: <Target className="text-purple-700" />, title: "Multilingual", desc: "Language-agnostic sentiment analysis capabilities" },
                                { icon: <BookOpen className="text-purple-700" />, title: "Data-Driven", desc: "MySQL database with comprehensive analytics" },
                            ].map((feature, index) => (
                                <div key={index} className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-medium text-gray-800 mb-1">{feature.title}</h3>
                                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default About;