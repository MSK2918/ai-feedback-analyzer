import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from "recharts";
import {
  LayoutDashboard,
  Send,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Clock,
  Loader2
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/userApi';
import { sendFeedbackToSpringBootAndFastApi, getRecentFeedbacks } from '../api/feedbackApi';

const DashboardContent = () => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [chartKey, setChartKey] = useState(0); // Key to force chart re-render
  const [sentimentScore, setSentimentScore] = useState([
    { name: 'Positive', value: 0, color: "#8b5cf6" },
    { name: 'Neutral', value: 0, color: "#a5b4fc" },
    { name: 'Negative', value: 0, color: "#e0e7ff" }
  ]);

  const [sentimentData, setSentimentData] = useState([]);


  const sentimentEmojis = {
    Positive: {
      emoji: "😄",
      animation: {
        y: [0, -10, 0],
        rotate: [0, 5, 0, -5, 0],
        scale: [1, 1.2, 1.1, 1.2, 1],
        filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1]
      },
      secondaryEmoji: "✨",
      secondaryAnimation: {
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 0.5],
        x: [-15, 15, -15],
        y: [-5, -15, -5]
      }
    },
    Neutral: {
      emoji: "😐",
      animation: {
        rotate: [-5, 0, 5, 0, -5],
        scale: [1, 1.03, 1.05, 1.03, 1],
        x: [-2, 0, 2, 0, -2]
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      },
      pulseEffect: {
        boxShadow: [
          "0 0 0 rgba(204, 204, 204, 0)",
          "0 0 15px rgba(204, 204, 204, 0.7)",
          "0 0 0 rgba(204, 204, 204, 0)"
        ],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }
      }
    },
    Negative: {
      emoji: "😔",
      animation: {
        y: [0, 3, 0, 2, 0],
        x: [-3, 0, 3, 0, -3],
        rotate: [-3, 0, 3, 0, -3],
        filter: ["grayscale(0.3)", "grayscale(0.5)", "grayscale(0.3)"]
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      },
      rainEffect: {
        enabled: true,
        droplets: [
          { x: -10, delay: 0, speed: 0.8 },
          { x: 5, delay: 1.2, speed: 1 },
          { x: 10, delay: 0.5, speed: 0.9 }
        ],
        animation: {
          y: [-5, 20],
          opacity: [0, 1, 0]
        },
        transition: {
          duration: 2,
          repeat: Infinity
        }
      }
    },
    Excited: {
      emoji: "🤩",
      animation: {
        rotate: [-10, 10, -10],
        scale: [1, 1.3, 0.9, 1.3, 1],
        y: [0, -15, -5, -15, 0]
      },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: [0.42, 0, 0.58, 1], // Custom cubic bezier for more bounce
        times: [0, 0.25, 0.5, 0.75, 1]
      },
      particleEffect: {
        enabled: true,
        count: 5,
        colors: ["#FFD700", "#FF6347", "#00CED1", "#FF69B4"],
        animation: {
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          rotate: [0, 180, 360]
        }
      }
    },
    Surprised: {
      emoji: "😲",
      animation: {
        scale: [1, 1.5, 1],
        rotate: [0, 0, 0],
        filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
      },
      transition: {
        duration: 0.7,
        repeat: 3,
        repeatDelay: 0.5,
        ease: "backOut"
      },
      shockwaveEffect: {
        enabled: true,
        rings: 3,
        animation: {
          scale: [1, 2.5],
          opacity: [0.7, 0]
        },
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatDelay: 0.5,
          staggerChildren: 0.2
        }
      }
    },
    Angry: {
      emoji: "😠",
      animation: {
        rotate: [-8, 0, 8, 0, -8],
        scale: [1, 1.1, 1, 1.1, 1],
        x: [-4, 4, -4, 4, -4],
        filter: ["brightness(1)", "brightness(1.2) saturate(1.5)", "brightness(1)"]
      },
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      },
      heatEffect: {
        enabled: true,
        animation: {
          boxShadow: [
            "0 0 0 rgba(255, 59, 48, 0)",
            "0 0 20px rgba(255, 59, 48, 0.7)",
            "0 0 0 rgba(255, 59, 48, 0)"
          ]
        },
        transition: {
          duration: 1.5,
          repeat: Infinity
        }
      }
    }
  };



  // Form validation schema with zod
  const schema = z.object({
    feedbackText: z.string()
      .min(10, { message: "Feedback must contain at least 10 characters" })
      .max(150, { message: "Feedback must contain at most 150 characters" })
  });

  // Initialize react-hook-form with zod resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmitData = async (data) => {
    try {
      setIsLoading(true); // Start loading animation
      setShowResults(false); // Hide any previous results

      const user = await getUser();
      if (user) {
        // Process the data and update sentiment score
        const response = await sendFeedbackToSpringBootAndFastApi(data);

        // Create new sentiment score array (create new object references)
        const newSentimentScore = [
          {
            name: 'Positive',
            value: response.positiveScore * 100,
            color: "#8b5cf6"
          },
          {
            name: 'Neutral',
            value: response.neutralScore * 100,
            color: "#a5b4fc"
          },
          {
            name: 'Negative',
            value: response.negativeScore * 100,
            color: "#e0e7ff"
          }
        ];

        // Update chart key with a truly unique value
        const newKey = Date.now(); // Use timestamp for guaranteed uniqueness
        setChartKey(newKey);

        // Set sentiment score with new object references
        setSentimentScore(newSentimentScore);

        // Brief delay before showing results to ensure smooth transitions
        setTimeout(() => {
          setIsLoading(false); // Stop loading
          setShowResults(true);
          reset();
          fetchRecentFeedbacks();
        }, 800);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      // Handle error (e.g., show a toast notification)
      // console.error("Error submitting feedback:", error);
      // toast.error("Failed to submit feedback. Please try again later.");
      setIsLoading(false);
    }
  };

  const fetchRecentFeedbacks = async () => {
    try {
      const response = await getRecentFeedbacks(0, 3);
      setSentimentData(response);
    } catch (error) {
      // Handle error (e.g., show a toast notification)
      // console.error("Error fetching recent feedbacks:", error);
      // toast.error("Failed to fetch recent feedbacks. Please try again later.");
    }
  };


  useEffect(() => {
    const getAuthenticatedUser = async () => {
      try {
        const response = await getUser();
        if (response && response.name) {
          setName(response.name);
        }
      } catch (error) {
        // Handle error (e.g., show a toast notification)
        // console.error("Error fetching user:", error);
      }
    };

    getAuthenticatedUser();
    fetchRecentFeedbacks();
  }, []);



  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8">
      {/* Header with user greeting and profile avatar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <div className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 sm:px-3 sm:py-1 mb-2">
              <LayoutDashboard size={14} className="mr-1 sm:mr-2 text-purple-700" />
              <span className="text-xs sm:text-sm font-medium text-purple-700">Dashboard</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Welcome
              {name && <span className="text-purple-600">{' '}{name.split(' ')[0]}!</span>}
            </h1>
            <p className="text-sm sm:text-base text-indigo-700 mt-1">
              Analyze your feedback sentiment in real-time
            </p>
          </div>

          <div className="flex items-center">
            <div className="inline-flex bg-purple-50 rounded-lg p-1">
              <div className="flex flex-wrap gap-1">
                <span className="text-xs text-purple-700 bg-purple-100 px-2 sm:px-3 py-1 rounded-md">
                  96% Accuracy
                </span>
                <span className="text-xs text-indigo-700 px-2 sm:px-3 py-1">
                  Real-time Analysis
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Feedback Input Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md overflow-hidden order-1 md:order-1"
        >
          <div className="p-4 sm:p-6">
            <div className="flex items-center mb-3 sm:mb-4">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-2" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Submit Feedback</h2>
            </div>

            <form onSubmit={handleSubmit(handleSubmitData)}>
              <div className="mb-4">
                <textarea
                  {...register("feedbackText")}
                  className="w-full resize-none h-32 sm:h-40 p-3 sm:p-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter your feedback here..."
                ></textarea>
                {errors.feedbackText && (
                  <p className='text-red-500 text-xs sm:text-sm mt-1'>
                    {errors.feedbackText.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="inline-flex items-center px-3 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg text-sm sm:font-medium text-white shadow-sm transition-all disabled:opacity-70"
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-1.5 sm:mr-2 animate-spin" />
                      <span className="sm:inline">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-1.5 sm:mr-2" />
                      <span className="sm:inline">Analyze Sentiment</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Results Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden order-2 md:order-2 w-full"
        >
          <div className="p-3 sm:p-6">
            <div className="flex items-center mb-2 sm:mb-4">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-1 sm:mr-2" />
              <h2 className="text-base sm:text-xl font-semibold text-gray-800">Sentiment Analysis</h2>
            </div>

            {isLoading ? (
              // Loading Animation - with responsive heights
              <div className="flex flex-col items-center justify-center h-40 sm:h-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="mb-3 sm:mb-4"
                >
                  <Loader2 size={24} className="text-purple-500 sm:h-9 sm:w-9" />
                </motion.div>
                <p className="text-sm sm:text-base text-gray-600 font-medium">Analyzing sentiment...</p>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "60%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-3 sm:mt-4 w-1/2"
                />
              </div>
            ) : showResults ? (
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Chart Container - Responsive height */}
                <div className="h-40 sm:h-56 w-full max-w-full overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentScore}
                        cx="50%"
                        cy="50%"
                        innerRadius={window.innerWidth < 640 ? 30 : 50}
                        outerRadius={window.innerWidth < 640 ? 50 : 80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          window.innerWidth < 640
                            ? `${(percent * 100).toFixed(0)}%`
                            : `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={window.innerWidth >= 640}
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {sentimentScore.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                      <Legend
                        verticalAlign="bottom"
                        height={24}
                        iconSize={window.innerWidth < 640 ? 8 : 10}
                        formatter={(value) => <span className="text-xs sm:text-sm">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Sentiment Statistics with Animated Emojis - Made responsive */}
                <motion.div
                  className="grid grid-cols-3 gap-1 sm:gap-3 mt-2 sm:mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {/* Positive Card */}
                  <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center justify-center mb-0.5 sm:mb-1">
                      <ThumbsUp size={window.innerWidth < 640 ? 10 : 14} className="text-purple-600 mr-0.5 sm:mr-1" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Positive</span>
                    </div>
                    <div className="flex justify-center my-0.5 sm:my-1">
                      <motion.div
                        className="text-lg sm:text-2xl"
                        animate={sentimentEmojis.Positive.animation}
                        transition={sentimentEmojis.Positive.transition}
                      >
                        {sentimentEmojis.Positive.emoji}
                      </motion.div>
                    </div>
                    <p className="text-sm sm:text-lg font-bold text-gray-800">
                      {sentimentScore.find(item => item.name === 'Positive')?.value.toFixed(1)}%
                    </p>
                  </div>

                  {/* Neutral Card */}
                  <div className="bg-indigo-50 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center justify-center mb-0.5 sm:mb-1">
                      <Minus size={window.innerWidth < 640 ? 10 : 14} className="text-indigo-600 mr-0.5 sm:mr-1" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Neutral</span>
                    </div>
                    <div className="flex justify-center my-0.5 sm:my-1">
                      <motion.div
                        className="text-lg sm:text-2xl"
                        animate={sentimentEmojis.Neutral.animation}
                        transition={sentimentEmojis.Neutral.transition}
                      >
                        {sentimentEmojis.Neutral.emoji}
                      </motion.div>
                    </div>
                    <p className="text-sm sm:text-lg font-bold text-gray-800">
                      {sentimentScore.find(item => item.name === 'Neutral')?.value.toFixed(1)}%
                    </p>
                  </div>

                  {/* Negative Card */}
                  <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
                    <div className="flex items-center justify-center mb-0.5 sm:mb-1">
                      <ThumbsDown size={window.innerWidth < 640 ? 10 : 14} className="text-blue-600 mr-0.5 sm:mr-1" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Negative</span>
                    </div>
                    <div className="flex justify-center my-0.5 sm:my-1">
                      <motion.div
                        className="text-lg sm:text-2xl"
                        animate={sentimentEmojis.Negative.animation}
                        transition={sentimentEmojis.Negative.transition}
                      >
                        {sentimentEmojis.Negative.emoji}
                      </motion.div>
                    </div>
                    <p className="text-sm sm:text-lg font-bold text-gray-800">
                      {sentimentScore.find(item => item.name === 'Negative')?.value.toFixed(1)}%
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 sm:h-64 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Sparkles size={window.innerWidth < 640 ? 24 : 36} className="text-purple-400 mb-2 sm:mb-4 opacity-70" />
                </motion.div>
                <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">Enter your feedback and click analyze</p>
                <p className="text-xs sm:text-sm text-gray-500">Results will appear here</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Feedback Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2 order-3"
        >
          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between mb-3 sm:mb-4 gap-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-1.5 sm:mr-2 flex-shrink-0" />
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Recent Feedback History</h2>
              </div>
              <button
                className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                onClick={() => navigate('/history')}
              >
                View All
              </button>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {sentimentData.length > 0 ? (
                sentimentData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border-l-4 rounded-r-lg p-2 sm:p-3 md:p-4"
                    style={{
                      borderLeftColor: item.sentiment === "Positive" ? "#8b5cf6" :
                        item.sentiment === "Neutral" ? "#a5b4fc" : "#93c5fd"
                    }}
                  >
                    <div className="flex flex-col xs:flex-row justify-between items-start gap-1 xs:items-center mb-1 sm:mb-2">
                      <span
                        className="inline-flex items-center text-xs font-medium rounded-full px-2 py-0.5"
                        style={{
                          backgroundColor: item.sentiment === "Positive" ? "#f3e8ff" :
                            item.sentiment === "Neutral" ? "#e0e7ff" : "#dbeafe",
                          color: item.sentiment === "Positive" ? "#7e22ce" :
                            item.sentiment === "Neutral" ? "#4338ca" : "#2563eb"
                        }}
                      >
                        {item.sentiment}
                      </span>
                      <span className="text-xs xs:text-xs text-gray-500">{item.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 break-words">{item.feedbackText}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs sm:text-sm text-gray-500 text-center py-4 sm:py-6">No feedback history available</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardContent;