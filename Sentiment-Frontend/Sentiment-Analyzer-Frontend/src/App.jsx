import Dashboard from "./pages/Dashboard";
import DashboardContent from "./components/DashboardContent";
import FeedbackHistory from "./pages/FeedbackHistory";
import Footer from "./pages/Footer"
import LoginPage from "./pages/LoginPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./context/ProtectedRoute";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useAuthStore } from "./context/authStore";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true, // Default route
          element: <DashboardContent />,
        },
        {
          path: "history",
          element: <FeedbackHistory />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);


  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // Run once on mount
  }, [fetchUser]);



  return (
    <>
      <Toaster position="top-center" reverseOrder={false} containerStyle={{
        top: 30,
        right: 10,
        zIndex: 9999,
      }}
        toastOptions={{
          style: {
            background: '#9333ea',
            color: '#ffffff',
          },
          duration: 3000,
        }} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;