// import React, { useState, useEffect } from 'react';
// import { motion } from "framer-motion";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from "recharts";
// import {
//   Clock,
//   ArrowUpDown,
//   ThumbsUp,
//   FileText,
//   ChevronLeft,
//   ChevronRight,
//   Trash2,
//   AlertTriangle,
//   BarChart2,
// } from "lucide-react";

// import { deleteFeedbackById, getAllFeedbacksMonthCount, getFeedbacksCount, getRecentFeedbacks, removeAllFeedbacks } from '../api/feedbackApi';
// import { toast } from 'react-hot-toast';
// import { SkeletonTheme } from 'react-loading-skeleton';

// const FeedbackHistory = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [selectedPeriod, setSelectedPeriod] = useState('month');
//   const [currentPage, setCurrentPage] = useState(0);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [feedbackCount, setFeedbackCount] = useState(0);
//   const [currentMonthFeedbackCount, setCurrentMonthFeedbackCount] = useState(0);
//   const [positiveCount, setPositiveCount] = useState(0);
//   const [negativeCount, setNegativeCount] = useState(0);
//   const [neutralCount, setNeutralCount] = useState(0);
//   const [totalFeedbackCountPercent, setTotalFeedbackCountPercent] = useState(0);
//   // Sample feedback data
//   const [feedbackItems, setFeedbackItems] = useState([]);
//   const itemsPerPage = 5;

//   const [trendData, setTrendData] = useState([]);

//   // Map the activeTab to the actual sentiment value for API calls
//   const getSentimentType = () => {
//     switch (activeTab) {
//       case 'positive': return 'Positive';
//       case 'neutral': return 'Neutral';
//       case 'negative': return 'Negative';
//       default: return 'all';
//     }
//   };

//   const getFeedbacks = async () => {
//     try {
//       const sentimentType = getSentimentType();
//       const response = await getRecentFeedbacks(currentPage, itemsPerPage, sentimentType);
//       setFeedbackItems(response);
//     } catch (error) {
//       // toast.error("Failed to load feedback");
//     }
//   }

//   useEffect(() => {
//     getFeedbacks();
//   }, [currentPage, activeTab]); // Re-fetch when page or active tab changes

//   const getFeedbacksCountNo = async () => {
//     const response = await getFeedbacksCount();
//     setFeedbackCount(response.count);
//     setCurrentMonthFeedbackCount(response.feedbackCountInCurrentMonth);
//     setPositiveCount(response.positiveCount);
//     setNegativeCount(response.negativeCount);
//     setNeutralCount(response.neutralCount);
//     setTotalFeedbackCountPercent(response.countPercentage);
//   }

//   useEffect(() => {
//     getFeedbacksCountNo();
//   }, []);

//   // Calculate total pages based on filter type
//   const getTotalPages = () => {
//     switch (activeTab) {
//       case 'positive': return Math.ceil(positiveCount / itemsPerPage);
//       case 'neutral': return Math.ceil(neutralCount / itemsPerPage);
//       case 'negative': return Math.ceil(negativeCount / itemsPerPage);
//       default: return Math.ceil(feedbackCount / itemsPerPage);
//     }
//   };

//   const totalPages = getTotalPages();

//   // Reset page when activeTab changes
//   useEffect(() => {
//     setCurrentPage(0);
//   }, [activeTab]);

//   const getFeedbacksMonth = async () => {
//     try {
//       const response = await getAllFeedbacksMonthCount();
//       const formattedData = response.map((res) => {
//         const monthKey = res.month.toLowerCase();
//         return {
//           name: res.month,
//           positive: res.data[`${monthKey}PositivePercent`] || 0,
//           neutral: res.data[`${monthKey}NeutralPercent`] || 0,
//           negative: res.data[`${monthKey}NegativePercent`] || 0,
//         };
//       });
//       setTrendData(formattedData);
//     } catch (error) {
//       // console.error(error);
//     }
//   };

