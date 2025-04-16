import axios from "axios";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// Add a request interceptor to set the Authorization header for JWT
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-Type": "application/json",
    };

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add error interceptor
axiosInstance.interceptors.response.use(
  (response) =>
    // Return successful response
    response,
  (error) => {
    // Handle error
    if (error.response) {
      // The request was made and the server responded with a status code
      const { status } = error.response;
      if (status === 403) {
        console.log("Access forbidden");
      } else if (status === 401) {
        // Redirect to the login page
        window.location.href = "/auth/login";
      } else if (status === 404) {
        window.location.href = "/404";
      } else if (status === 500) {
        window.location.href = "/500";
      } else if (status === 503) {
        window.location.href = "/maintenance";
      } else {
        const errorMessage = error.response.data.message || "An error occurred";
        console.log(errorMessage);
      }
    } else if (error.request) {
      window.location.href = "/500";
    } else {
      // Something happened in setting up the request that triggered an error
      console.log(`Error: ${error.message}`);
    }

    // Pass the error to the calling code
    throw error;
  }
);
export default axiosInstance;