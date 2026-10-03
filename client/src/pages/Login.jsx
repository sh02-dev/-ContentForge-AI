import React, { useState } from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/state/authState';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  async function handleLogin(e) {
    if (e) e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter your email and password");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/auth/login", {
        email: email.trim(),
        password
      }, { withCredentials: true });

      setAuth({
        isLoggedIn: true,
        username: response.data.user.full_name,
        loading: false,
        userId: response.data.user.id
      });

      toast.success(response.data.message || "Login successful");
      navigate("/ai");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login failed";

      toast.error(message);
      console.warn("Login attempt failed:", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-5rem)] w-full pt-24 pb-12 px-4'>
      <div className='flex flex-col border-2 max-w-md w-full items-center justify-center border-gray-800 rounded-xl p-6 sm:p-8 bg-[#171616]/90 shadow-[0_0_25px_rgba(168,85,247,0.25)]'>

        <div className='w-full'>
          <h1 className='font-semibold text-3xl mb-6 text-center text-white'>Log In to Your Account</h1>

          <button
            type='button'
            className='flex border border-gray-600 hover:border-gray-400 px-4 py-2 mb-6 items-center justify-center rounded-lg w-full h-10 transition-colors bg-[#1f1f23]'
          >
            <img src='https://www.svgrepo.com/show/355037/google.svg' alt='Google'
              className='w-5 h-5 mr-3' />
            <span className='text-sm text-gray-200 font-medium'>Continue with Google</span>
          </button>
        </div>

        <div className="flex items-center gap-4 w-full mb-6 ">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="text-gray-400 text-xs">or continue with email</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <form onSubmit={handleLogin} className='w-full flex flex-col items-center'>
          <div className='w-full mb-4'>
            <div className='flex items-center border border-gray-700 rounded-lg px-3.5 py-1.5 gap-3 bg-[#1e1e24] focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all'>
              <HiOutlineMail className='text-gray-400 h-5 w-5 shrink-0' />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                className='h-8 w-full bg-transparent text-gray-200 focus:outline-none text-sm placeholder-gray-500'
                placeholder='Enter your Email'
                required
              />
            </div>
          </div>

          <div className='w-full mb-3'>
            <div className='flex items-center border border-gray-700 rounded-lg px-3.5 py-1.5 gap-3 bg-[#1e1e24] focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all'>
              <CiLock className='text-gray-400 h-5 w-5 shrink-0' />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                value={password}
                className='h-8 w-full bg-transparent text-gray-200 focus:outline-none text-sm placeholder-gray-500'
                placeholder='Enter your Password'
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='text-gray-400 hover:text-gray-200 focus:outline-none shrink-0 cursor-pointer'
              >
                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>

            <div className='text-purple-400 hover:text-purple-300 mt-2 text-end cursor-pointer text-xs hover:underline transition-colors'>
              <Link to="/ai">forget password ?</Link>
            </div>
          </div>

          <div className='w-full flex justify-center mt-4'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='border border-purple-500/50 rounded-full w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-center'
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>

        <div className='flex justify-center mt-6'>
          <div className='text-gray-400 text-xs'>
            Don't have an account? <span className='ml-1 text-purple-400 hover:text-purple-300 hover:underline'><Link to="/signup">sign up for free</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;