//   useEffect(() => {
//     getFeedbacksMonth();
//   }, []);

//   // Helper function to check if trendData has actual values
//   const hasTrendData = () => {
//     return Array.isArray(trendData) &&
//       trendData.length > 0 &&
//       trendData.some(item =>
//         (item.positive > 0 || item.neutral > 0 || item.negative > 0)
//       );
//   };

//   const getSentimentColor = (sentiment) => {
//     switch (sentiment) {
//       case 'Positive': return { bg: '#f3e8ff', text: '#7e22ce', border: '#8b5cf6' }; // purple
//       case 'Neutral': return { bg: '#e0e7ff', text: '#4338ca', border: '#a5b4fc' }; // indigo
//       case 'Negative': return { bg: '#dbeafe', text: '#2563eb', border: '#93c5fd' }; // blue
//       default: return { bg: '#f3e8ff', text: '#7e22ce', border: '#8b5cf6' };
//     }
//   };

//   const handlePageChange = (page) => {
//     if (page >= 0 && page < totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const deleteFeedback = async (id) => {
//     try {
//       const response = await deleteFeedbackById(id);
//       if (response) {
//         toast.success('Feedback deleted successfully!');

//         // Remove the deleted feedback from local state
//         setFeedbackItems(prevItems =>
//           prevItems.filter(item => item.feedbackId !== id)
//         );

//         // Update the feedback counts to reflect the deletion
//         await getFeedbacksCountNo();
//         await getFeedbacksMonth();

//         // If we deleted all items on the current page and it's not the first page, go to previous page
//         if (feedbackItems.length === 1 && currentPage > 0) {
//           setCurrentPage(currentPage - 1);
//         } else if (feedbackItems.length === 1 && currentPage === 0) {
//           // If we're on the first page and deleted the last item, refresh the list
//           getFeedbacks();
//         }
//       }
//     } catch (error) {
//       // toast.error('Failed to delete feedback');
//     }
//   };

//   const deleteAllFeedback = async () => {
//     try {
//       const response = await removeAllFeedbacks();
//       if (response === true)
//         toast.success("All feedbacks deleted success!!");
//       else
//         toast.error("No Feedbacks found to delete");

//       setFeedbackItems([]);

//       await getFeedbacksCountNo();
//       await getFeedbacksMonth();

//       if (feedbackItems.length === 0 && currentPage === 0) {
//         getFeedbacks();
//       }

//     } catch (error) {
//       // toast.error("Failed to delete!");
//     } finally {
//       setShowDeleteConfirm(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 text-gray-800 px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 md:mb-8"
//         >
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 mb-2">
//                 <Clock size={16} className="mr-2 text-purple-700" />
//                 <span className="text-sm font-medium text-purple-700">History</span>
//               </div>
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
//                 Feedback History
//                 <span className="text-purple-600"> Insights</span>
//               </h1>
//               <p className="text-sm md:text-base text-indigo-700 mt-1">
//                 Track and analyze all your feedback over time
//               </p>
//             </div>

