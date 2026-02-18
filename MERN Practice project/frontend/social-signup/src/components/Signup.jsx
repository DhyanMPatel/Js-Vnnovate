import { useState, useEffect } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);

  // Check for Google OAuth success on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userData = urlParams.get("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userData));
        localStorage.setItem("token", token);
        setUser(parsedUser);
        setSuccessMessage(
          `Successfully signed up with ${
            parsedUser.authMethod === "google"
              ? "Google"
              : parsedUser.authMethod === "linkedin"
                ? "LinkedIn"
                : parsedUser.authMethod === "github"
                  ? "GitHub"
                  : parsedUser.authMethod === "instagram"
                    ? "Instagram"
                    : parsedUser.authMethod === "apple"
                      ? "Apple"
                      : parsedUser.authMethod === "facebook"
                        ? "Facebook"
                        : "Email"
          }!`,
        );

        // Clean URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      } catch (error) {
        console.error("Error parsing user data:", error);
        setErrors({ general: "Error processing authentication" });
      }
    }

    // Check for errors
    const error = urlParams.get("error");
    if (error) {
      if (error === "google_auth_failed") {
        setErrors({
          general: "Google authentication failed. Please try again.",
        });
      } else if (error === "linkedin_auth_failed") {
        setErrors({
          general: "LinkedIn authentication failed. Please try again.",
        });
      } else if (error === "github_auth_failed") {
        setErrors({
          general: "GitHub authentication failed. Please try again.",
        });
      } else if (error === "instagram_auth_failed") {
        setErrors({
          general: "Instagram authentication failed. Please try again.",
        });
      } else if (error === "apple_auth_failed") {
        setErrors({
          general: "Apple authentication failed. Please try again.",
        });
      } else if (error === "facebook_auth_failed") {
        setErrors({
          general: "Facebook authentication failed. Please try again.",
        });
      } else {
        setErrors({ general: "Authentication failed. Please try again." });
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    } else if (formData.username.length > 30) {
      newErrors.username = "Username must be less than 30 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      setSuccessMessage("Account created successfully! You are now logged in.");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup error:", error);

      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({
          general: "An error occurred during signup. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleLinkedinSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/linkedin";
  };

  const handleInstagramSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/instagram";
  };

  const handleGithubSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  // Facebook Sign In handler (Commented Out - Uncomment when ready to use)
  // const handleFacebookSignup = () => {
  //   window.location.href = "http://localhost:5000/api/auth/facebook";
  // };

  // Apple Sign In handler (Commented Out - Uncomment when ready to use)
  // const handleAppleSignup = () => {
  //   window.location.href = "http://localhost:5000/api/auth/apple";
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setSuccessMessage("You have been logged out successfully.");
  };

  // If user is logged in, show success state
  if (user) {
    return (
      <div className="signup-container">
        <div className="signup-form success-state">
          <div className="success-icon">✓</div>
          <h2>Welcome, {user.username}!</h2>
          <p>
            You have successfully signed up
            {user.authMethod === "google"
              ? " with Google"
              : user.authMethod === "linkedin"
                ? " with LinkedIn"
                : user.authMethod === "github"
                  ? " with GitHub"
                  : user.authMethod === "instagram"
                    ? " with Instagram"
                    : user.authMethod === "apple"
                      ? " with Apple"
                      : user.authMethod === "facebook"
                        ? " with Facebook"
                        : ""}
            .
          </p>

          {user.avatar && (
            <img src={user.avatar} alt="Profile" className="profile-avatar" />
          )}

          <div className="user-info">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Auth Method:</strong>{" "}
              {user.authMethod === "google"
                ? "Google"
                : user.authMethod === "linkedin"
                  ? "LinkedIn"
                  : user.authMethod === "github"
                    ? "GitHub"
                    : user.authMethod === "instagram"
                      ? "Instagram"
                      : user.authMethod === "apple"
                        ? "Apple"
                        : user.authMethod === "facebook"
                          ? "Facebook"
                          : "Email"}
            </p>
          </div>

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create Account</h2>
        <p>Join us today! Choose your signup method below.</p>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}

        {/* Google Signup Button */}
        <div className="google-signup-section">
          <button
            onClick={handleGoogleSignup}
            className="google-signup-button"
            disabled={isLoading}
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>
        </div>

        {/* LinkedIn Signup Button */}
        <div className="linkedin-signup-section">
          <button
            onClick={handleLinkedinSignup}
            className="linkedin-signup-button"
            disabled={isLoading}
          >
            <svg className="linkedin-icon" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
            Sign up with LinkedIn
          </button>
        </div>

        {/* GitHub Signup Button */}
        <div className="github-signup-section">
          <button
            onClick={handleGithubSignup}
            className="github-signup-button"
            disabled={isLoading}
          >
            <svg className="github-icon" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            Sign up with GitHub
          </button>
        </div>

        {/* Instagram Signup Button */}
        <div className="instagram-signup-section">
          <button
            onClick={handleInstagramSignup}
            className="instagram-signup-button"
            disabled={isLoading}
          >
            <svg className="instagram-icon" viewBox="0 0 24 24">
              <path
                fill="url(#instagram-gradient)"
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"
              />
              <defs>
                <linearGradient
                  id="instagram-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#833AB4" />
                  <stop offset="50%" stopColor="#E1306C" />
                  <stop offset="100%" stopColor="#F77737" />
                </linearGradient>
              </defs>
            </svg>
            Sign up with Instagram
          </button>
        </div>

        {/* Facebook Signup Button (Commented Out - Uncomment when ready to use) */}
        {/* <div className="facebook-signup-section">
          <button
            onClick={handleFacebookSignup}
            className="facebook-signup-button"
            disabled={isLoading}
          >
            <svg className="facebook-icon" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Sign up with Facebook
          </button>
        </div> */}

        {/* Apple Sign In Button (Commented Out - Uncomment when ready to use) */}
        {/* <div className="apple-signin-section">
          <button
            onClick={handleAppleSignup}
            className="apple-signin-button"
            disabled={isLoading}
          >
            <svg className="apple-icon" viewBox="0 0 24 24">
              <path
                fill="#000000"
                d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 17.03 1.37 11.48 3.51 6.8c.87-1.8 2.55-2.87 4.34-2.96 1.35-.07 2.63.72 3.54.72.91 0 2.62-.89 4.41-.76.75.03 2.87.31 4.23 2.3-.11.07-2.52 1.48-2.48 4.4.03 3.84 3.05 5.12 3.08 5.13-.03.07-.48 1.65-1.58 3.27zm-2.96-15.52c.73-.89 1.23-2.13 1.09-3.36-1.06.04-2.34.7-3.1 1.59-.68.8-1.28 2.08-1.12 3.29 1.16.09 2.35-.59 3.13-1.52z"
              />
            </svg>
            Sign up with Apple
          </button>
        </div> */}

        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "error" : ""}
              placeholder="Choose a username"
              disabled={isLoading}
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              placeholder="Create a password"
              disabled={isLoading}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <a href="#login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
