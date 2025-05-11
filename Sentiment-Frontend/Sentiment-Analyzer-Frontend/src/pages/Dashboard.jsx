import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Clock,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  XCircle,
  User
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useAuthStore } from '../context/authStore';
import { LOGOUT_URL } from '../api/baseUrl';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Collapse sidebar by default on mobile
    if (windowWidth < 768) {
      setSidebarCollapsed(true);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (windowWidth < 768) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const navigate = useNavigate();

  const confirmLogout = () => {
    // Implement actual logout logic here
    window.location.href = `${LOGOUT_URL}`;
    localStorage.removeItem('user');
    setShowLogoutModal(false);
    navigate("/login", { replace: true });
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Handle image loading error
  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);
    console.error("Error details:", e);
    setImageError(true);

    // Try to reload the image with a different approach for Google images
    if (e.target.src.includes('googleusercontent.com')) {
      const imgElement = e.target;

      // Try to use the Google profile photo with a different size parameter
      if (imgElement.src.includes('=s96-c')) {
        // Change from s96-c to s120-c (larger size) in case that helps
        const newSrc = imgElement.src.replace('=s96-c', '=s120-c');
        setTimeout(() => {
          if (!imageError) {
            imgElement.src = newSrc;
          }
        }, 500);
      }
    }
  };

  useEffect(() => {
    // Simulate loading data
    setLoading(true);

    const timer = setTimeout(() => {
      if (user) {
        setName(user.name || '');
        setEmail(user.email || '');

        // Reset image error state when user changes
        setImageError(false);

        // Check if picture exists and is a valid URL
        if (user.picture && typeof user.picture === 'string') {
          // For Google profile pictures, ensure we're using HTTPS
          let pictureUrl = user.picture;

          // Force HTTPS for Google profile pictures
          if (pictureUrl.includes('googleusercontent.com') && pictureUrl.startsWith('http:')) {
            pictureUrl = pictureUrl.replace('http:', 'https:');
          }

          // Add a cache-busting parameter to force reload
          pictureUrl = pictureUrl.includes('?')
            ? `${pictureUrl}&_cb=${new Date().getTime()}`
            : `${pictureUrl}?_cb=${new Date().getTime()}`;

          setProfilePicture(pictureUrl);
        } else {
          console.error("No valid profile picture found in user data");
          setImageError(true);
        }
      }
      setLoading(false);
    }, 800); // Simulate loading delay

    return () => clearTimeout(timer);
  }, [user]);

  // Navigation items for sidebar
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Clock size={20} />, label: 'Feedback History', path: '/history' },
    { icon: <LogOut size={20} />, label: 'Logout', onClick: handleLogout }
  ];

  // Avatar component to reuse for consistency
  const Avatar = ({ size = "default" }) => {
    const sizeClass = size === "small" ? "w-8 h-8" : "w-10 h-10 min-w-10";
    const iconSize = size === "small" ? 16 : 20;

    if (loading) {
      return (
        <div className={`${sizeClass} rounded-full`}>
          <Skeleton circle height="100%" width="100%" />
        </div>
      );
    }

    return (
      <div className={`${sizeClass} rounded-full bg-purple-600 flex items-center justify-center text-white overflow-hidden`}>
        {profilePicture && !imageError ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={handleImageError}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            loading="eager"
          />
        ) : (
          <User size={iconSize} />
        )}
      </div>
    );
  };

  return (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 text-gray-800">
        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Confirm Logout</h3>
                <button
                  onClick={cancelLogout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle size={20} />
                </button>
              </div>
              <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelLogout}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  No, Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg font-medium text-white shadow-sm transition-all"
                >
                  Yes, Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Mobile overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden"
            onClick={closeMobileSidebar}
          />
        )}

        {/* Sidebar - Mobile */}
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: mobileSidebarOpen ? 0 : -280 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed left-0 top-0 h-full w-64 md:hidden bg-white shadow-lg z-30 overflow-y-auto"
        >
          <div className="flex flex-col h-full">
            {/* Logo and Profile */}
            <div className="p-4 border-b border-purple-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Sparkles className="h-6 w-6 mr-3 text-purple-600" />
                  <span className="text-xl font-bold text-gray-800">
                    Sush Feedback <span className="text-purple-600">Analyzer</span>
                  </span>
                </div>
                <button onClick={closeMobileSidebar} className="text-gray-500 hover:text-gray-700">
                  <ChevronLeft size={20} />
                </button>
              </div>

              {/* User Profile - Mobile */}
              <div className="flex items-center mt-2">
                <Avatar />
                {/* Text container with proper truncation */}
                <div className="ml-3 overflow-hidden">
                  {loading ? (
                    <>
                      <Skeleton width={100} height={18} />
                      <Skeleton width={120} height={14} />
                    </>
                  ) : (
                    <>
                      {name && (
                        <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                      )}
                      {email && (
                        <p className="text-xs font-normal text-gray-700 truncate">{email}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4">
              <ul className="space-y-1">
                {loading ? (
                  // Skeleton for nav items
                  Array(3).fill().map((_, index) => (
                    <li key={index} className="px-4 py-3">
                      <div className="flex items-center">
                        <Skeleton circle width={20} height={20} />
                        <div className="ml-4 w-full">
                          <Skeleton width={100} height={18} />
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  navItems.map((item, index) => (
                    <li key={index}>
                      {item.onClick ? (
                        <a
                          className="flex items-center px-4 py-3 rounded-lg transition-colors hover:bg-purple-50 text-gray-700 hover:text-purple-700"
                          href="#"
                          onClick={item.onClick}
                        >
                          <span className="text-gray-500">{item.icon}</span>
                          <span className="ml-4 font-medium">{item.label}</span>
                        </a>
                      ) : (
                        <NavLink
                          to={item.path}
                          onClick={closeMobileSidebar}
                          end  // Add this prop to ensure exact matching
                          className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ${isActive
                            ? 'bg-purple-100 text-purple-700'
                            : 'hover:bg-purple-50 text-gray-700 hover:text-purple-700'
                            }`}
                        >
                          {({ isActive }) => (
                            <>
                              <span className={isActive ? 'text-purple-700' : 'text-gray-500'}>
                                {item.icon}
                              </span>
                              <span className="ml-4 font-medium">{item.label}</span>
                            </>
                          )}
                        </NavLink>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </nav>
          </div>
        </motion.div>

        {/* Sidebar - Desktop */}
        <motion.div
          initial={{ width: sidebarCollapsed ? 80 : 250 }}
          animate={{ width: sidebarCollapsed ? 80 : 250 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden md:block fixed h-full z-10 bg-white shadow-lg"
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center p-4 mb-6">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center"
                >
                  <Sparkles className="h-6 w-6 mr-3 text-purple-600" />
                  <span className="text-xl font-bold whitespace-nowrap overflow-hidden text-gray-800">
                    Sush Feedback  <br /><span className="text-purple-600">Analyzer</span>
                  </span>
                </motion.div>
              )}
              {sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mx-auto"
                >
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </motion.div>
              )}
            </div>

            {/* User Profile - Only show when sidebar is expanded */}
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="px-4 mb-6"
              >
                {/* Profile layout with flex and proper spacing */}
                <div className="flex items-center">
                  <Avatar />
                  {/* Container with overflow handling */}
                  <div className="ml-3 max-w-36 overflow-hidden">
                    {loading ? (
                      <>
                        <Skeleton width={80} height={16} />
                        <Skeleton width={100} height={12} />
                      </>
                    ) : (
                      <>
                        {name && (
                          <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                        )}
                        {email && (
                          <p className="text-xs font-normal text-gray-700 truncate">{email}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* User Avatar only - When sidebar is collapsed */}
            {sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mb-6"
              >
                <Avatar />
              </motion.div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-2">
              <ul className="space-y-1">
                {loading ? (
                  // Skeleton for nav items when loading
                  Array(3).fill().map((_, index) => (
                    <li key={index} className="px-4 py-3">
                      <div className="flex items-center">
                        <Skeleton circle width={20} height={20} />
                        {!sidebarCollapsed && (
                          <div className="ml-4 w-full">
                            <Skeleton width={80} height={18} />
                          </div>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  navItems.map((item, index) => (
                    <li key={index}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.onClick ? (
                          <a
                            className="flex items-center px-4 py-3 rounded-lg transition-colors hover:bg-purple-50 text-gray-700 hover:text-purple-700"
                            href="#"
                            onClick={item.onClick}
                          >
                            <span className="text-gray-500">{item.icon}</span>
                            {!sidebarCollapsed && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="ml-4 whitespace-nowrap overflow-hidden font-medium"
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </a>
                        ) : (
                          <NavLink
                            to={item.path}
                            onClick={closeMobileSidebar}
                            end  // Add this prop to ensure exact matching
                            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ${isActive
                              ? 'bg-purple-100 text-purple-700'
                              : 'hover:bg-purple-50 text-gray-700 hover:text-purple-700'
                              }`}
                          >
                            {({ isActive }) => (
                              <>
                                <span className={isActive ? 'text-purple-700' : 'text-gray-500'}>
                                  {item.icon}
                                </span>
                                {!sidebarCollapsed && (
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="ml-4 whitespace-nowrap overflow-hidden font-medium"
                                  >
                                    {item.label}
                                  </motion.span>
                                )}
                              </>
                            )}
                          </NavLink>
                        )}
                      </motion.div>
                    </li>
                  ))
                )}
              </ul>
            </nav>

            {/* Collapse Button */}
            <div className="p-4">
              <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors"
              >
                {sidebarCollapsed ?
                  <ChevronRight size={18} /> :
                  <ChevronLeft size={18} />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div
          className={`transition-all duration-300 ${windowWidth >= 768
            ? (sidebarCollapsed ? 'md:ml-20' : 'md:ml-64')
            : 'ml-0'}`}
        >
          {/* Top Navigation for Mobile */}
          <div className="md:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-purple-100 text-gray-700"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
              <span className="font-bold text-gray-800">
                Sush Feedback <span className="text-purple-600">Analyzer</span>
              </span>
            </div>

            {/* Profile Avatar for Mobile Top Nav */}
            <Avatar size="small" />
          </div>

          {/* Main Content - Add a loading state for the content area */}
          <div className="p-4 md:p-6">
            {loading ? (
              <div className="content-loader">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <Skeleton height={40} width={200} className="mb-4" />
                  <Skeleton count={3} height={20} className="mb-2" />
                  <div className="mt-4">
                    <Skeleton height={100} className="mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <Skeleton height={150} />
                      <Skeleton height={150} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Dashboard;