//             <div className="flex items-center space-x-3 mt-4 md:mt-0">
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setShowDeleteConfirm(true)}
//                 className="inline-flex items-center px-3 py-2 bg-red-50 rounded-lg border border-red-200 shadow-sm hover:bg-red-100 text-sm font-medium text-red-700"
//               >
//                 <Trash2 size={16} className="mr-2 text-red-600" />
//                 <span className="hidden sm:inline">Delete All</span>
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Delete All Confirmation Modal */}
//         {showDeleteConfirm && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-white rounded-lg shadow-lg max-w-md w-full p-4 sm:p-6"
//             >
//               <div className="flex items-center mb-4 text-red-600">
//                 <AlertTriangle className="mr-2" />
//                 <h3 className="text-lg font-bold">Delete All Feedback</h3>
//               </div>
//               <p className="mb-6 text-gray-700">
//                 Are you sure you want to delete all feedback entries? This action cannot be undone.
//               </p>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowDeleteConfirm(false)}
//                   className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={deleteAllFeedback}
//                   className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
//                 >
//                   Delete All
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {/* Analytics Overview */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
//         >
//           <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md">
//             <div className="flex items-center mb-2">
//               <ThumbsUp size={18} className="text-purple-600 mr-2" />
//               <h3 className="font-semibold text-gray-800">Overall Sentiment</h3>
//             </div>
//             <div className="flex items-baseline space-x-2">
//               <span className="text-2xl sm:text-3xl font-bold text-purple-700">{totalFeedbackCountPercent.toFixed(2)}%</span>
//             </div>
//             <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
//               <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: `${totalFeedbackCountPercent}%` }}></div>
//             </div>
//           </div>

//           <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md">
//             <div className="flex items-center mb-2">
//               <FileText size={18} className="text-purple-600 mr-2" />
//               <h3 className="font-semibold text-gray-800">Total Feedback</h3>
//             </div>
//             <div className="flex items-baseline space-x-2">
//               <span className="text-2xl sm:text-3xl font-bold text-purple-700">{feedbackCount}</span>
//               <span className="text-xs sm:text-sm text-green-600">+{currentMonthFeedbackCount} this month</span>
//             </div>
//             <div className="mt-3 grid grid-cols-3 gap-1">
//               <div className="text-center p-1 bg-purple-50 rounded">
//                 <div className="text-xs sm:text-sm font-semibold text-purple-700">
//                   {positiveCount}
//                 </div>
//                 <div className="text-xs text-gray-500">Positive</div>
//               </div>
//               <div className="text-center p-1 bg-indigo-50 rounded">
//                 <div className="text-xs sm:text-sm font-semibold text-indigo-700">
//                   {neutralCount}
//                 </div>
//                 <div className="text-xs text-gray-500">Neutral</div>
//               </div>
//               <div className="text-center p-1 bg-blue-50 rounded">
//                 <div className="text-xs sm:text-sm font-semibold text-blue-700">
//                   {negativeCount}
//                 </div>
//                 <div className="text-xs text-gray-500">Negative</div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Sentiment Trend Chart */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mb-6 md:mb-8"
//         >
//           <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-md">
//             <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-4 gap-2">
//               <div className="flex items-center">
//                 <ArrowUpDown className="h-5 w-5 text-purple-600 mr-2" />
//                 <h2 className="text-base sm:text-lg font-semibold text-gray-800">Sentiment Trend</h2>
//               </div>


//               <div className="flex rounded-lg p-1">
//                 <button
//                   onClick={() => setSelectedPeriod('month')}
//                   className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${selectedPeriod === 'month'
//                     ? 'bg-purple-100 text-purple-700'
//                     : 'text-gray-600 hover:text-purple-700'
//                     }`}
//                 >
//                   Monthly
//                 </button>
//               </div>
//             </div>

//             {hasTrendData() ? (
//               <div className="h-48 xs:h-56 sm:h-64 md:h-72">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart
//                     data={trendData}
//                     margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                     <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
//                     <YAxis
//                       stroke="#64748b"
//                       fontSize={12}
//                       width={40}
//                       domain={[0, 100]}
//                       ticks={[0, 20, 40, 60, 80, 100]}
//                     />
//                     <Tooltip
//                       contentStyle={{
//                         fontSize: '12px',
//                         backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                         borderRadius: '6px',
//                         boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//                         border: '1px solid #f3f4f6'
//                       }}
//                       formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
//                       labelFormatter={(label) => `${label}, ${new Date().getFullYear()}`}
//                     />
//                     <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
//                     <Line type="monotone" dataKey="positive" name="Positive" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
//                     <Line type="monotone" dataKey="neutral" name="Neutral" stroke="#a5b4fc" strokeWidth={2.5} dot={{ fill: '#a5b4fc', r: 4 }} activeDot={{ r: 6 }} />
//                     <Line type="monotone" dataKey="negative" name="Negative" stroke="#93c5fd" strokeWidth={2.5} dot={{ fill: '#93c5fd', r: 4 }} activeDot={{ r: 6 }} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             ) : (
//               <div className="h-48 flex flex-col items-center justify-center text-center text-gray-400">
//                 <div className="text-gray-400 mb-3 animate-bounce">
//                   <BarChart2 size={48} strokeWidth={2} className="mb-2" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-700 mb-1">No trends available</h3>
//                 <p className="text-sm text-gray-500">
//                   There's not enough data to show trends yet
//                 </p>
//               </div>

//             )}
//           </div>
//         </motion.div>

//         {/* Feedback List */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="bg-white rounded-xl shadow-md overflow-hidden"
//         >
//           <div className="p-3 sm:p-4 md:p-6">
//             <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-3">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Feedback Entries</h2>
//             </div>

//             {/* Tabs */}
//             <div className="flex overflow-x-auto border-b border-gray-200 mb-4 sm:mb-6 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6">
//               <button
//                 onClick={() => setActiveTab('all')}
//                 className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'all'
//                   ? 'text-purple-700 border-b-2 border-purple-500'
//                   : 'text-gray-500 hover:text-gray-700'
//                   }`}
//               >
//                 All Feedback
//               </button>
//               <button
//                 onClick={() => setActiveTab('positive')}
//                 className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'positive'
//                   ? 'text-purple-700 border-b-2 border-purple-500'
//                   : 'text-gray-500 hover:text-gray-700'
//                   }`}
//               >
//                 Positive
//               </button>
//               <button
//                 onClick={() => setActiveTab('neutral')}
//                 className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'neutral'
//                   ? 'text-purple-700 border-b-2 border-purple-500'
//                   : 'text-gray-500 hover:text-gray-700'
//                   }`}
//               >
//                 Neutral
//               </button>
//               <button
//                 onClick={() => setActiveTab('negative')}
//                 className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'negative'
//                   ? 'text-purple-700 border-b-2 border-purple-500'
//                   : 'text-gray-500 hover:text-gray-700'
//                   }`}
//               >
//                 Negative
//               </button>
//             </div>

//             Feedback Cards
//             {feedbackItems.length > 0 ? (
//               <div className="space-y-3 sm:space-y-4">
//                 {feedbackItems.map((item) => {
//                   const colors = getSentimentColor(item.sentiment);
//                   return (
//                     <motion.div
//                       key={item.feedbackId}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       whileHover={{ scale: 1.01 }}
//                       className={`p-3 sm:p-4 rounded-lg border-l-4 relative`}
//                       style={{ borderLeftColor: colors.border, backgroundColor: `${colors.bg}20` }}
//                     >
//                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
//                         <div className="flex items-center flex-wrap gap-2">
//                           <span
//                             className="inline-flex items-center text-xs font-medium rounded-full px-2.5 py-0.5"
//                             style={{ backgroundColor: colors.bg, color: colors.text }}
//                           >
//                             {item.sentiment}
//                           </span>
//                           <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'short',
//                             day: 'numeric'
//                           })}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-xs font-medium text-center px-2 py-1 rounded bg-white">
//                           Score: {(item.sentimentScore * 100).toFixed(0)}%
//                         </span>
//                       </div>
//                       <p className="text-sm sm:text-base text-gray-700">{item.feedbackText}</p>
//                       <button
//                         onClick={() => deleteFeedback(item.feedbackId)}
//                         className="absolute top-3 right-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
//                         title="Delete feedback"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="py-12 flex flex-col items-center justify-center text-center">
//                 <div className="text-gray-400 mb-3 animate-bounce">
//                   <FileText size={48} />
//                 </div>

//                 <h3 className="text-lg font-medium text-gray-700 mb-1">No feedback found</h3>
//                 <p className="text-sm text-gray-500">
//                   There's no feedback in this category yet
//                 </p>
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 0 && (
//               <div className="flex items-center justify-between mt-6">
//                 <div className="text-xs text-gray-500">
//                   {/* Calculate current item range based on filter and page */}
//                   Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage,
//                     activeTab === 'positive' ? positiveCount :
//                       activeTab === 'neutral' ? neutralCount :
//                         activeTab === 'negative' ? negativeCount : feedbackCount)} {' '}
//                   of {activeTab === 'positive' ? positiveCount :
//                     activeTab === 'neutral' ? neutralCount :
//                       activeTab === 'negative' ? negativeCount : feedbackCount} entries
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
//                     className={`p-1 rounded-md ${currentPage === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
//                   >
//                     <ChevronLeft size={18} />
//                   </button>

//                   {/* Page numbers (window of 5) */}
//                   {Array.from({ length: totalPages }, (_, i) => i)
//                     .filter((page) => {
//                       if (totalPages <= 5) return true;
//                       if (currentPage < 3) return page < 5;
//                       if (currentPage >= totalPages - 3) return page >= totalPages - 5;
//                       return Math.abs(currentPage - page) <= 2;
//                     })
//                     .map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${currentPage === page
//                           ? 'bg-purple-100 text-purple-700 font-medium'
//                           : 'text-gray-600 hover:bg-gray-100'
//                           }`}
//                       >
//                         {page + 1}
//                       </button>
//                     ))}

//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage + 1 >= totalPages}
//                     className={`p-1 rounded-md ${currentPage + 1 >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
//                   >
//                     <ChevronRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div >
//     </div >
//   );
// };

// export default FeedbackHistory;














import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  Clock,
  ArrowUpDown,
  ThumbsUp,
  FileText,
  ChevronLeft,
  ChevronRight,
  Trash2,
  AlertTriangle,
  BarChart2,
} from "lucide-react";

import { deleteFeedbackById, getAllFeedbacksMonthCount, getFeedbacksCount, getRecentFeedbacks, removeAllFeedbacks } from '../api/feedbackApi';
import { toast } from 'react-hot-toast';
import { SkeletonTheme } from 'react-loading-skeleton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FeedbackHistory = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [currentPage, setCurrentPage] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [currentMonthFeedbackCount, setCurrentMonthFeedbackCount] = useState(0);
  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [totalFeedbackCountPercent, setTotalFeedbackCountPercent] = useState(0);
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countLoading, setCountLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);

  const itemsPerPage = 5;

  // Map the activeTab to the actual sentiment value for API calls
  const getSentimentType = () => {
    switch (activeTab) {
      case 'positive': return 'Positive';
      case 'neutral': return 'Neutral';
      case 'negative': return 'Negative';
      default: return 'all';
    }
  };

  const getFeedbacks = async () => {
    try {
      setLoading(true);
      const sentimentType = getSentimentType();
      const response = await getRecentFeedbacks(currentPage, itemsPerPage, sentimentType);
      setFeedbackItems(response);
    } catch (error) {
      // toast.error("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFeedbacks();
  }, [currentPage, activeTab]); // Re-fetch when page or active tab changes

  const getFeedbacksCountNo = async () => {
    try {
      setCountLoading(true);
      const response = await getFeedbacksCount();
      setFeedbackCount(response.count);
      setCurrentMonthFeedbackCount(response.feedbackCountInCurrentMonth);
      setPositiveCount(response.positiveCount);
      setNegativeCount(response.negativeCount);
      setNeutralCount(response.neutralCount);
      setTotalFeedbackCountPercent(response.countPercentage);
    } catch (error) {
      // Handle error
    } finally {
      setCountLoading(false);
    }
  }

  useEffect(() => {
    getFeedbacksCountNo();
  }, []);

  // Calculate total pages based on filter type
  const getTotalPages = () => {
    switch (activeTab) {
      case 'positive': return Math.ceil(positiveCount / itemsPerPage);
      case 'neutral': return Math.ceil(neutralCount / itemsPerPage);
      case 'negative': return Math.ceil(negativeCount / itemsPerPage);
      default: return Math.ceil(feedbackCount / itemsPerPage);
    }
  };

  const totalPages = getTotalPages();

  // Reset page when activeTab changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab]);

  const getFeedbacksMonth = async () => {
    try {
      setChartLoading(true);
      const response = await getAllFeedbacksMonthCount();
      const formattedData = response.map((res) => {
        const monthKey = res.month.toLowerCase();
        return {
          name: res.month,
          positive: res.data[`${monthKey}PositivePercent`] || 0,
          neutral: res.data[`${monthKey}NeutralPercent`] || 0,
          negative: res.data[`${monthKey}NegativePercent`] || 0,
        };
      });
      setTrendData(formattedData);
    } catch (error) {
      // console.error(error);
    } finally {
      setChartLoading(false);
    }
  };

  useEffect(() => {
    getFeedbacksMonth();
  }, []);

  // Helper function to check if trendData has actual values
  const hasTrendData = () => {
    return Array.isArray(trendData) &&
      trendData.length > 0 &&
      trendData.some(item =>
        (item.positive > 0 || item.neutral > 0 || item.negative > 0)
      );
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return { bg: '#f3e8ff', text: '#7e22ce', border: '#8b5cf6' }; // purple
      case 'Neutral': return { bg: '#e0e7ff', text: '#4338ca', border: '#a5b4fc' }; // indigo
      case 'Negative': return { bg: '#dbeafe', text: '#2563eb', border: '#93c5fd' }; // blue
      default: return { bg: '#f3e8ff', text: '#7e22ce', border: '#8b5cf6' };
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      const response = await deleteFeedbackById(id);
      if (response) {
        toast.success('Feedback deleted successfully!');

        // Remove the deleted feedback from local state
        setFeedbackItems(prevItems =>
          prevItems.filter(item => item.feedbackId !== id)
        );

        // Update the feedback counts to reflect the deletion
        await getFeedbacksCountNo();
        await getFeedbacksMonth();

        // If we deleted all items on the current page and it's not the first page, go to previous page
        if (feedbackItems.length === 1 && currentPage > 0) {
          setCurrentPage(currentPage - 1);
        } else if (feedbackItems.length === 1 && currentPage === 0) {
          // If we're on the first page and deleted the last item, refresh the list
          getFeedbacks();
        }
      }
    } catch (error) {
      // toast.error('Failed to delete feedback');
    }
  };

  const deleteAllFeedback = async () => {
    try {
      const response = await removeAllFeedbacks();
      if (response === true)
        toast.success("All feedbacks deleted success!!");
      else
        toast.error("No Feedbacks found to delete");

      setFeedbackItems([]);

      await getFeedbacksCountNo();
      await getFeedbacksMonth();

      if (feedbackItems.length === 0 && currentPage === 0) {
        getFeedbacks();
      }

    } catch (error) {
      // toast.error("Failed to delete!");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#ffffff">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 text-gray-800 px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 mb-2">
                  <Clock size={16} className="mr-2 text-purple-700" />
                  <span className="text-sm font-medium text-purple-700">History</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  Feedback History
                  <span className="text-purple-600"> Insights</span>
                </h1>
                <p className="text-sm md:text-base text-indigo-700 mt-1">
                  Track and analyze all your feedback over time
                </p>
              </div>

              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center px-3 py-2 bg-red-50 rounded-lg border border-red-200 shadow-sm hover:bg-red-100 text-sm font-medium text-red-700"
                >
                  <Trash2 size={16} className="mr-2 text-red-600" />
                  <span className="hidden sm:inline">Delete All</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Delete All Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg shadow-lg max-w-md w-full p-4 sm:p-6"
              >
                <div className="flex items-center mb-4 text-red-600">
                  <AlertTriangle className="mr-2" />
                  <h3 className="text-lg font-bold">Delete All Feedback</h3>
                </div>
                <p className="mb-6 text-gray-700">
                  Are you sure you want to delete all feedback entries? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteAllFeedback}
                    className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    Delete All
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Analytics Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
          >
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md">
              <div className="flex items-center mb-2">
                <ThumbsUp size={18} className="text-purple-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Overall Sentiment</h3>
              </div>
              {countLoading ? (
                <>
                  <Skeleton width={80} height={36} />
                  <div className="mt-3">
                    <Skeleton height={8} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl sm:text-3xl font-bold text-purple-700">{totalFeedbackCountPercent.toFixed(2)}%</span>
                  </div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: `${totalFeedbackCountPercent}%` }}></div>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md">
              <div className="flex items-center mb-2">
                <FileText size={18} className="text-purple-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Total Feedback</h3>
              </div>
              {countLoading ? (
                <>
                  <Skeleton width={120} height={36} />
                  <div className="mt-3 grid grid-cols-3 gap-1">
                    <Skeleton height={36} />
                    <Skeleton height={36} />
                    <Skeleton height={36} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl sm:text-3xl font-bold text-purple-700">{feedbackCount}</span>
                    <span className="text-xs sm:text-sm text-green-600">+{currentMonthFeedbackCount} this month</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1">
                    <div className="text-center p-1 bg-purple-50 rounded">
                      <div className="text-xs sm:text-sm font-semibold text-purple-700">
                        {positiveCount}
                      </div>
                      <div className="text-xs text-gray-500">Positive</div>
                    </div>
                    <div className="text-center p-1 bg-indigo-50 rounded">
                      <div className="text-xs sm:text-sm font-semibold text-indigo-700">
                        {neutralCount}
                      </div>
                      <div className="text-xs text-gray-500">Neutral</div>
                    </div>
                    <div className="text-center p-1 bg-blue-50 rounded">
                      <div className="text-xs sm:text-sm font-semibold text-blue-700">
                        {negativeCount}
                      </div>
                      <div className="text-xs text-gray-500">Negative</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Sentiment Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 md:mb-8"
          >
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-md">
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-4 gap-2">
                <div className="flex items-center">
                  <ArrowUpDown className="h-5 w-5 text-purple-600 mr-2" />
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">Sentiment Trend</h2>
                </div>
                <div className="flex rounded-lg p-1">
                  <button
                    onClick={() => setSelectedPeriod('month')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${selectedPeriod === 'month'
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-700'
                      }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {chartLoading ? (
                <div className="h-48 xs:h-56 sm:h-64 md:h-72">
                  <Skeleton height="100%" />
                </div>
              ) : hasTrendData() ? (
                <div className="h-48 xs:h-56 sm:h-64 md:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData}
                      margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis
                        stroke="#64748b"
                        fontSize={12}
                        width={40}
                        domain={[0, 100]}
                        ticks={[0, 20, 40, 60, 80, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          fontSize: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '6px',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                          border: '1px solid #f3f4f6'
                        }}
                        formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
                        labelFormatter={(label) => `${label}, ${new Date().getFullYear()}`}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
                      <Line type="monotone" dataKey="positive" name="Positive" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="neutral" name="Neutral" stroke="#a5b4fc" strokeWidth={2.5} dot={{ fill: '#a5b4fc', r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="negative" name="Negative" stroke="#93c5fd" strokeWidth={2.5} dot={{ fill: '#93c5fd', r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center text-gray-400">
                  <div className="text-gray-400 mb-3 animate-bounce">
                    <BarChart2 size={48} strokeWidth={2} className="mb-2" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No trends available</h3>
                  <p className="text-sm text-gray-500">
                    There's not enough data to show trends yet
                  </p>
                </div>
              )}
            </div>
          </motion.div>


          {/* Feedback List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Feedback Entries</h2>
              </div>

              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-gray-200 mb-4 sm:mb-6 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'all'
                    ? 'text-purple-700 border-b-2 border-purple-500'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  All Feedback
                </button>
                <button
                  onClick={() => setActiveTab('positive')}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'positive'
                    ? 'text-purple-700 border-b-2 border-purple-500'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Positive
                </button>
                <button
                  onClick={() => setActiveTab('neutral')}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'neutral'
                    ? 'text-purple-700 border-b-2 border-purple-500'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Neutral
                </button>
                <button
                  onClick={() => setActiveTab('negative')}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'negative'
                    ? 'text-purple-700 border-b-2 border-purple-500'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Negative
                </button>
              </div>

              {/* Feedback Cards */}
              {loading ? (
                <div className="space-y-3 sm:space-y-4">
                  {[...Array(itemsPerPage)].map((_, index) => (
                    <div key={index} className="p-3 sm:p-4 rounded-lg border-l-4 border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                        <div className="flex items-center flex-wrap gap-2">
                          <Skeleton width={80} height={20} />
                          <Skeleton width={120} height={20} />
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <Skeleton width={80} height={24} />
                      </div>
                      <Skeleton count={2} />
                    </div>
                  ))}
                </div>
              ) : feedbackItems.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {feedbackItems.map((item) => {
                    const colors = getSentimentColor(item.sentiment);
                    return (
                      <motion.div
                        key={item.feedbackId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.01 }}
                        className={`p-3 sm:p-4 rounded-lg border-l-4 relative`}
                        style={{ borderLeftColor: colors.border, backgroundColor: `${colors.bg}20` }}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                          <div className="flex items-center flex-wrap gap-2">
                            <span
                              className="inline-flex items-center text-xs font-medium rounded-full px-2.5 py-0.5"
                              style={{ backgroundColor: colors.bg, color: colors.text }}
                            >
                              {item.sentiment}
                            </span>
                            <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-center px-2 py-1 rounded bg-white">
                            Score: {(item.sentimentScore * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700">{item.feedbackText}</p>
                        <button
                          onClick={() => deleteFeedback(item.feedbackId)}
                          className="absolute top-3 right-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete feedback"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="text-gray-400 mb-3 animate-bounce">
                    <FileText size={48} />
                  </div>

                  <h3 className="text-lg font-medium text-gray-700 mb-1">No feedback found</h3>
                  <p className="text-sm text-gray-500">
                    There's no feedback in this category yet
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 0 && !loading && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-xs text-gray-500">
                    {/* Calculate current item range based on filter and page */}
                    Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage,
                      activeTab === 'positive' ? positiveCount :
                        activeTab === 'neutral' ? neutralCount :
                          activeTab === 'negative' ? negativeCount : feedbackCount)} {' '}
                    of {activeTab === 'positive' ? positiveCount :
                      activeTab === 'neutral' ? neutralCount :
                        activeTab === 'negative' ? negativeCount : feedbackCount} entries
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      className={`p-1 rounded-md ${currentPage === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {/* Page numbers (window of 5) */}
                    {Array.from({ length: totalPages }, (_, i) => i)
                      .filter((page) => {
                        if (totalPages <= 5) return true;
                        if (currentPage < 3) return page < 5;
                        if (currentPage >= totalPages - 3) return page >= totalPages - 5;
                        return Math.abs(currentPage - page) <= 2;
                      })
                      .map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${currentPage === page
                            ? 'bg-purple-100 text-purple-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                          {page + 1}
                        </button>
                      ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage + 1 >= totalPages}
                      className={`p-1 rounded-md ${currentPage + 1 >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Loading pagination placeholder */}
              {loading && (
                <div className="flex items-center justify-between mt-6">
                  <Skeleton width={150} height={20} />
                  <div className="flex items-center space-x-1"></div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default FeedbackHistory;





