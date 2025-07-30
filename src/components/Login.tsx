import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Users, UserIcon, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type LoginType = 'admin' | 'data-entry-operator';

const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<LoginType>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading, user } = useAuth();

  // Check if user is already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(email, loginType);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const getThemeColors = () => {
    if (loginType === 'admin') {
      return {
        gradient: 'from-blue-600 to-blue-800',
        primary: 'bg-blue-600 hover:bg-blue-700',
        focus: 'focus:ring-blue-500',
        text: 'text-blue-600',
        textHover: 'hover:text-blue-500',
        icon: 'text-blue-500'
      };
    } else {
      return {
        gradient: 'from-purple-600 to-purple-800',
        primary: 'bg-purple-600 hover:bg-purple-700',
        focus: 'focus:ring-purple-500',
        text: 'text-purple-600',
        textHover: 'hover:text-purple-700',
        icon: 'text-purple-600'
      };
    }
  };

  const theme = getThemeColors();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
      {/* Left Section - Portal Details */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/3 right-10 w-12 h-12 border border-white rounded-full"></div>
          <div className="absolute bottom-1/3 left-20 w-8 h-8 border border-white rounded-full"></div>
        </div>

        {/* Main Title - Centered */}
        <div className="text-center z-10">
          <div className="flex justify-center mb-8">
            <Shield className="h-20 w-20 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 fade-in">
            एडमिन पोर्टल
          </h1>
          <p className="text-xl text-white/90 max-w-lg leading-relaxed mx-auto mb-4">
            छांव स्वास्थ्य शिविर प्रबंधन प्रणाली
          </p>
          <p className="text-lg text-white/80 max-w-lg leading-relaxed mx-auto">
            स्वास्थ्य शिविरों का संपूर्ण प्रबंधन
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen bg-gray-50">
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Logo and Header (mobile only) */}
            <div className="text-center lg:hidden mb-6">
              <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  <Shield className="h-10 w-10 text-blue-600" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">एडमिन पोर्टल</h1>
                    <p className="text-xs text-gray-600">छांव स्वास्थ्य शिविर</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Type Selection */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 rounded-xl">
                <button
                  type="button"
                  onClick={() => setLoginType('admin')}
                  className={`flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    loginType === 'admin'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  एडमिन लॉगिन
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType('data-entry-operator')}
                  className={`flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    loginType === 'data-entry-operator'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  डॉक्टर लॉगिन
                </button>
              </div>
            </div>

            {/* Login Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {loginType === 'admin' ? 'एडमिन लॉगिन' : 'डॉक्टर लॉगिन'}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {loginType === 'admin' 
                  ? 'शिविर प्रबंधन के लिए लॉगिन करें'
                  : 'स्वास्थ्य शिविर प्रबंधन के लिए लॉगिन करें'
                }
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {loginType === 'admin' ? 'ईमेल पता / यूजर आईडी' : 'ईमेल पता / डॉक्टर आईडी'}
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500 ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="अपना ईमेल दर्ज करें"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {loginType === 'admin' ? (
                        <Shield className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Heart className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    पासवर्ड
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500 ${
                        errors.password ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="अपना पासवर्ड लिखें"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-lg">🔒</span>
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-gray-600">
                      मुझे याद रखें (30 दिन)
                    </label>
                  </div>
                  <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                    पासवर्ड भूल गए?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner mr-3"></div>
                      लॉगिन हो रहा है...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🔐</span>
                      लॉगिन करें
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* Security Note */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500 flex items-center justify-center">
                <span className="mr-1">🔒</span>
                यह एक सुरक्षित {loginType === 'admin' ? 'प्रशासनिक' : 'चिकित्सा'} पोर्टल है
              </p>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                Powered by <span className="font-semibold">SSIPMT, Raipur</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
