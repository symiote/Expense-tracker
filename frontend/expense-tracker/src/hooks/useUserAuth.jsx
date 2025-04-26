import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { UserContext } from '../context/userContext';

export const useUserAuth = () => {
  
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect runs when component mounts or dependencies change
  useEffect(() => {
    // If user already exists in context, no need to fetch
    if (user) return;

    // Control flag to avoid setting state on unmounted component
    let isMounted = true;

    // Async function to fetch logged-in user details from API
    const fetchUserInfo = async () => {
      try {
        // Make GET request to backend endpoint for user info
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        // If component is still mounted and data is received, update context
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        // On error, log issue and redirect to login if component is mounted
        console.error("Failed to fetch user info in useUserAuth hook:", error);
        if (isMounted) {
          clearUser();             // Clear any possibly stale user data
          navigate("/login");      // Redirect to login page
        }
      }
    };

    fetchUserInfo(); // Call the function to initiate the API request

    // Cleanup function to set `isMounted` false if component unmounts
    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]); // Dependency array
};
