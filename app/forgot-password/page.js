'use client';
import { postForgotPassword } from '@/_utils/forgotPassword';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('Email is required');
      return;
    } else {
      setEmailError(null);
    }

    setIsLoading(true);

    try {
      const response = await postForgotPassword({ email });

      // Always get response data first
      const responseData = await response.json();
      console.log('Response data:', responseData);

      // Check for successful response using success property
      if (response.ok && responseData.success) {
        setEmail('');
        toast.success(`${responseData.status}`, {
          position: 'bottom-right',
        });

        setSuccessMessage(`Reset password link is send your email.`);

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        // Handle error response
        console.log('Error response:', responseData);

        let errorMessage = 'Failed to send reset email. Please try again.';

        // Check for specific error structure
        if (responseData.message) {
          errorMessage = responseData.message;
        } else if (
          responseData.errors &&
          responseData.errors.email &&
          responseData.errors.email[0]
        ) {
          errorMessage = responseData.errors.email[0];
        }

        setEmailError(errorMessage);

        // Clear error message after 5 seconds
        setTimeout(() => {
          setEmailError(null);
        }, 8000);

        toast.error(errorMessage, {
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      const errorMessage =
        'Network error. Please check your connection and try again.';
      setEmailError(errorMessage);

      // Clear error message after 10 seconds
      setTimeout(() => {
        setEmailError(null);
      }, 8000);

      toast.error(errorMessage, {
        position: 'bottom-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-blue-400 rounded-full -top-40 -right-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bg-indigo-400 rounded-full -bottom-40 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bg-purple-400 rounded-full top-40 left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md">
        {/* Logo/Brand section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Forgot Password
          </h2>
          <p className="text-base text-gray-600">
            Please provide your account email address for reset your password.
          </p>
        </div>

        {/* Form card */}
        <div className="p-8 border shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl border-white/20">
          {successMessage && (
            <div className="px-4 py-3 mb-6 text-green-700 bg-green-100 border border-green-300 rounded-xl animate-fade-in">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                {successMessage}
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={submitHandler}>
            {/* Email input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourmail@gmail.com"
                  className="w-full py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 transition-all duration-200 border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white"
                />
              </div>
              {emailError && (
                <small className="block mt-1 text-sm text-red-500 animate-fade-in">
                  {emailError}
                </small>
              )}
              <p className="mt-1 text-xs text-gray-500">
                We will send a password reset link to this email
              </p>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center">
                  <span>{isLoading ? 'Sending...' : 'Submit'}</span>
                  {isLoading && (
                    <svg
                      className="w-4 h-4 ml-2 text-white animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white">or</span>
              </div>
            </div>

            {/* Back to login */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-500"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Back to sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
