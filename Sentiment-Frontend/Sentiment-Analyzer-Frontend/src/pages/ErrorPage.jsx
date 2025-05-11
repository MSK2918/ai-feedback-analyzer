import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Home, Search, ArrowRight } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';

function ErrorPage() {

  const [isPresent, setIsPresent] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  const handleNavigation = () => {
    if (isAuthenticated) {
      setIsPresent(true);
      navigate('/');
    } else {
      setIsPresent(false);
      navigate('/login');
    }
  }




  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 text-gray-800 flex flex-col justify-center items-center px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        {/* Animated Elements */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Abstract shapes */}
          <motion.div
            className="absolute top-0 right-1/4 h-20 w-20 rounded-full bg-purple-200 opacity-60 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
              x: [0, 5, 0],
              y: [0, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-10 left-1/3 h-16 w-16 rounded-full bg-blue-200 opacity-60 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0],
              x: [0, -8, 0],
              y: [0, 8, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-5 right-1/3 h-12 w-12 rounded-full bg-indigo-200 opacity-60 blur-xl"
            animate={{
              scale: [1, 1.15, 1],
              x: [0, 8, 0],
              y: [0, 5, 0]
            }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
          />

          {/* 404 Text */}
          <div className="relative">
            <motion.h1
              className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: 0.2
              }}
            >
              404
            </motion.h1>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Page Not <span className="text-purple-600">Found</span>
          </h2>
          <p className="text-indigo-700 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>



          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNavigation}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg flex items-center justify-center"
            >
              {
                isPresent === true ? (
                  <>
                    Go back
                  </>

                ) : (
                  <>
                    Go back
                  </>
                )
              }
            </motion.button>

          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-5 text-sm text-indigo-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Let's find your way back together
      </motion.div>
    </div>
  );
}

export default ErrorPage;