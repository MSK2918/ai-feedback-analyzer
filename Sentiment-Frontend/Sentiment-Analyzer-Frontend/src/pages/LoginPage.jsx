import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import Footer from "./Footer"
import About from "./About"
import { LOGIN_URL } from "../api/baseUrl";

const LoginPage = () => {
    const handleRedirect = () => {
        window.location.href = `${LOGIN_URL}`;
    }



    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
                {/* Left Column - Branding */}
                <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-16 flex flex-col justify-center items-center md:items-start">
                    <div className="max-w-md mx-auto md:mx-0 md:pr-4 w-full">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 mb-4">
                                <Globe size={16} className="mr-2 text-purple-700" />
                                <span className="text-sm font-medium text-purple-700">Multilingual Analysis</span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                                Global <span className="text-purple-600">Feedback</span> Analyzer
                            </h1>

                            <h2 className="text-lg sm:text-xl text-indigo-700 mb-4">
                                Understand user sentiment in any language with precision and clarity.
                            </h2>

                            <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
                                Break language barriers and transform feedback from around the world into actionable insights.
                                Identify trends, spot issues early, and make data-driven decisions to improve your product
                                across all markets.
                            </p>

                            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                                {[
                                    { title: "Languages", value: "100+" },
                                    { title: "Processing", value: "<2s" },
                                    { title: "Accuracy", value: "96%" }
                                ].map((stat, index) => (
                                    <div key={index} className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-sm">
                                        <p className="text-purple-700 font-bold text-base sm:text-lg">{stat.value}</p>
                                        <p className="text-gray-500 text-xs sm:text-sm">{stat.title}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Column - Login */}
                <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-12 lg:p-16 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full max-w-md"
                    >
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="py-6 sm:py-8 px-4 sm:px-6 md:px-10 space-y-4 sm:space-y-6">
                                <div className="space-y-2">
                                    <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                            <path d="M2 12h20" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">Access Global Insights</h2>
                                    <p className="text-center text-gray-500 text-sm sm:text-base">Login to analyze feedback in any language</p>
                                </div>

                                <div className="pt-2 sm:pt-4 space-y-3 sm:space-y-4">
                                    <button className="w-full py-2 sm:py-3 px-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 group relative overflow-hidden shadow-sm" onClick={handleRedirect}>
                                        <div className="absolute inset-0 w-3 bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-10"></div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px" className="sm:w-6 sm:h-6">
                                            <path
                                                fill="#FFC107"
                                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                            />
                                            <path
                                                fill="#FF3D00"
                                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                            />
                                            <path
                                                fill="#4CAF50"
                                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                            />
                                            <path
                                                fill="#1976D2"
                                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                            />
                                        </svg>
                                        <span className="font-medium text-sm sm:text-base">Continue with Google</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </button>

                                    <div className="relative">
                                        <p className="text-xs text-center text-gray-500 mt-2">Secure login powered by Google OAuth2.</p>
                                    </div>

                                    <div className="border-t pt-3 sm:pt-4 mt-2 sm:mt-3">
                                        <p className="text-xs sm:text-sm text-center text-gray-600 flex items-center justify-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-blue-500 sm:w-4 sm:h-4"
                                            >
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                            Your data is private and secure across all languages.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <About />
            <Footer />
        </>
    );
};

export default LoginPage;