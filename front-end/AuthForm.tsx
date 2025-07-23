import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User, Mail, Lock, UserPlus, LogIn, Star, ChevronLeft, ChevronRight, Users, GraduationCap, Heart } from 'lucide-react';

export default function AuthForm() {
  const { login, signup, loading, error, clearError } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | 'parent' | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'student' as 'teacher' | 'student' | 'parent',
  });

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "5th Grade Teacher",
      rating: 5,
      text: "Zanaya has transformed my classroom! The point system keeps students engaged and motivated.",
      avatar: "SJ"
    },
    {
      name: "Maria Rodriguez",
      role: "Parent",
      rating: 5,
      text: "I love being able to see my daughter's progress in real-time. Great communication with teachers!",
      avatar: "MR"
    },
    {
      name: "David Chen",
      role: "Principal",
      rating: 5,
      text: "Our school has seen amazing improvements in student behavior since implementing Zanaya.",
      avatar: "DC"
    },
    {
      name: "Emily Wilson",
      role: "3rd Grade Teacher",
      rating: 5,
      text: "The parent communication features are incredible. Parents are more engaged than ever!",
      avatar: "EW"
    }
  ];

  const carouselSlides = [
    {
      title: "Build classroom community",
      description: "Create a positive classroom culture with our engaging point system and behavior tracking.",
      image: "🏫",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Connect with families",
      description: "Keep parents informed with real-time updates, photos, and messages about their child's day.",
      image: "👨‍👩‍👧‍👦",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Celebrate student growth",
      description: "Recognize achievements, track progress, and motivate students with meaningful feedback.",
      image: "🌟",
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Save time every day",
      description: "Streamline classroom management with easy-to-use tools that work on any device.",
      image: "⏰",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  const roleOptions = [
    {
      role: 'teacher' as const,
      title: 'Teacher',
      description: 'Manage classes and track student progress',
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'from-blue-600 to-indigo-700'
    },
    {
      role: 'student' as const,
      title: 'Student',
      description: 'View your points and achievements',
      icon: User,
      color: 'from-emerald-500 to-teal-600',
      hoverColor: 'from-emerald-600 to-teal-700'
    },
    {
      role: 'parent' as const,
      title: 'Parent',
      description: 'Stay connected with your child\'s learning',
      icon: Heart,
      color: 'from-purple-500 to-pink-600',
      hoverColor: 'from-purple-600 to-pink-700'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      if (isSignup) {
        await signup(formData.email, formData.password, formData.firstName, formData.lastName, selectedRole || formData.role);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (error) {
      // Error is already handled in the auth context
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const handleRoleSelect = (role: 'teacher' | 'student' | 'parent') => {
    setSelectedRole(role);
    setFormData(prev => ({ ...prev, role }));
    setShowLogin(true);
  };

  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <button
              onClick={() => setShowLogin(false)}
              className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to role selection
            </button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">Zanaya</h1>
            <h2 className="text-2xl font-bold text-gray-900">
              {isSignup ? `Create ${selectedRole} account` : `Welcome back, ${selectedRole}!`}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isSignup ? 'Join the educational community' : 'Sign in to your account'}
            </p>
        </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {isSignup && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="sr-only">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required={isSignup}
                        className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="sr-only">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required={isSignup}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isSignup ? 'new-password' : 'current-password'}
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {isSignup ? (
                    <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                  ) : (
                    <LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                  )}
                </span>
                {loading ? 'Processing...' : (isSignup ? 'Create account' : 'Sign in')}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                onClick={() => {
                  setIsSignup(!isSignup);
                  clearError();
                }}
              >
                {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Zanaya
          </h1>
          <button
            onClick={() => setShowLogin(true)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Sign in
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Bring out the
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"> best </span>
            in every student
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Help students develop skills, build character, and create a positive classroom community with Zanaya's engaging platform.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
  {roleOptions.map((option) => {
    const Icon = option.icon;
    return (
      <button
        key={option.role}
        onClick={() => handleRoleSelect(option.role)}
        className={`group relative p-6 rounded-2xl text-white bg-gradient-to-br ${option.color} hover:${option.hoverColor} shadow-md transition-transform transform hover:-translate-y-1`}
      >
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">{option.title}</h3>
          <p className="text-sm opacity-90">{option.description}</p>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </button>
    );
  })}
</div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why educators love Zanaya</h3>
            <p className="text-lg text-gray-600">Discover how Zanaya transforms classrooms around the world</p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselSlides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className={`bg-gradient-to-br ${slide.color} p-12 text-white text-center min-h-[400px] flex flex-col justify-center`}>
                      <div className="text-6xl mb-6">{slide.image}</div>
                      <h4 className="text-3xl font-bold mb-4">{slide.title}</h4>
                      <p className="text-xl opacity-90 max-w-2xl mx-auto">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Loved by educators worldwide</h3>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-lg font-semibold text-gray-700">4.9/5 from 50,000+ reviews</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">"{review.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{review.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-600">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to transform your classroom?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of educators who are already using Zanaya</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleRoleSelect('teacher')}
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Get started as Teacher
            </button>
            <button
              onClick={() => handleRoleSelect('parent')}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-200"
            >
              Join as Parent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
