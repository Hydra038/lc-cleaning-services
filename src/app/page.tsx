import Link from 'next/link';
import { CheckCircle, Star, ArrowRight, Shield, Clock, Users, Sparkles, Award, Zap, Heart, Phone, MapPin, Calendar, ThumbsUp, Crown, Target, Home, Building2, Key, Sofa, HardHat, ChevronRight, CheckCheck, Verified, MessageCircle, TrendingUp, Lightbulb } from 'lucide-react';

export default function Home() {
  const stats = [
    { number: "2,500+", label: "Happy Customers" },
    { number: "99.8%", label: "Satisfaction Rate" },
    { number: "5+ Years", label: "Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Fully Insured & Bonded",
      description: "Complete protection with comprehensive insurance coverage for your peace of mind."
    },
    {
      icon: Award,
      title: "Premium Quality Service",
      description: "Award-winning service using professional-grade equipment and eco-friendly products."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Available 24/7 including weekends and holidays. We work around your schedule."
    },
    {
      icon: CheckCheck,
      title: "100% Satisfaction Guarantee",
      description: "Not satisfied? We'll return within 24 hours to make it right, completely free."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Manchester City Centre",
      rating: 5,
      text: "L&C completely transformed my home! The attention to detail is incredible - they cleaned areas I didn't even know existed. Professional, reliable, and worth every penny.",
      avatar: "/api/placeholder/60/60",
      service: "Deep Cleaning",
      date: "2 weeks ago"
    },
    {
      name: "Marcus Thompson", 
      location: "Birmingham Business District",
      rating: 5,
      text: "Outstanding office cleaning service! Our workspace has never looked better. The team is punctual, thorough, and incredibly professional. Highly recommended!",
      avatar: "/api/placeholder/60/60",
      service: "Commercial Cleaning",
      date: "1 month ago"
    },
    {
      name: "Emma Rodriguez",
      location: "Leeds",
      rating: 5,
      text: "Thanks to L&C, I got my full security deposit back! Their end-of-tenancy service is phenomenal. Every corner was spotless. Absolutely brilliant service!",
      avatar: "/api/placeholder/60/60",
      service: "End of Tenancy",
      date: "3 weeks ago"
    }
  ];

  return (
    <>
      {/* Simple Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="text-center">
            {/* Simple Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full text-sm font-medium text-gray-600 mb-6 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Trusted by 2,500+ Happy Customers</span>
              <div className="flex space-x-1 ml-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            {/* Simple Headline */}
            <h1 className="hero-title">
              Looking for a reliable house cleaning service?
            </h1>
            
            <p className="hero-subtitle max-w-2xl mx-auto">
              Professional cleaning services for your home and office. 
              We deliver spotless results with <strong>100% satisfaction guaranteed</strong>.
            </p>
            
            {/* Simple CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://wa.me/447413069737"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="w-5 h-5" />
                Get Free Quote
                <ChevronRight className="w-5 h-5" />
              </a>
              
              <Link 
                href="/services"
                className="btn-secondary"
              >
                <Sparkles className="w-5 h-5" />
                View Our Services
              </Link>
            </div>
            
            {/* Simple Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div className="text-center">
                <div className="service-icon mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Fully Insured</h3>
                <p className="text-sm text-gray-600">Complete protection & peace of mind</p>
              </div>
              
              <div className="text-center">
                <div className="service-icon mx-auto mb-4">
                  <CheckCheck className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Quality Guarantee</h3>
                <p className="text-sm text-gray-600">100% satisfaction or money back</p>
              </div>
              
              <div className="text-center">
                <div className="service-icon mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Same Day Service</h3>
                <p className="text-sm text-gray-600">Available 7 days a week</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Simple Stats Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our local house cleaning services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are the premier provider of domestic & home cleaning throughout the UK. 
              Specialising in providing unbeatable house cleaning to the highest possible standard.
            </p>
          </div>
          
          {/* Simple Service Grid */}
          <div className="service-grid">
            {features.map((feature, index) => (
              <div key={index} className="service-card">
                <div className="service-icon mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Simple Guarantee Section */}
          <div className="mt-12 text-center">
            <div className="simple-card max-w-2xl mx-auto p-8">
              <div className="service-icon mb-4">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">100% Satisfaction Guarantee</h3>
              <p className="text-gray-600 mb-6">
                We stand behind our work with complete confidence. Not satisfied? 
                We'll return within 24 hours to make it right – completely free.
              </p>
              <Link href="/services" className="btn-primary">
                <Target className="w-5 h-5" />
                View All Services
              </Link>
            </div>
          </div>
          
          {/* Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover-lift">
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="grid-2 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-2xl lg:text-3xl font-display text-neutral-900 mb-6">
                About L&C Cleaning Services
              </h2>
              <p className="text-base text-neutral-600 mb-6 font-body">
                L&C Cleaning Services LTD is a registered UK company (Company No. 16561686) 
                specializing in premium cleaning services across England and Wales. We take 
                pride in delivering exceptional cleaning solutions for both domestic and 
                commercial clients.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <span className="text-neutral-700 font-body">Registered and fully compliant UK company</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <span className="text-neutral-700 font-body">Comprehensive insurance coverage</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <span className="text-neutral-700 font-body">Eco-friendly cleaning products</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <span className="text-neutral-700 font-body">100% satisfaction guarantee</span>
                </li>
              </ul>
              <Link
                href="/about"
                className="text-blue-700 hover:text-blue-800 font-semibold inline-flex items-center"
              >
                Learn more about us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="card gradient-service h-96 flex items-center justify-center p-8 animate-fade-in-right">
              {/* Professional Company Illustration */}
              <div className="text-center">
                <div className="relative mb-8">
                  {/* Company Building Icon */}
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6">
                    <Building2 className="w-16 h-16 text-white" />
                  </div>
                  
                  {/* Floating service icons */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Sparkles className="w-6 h-6 text-slate-800" />
                  </div>
                  <div className="absolute -top-2 -right-6 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-200">
                    <Shield className="w-5 h-5 text-slate-800" />
                  </div>
                  <div className="absolute -bottom-2 left-2 w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-500">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* Company Information */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/50">
                  <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-2">L&C CLEANING SERVICES LTD</h3>
                  <p className="text-sm lg:text-base text-slate-600 font-medium mb-4">Company No. 16561686</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs lg:text-sm text-slate-500">
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Registered UK Company
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      500+ Happy Clients
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                PREMIUM SERVICES
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">
                Our 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Expertise
                </span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                From routine maintenance to specialized deep cleaning, we deliver exceptional results 
                with state-of-the-art equipment and eco-friendly solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Domestic Cleaning",
                  price: "From £25/hour",
                  icon: "🏠",
                  gradient: "from-emerald-400 to-teal-600",
                  description: "Transform your home into a pristine sanctuary with our comprehensive residential cleaning services.",
                  features: ["Weekly/Monthly Service", "Deep Cleaning", "Kitchen & Bathroom Specialist", "Eco-Friendly Products"]
                },
                {
                  title: "Office Cleaning",
                  price: "From £30/hour", 
                  icon: "🏢",
                  gradient: "from-blue-400 to-indigo-600",
                  description: "Maintain a professional, healthy workspace that impresses clients and boosts productivity.",
                  features: ["Daily/Weekly Plans", "Complete Sanitization", "Carpet & Upholstery", "Window & Glass Cleaning"]
                },
                {
                  title: "End of Tenancy",
                  price: "From £150",
                  icon: "🔑",
                  gradient: "from-purple-400 to-pink-600",
                  description: "Guarantee your deposit return with our comprehensive move-out cleaning service.",
                  features: ["Deposit Back Guarantee", "Full Property Deep Clean", "All Appliances Included", "Professional Certification"]
                },
                {
                  title: "Carpet Cleaning",
                  price: "From £40/room",
                  icon: "🧽",
                  gradient: "from-orange-400 to-red-600",
                  description: "Revitalize your carpets and upholstery with our advanced steam cleaning technology.",
                  features: ["Hot Water Extraction", "Stain & Odor Removal", "Pet-Safe Treatment", "Quick Dry Technology"]
                },
                {
                  title: "Deep Cleaning",
                  price: "From £200",
                  icon: "✨",
                  gradient: "from-yellow-400 to-orange-600",
                  description: "Intensive, top-to-bottom cleaning that reaches every corner and crevice of your space.",
                  features: ["Complete Property Reset", "Inside All Appliances", "Detailed Surface Clean", "Full Sanitization"]
                },
                {
                  title: "Post-Construction",
                  price: "Custom Quote",
                  icon: "🔨",
                  gradient: "from-slate-400 to-slate-700",
                  description: "Specialized cleaning to remove construction debris and prepare your newly built or renovated space.",
                  features: ["Dust & Debris Removal", "Paint Splatter Cleanup", "Final Polish & Detail", "Move-In Ready Finish"]
                }
              ].map((service, index) => (
                <div key={index} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 hover:border-slate-300 transform hover:-translate-y-2">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Service icon header */}
                  <div className="relative p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} text-white text-3xl font-bold shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg lg:text-xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                        {service.title}
                      </h3>
                      <span className={`text-sm lg:text-base font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.price}
                      </span>
                    </div>
                    <p className="text-sm lg:text-base text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Features list */}
                  <div className="px-8 pb-8">
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-slate-700">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center mr-3 flex-shrink-0`}>
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <span className="text-sm lg:text-base font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Learn More Button */}
                    <Link 
                      href="/services"
                      className={`group/btn relative w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg text-white py-4 px-6 rounded-xl font-bold text-center block transition-all duration-300 transform hover:scale-105 overflow-hidden`}
                    >
                      <span className="relative z-10">Learn More</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                    </Link>
                  </div>
                  
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.gradient} opacity-10 transform rotate-45 translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-500`}></div>
                </div>
              ))}
            </div>
            
            {/* Call to action */}
            <div className="text-center mt-16">
              <p className="text-base lg:text-lg text-slate-600 mb-8">
                Don't see what you're looking for? We offer custom cleaning solutions for any need.
              </p>
              <a 
                href="https://wa.me/447413069737"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-bold text-base lg:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.130-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                </svg>
                WhatsApp for Custom Quote
              </a>
            </div>
          </div>
        </section>

      {/* Revolutionary Testimonials Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-xl border border-yellow-400/30 text-yellow-300 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl">
              <Heart className="w-5 h-5 text-yellow-400" />
              CUSTOMER SUCCESS STORIES
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
              Life-Changing
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Results
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Real stories from real customers whose lives we've transformed through 
              our revolutionary cleaning services.
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group relative">
                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 relative overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-black text-white text-lg">{testimonial.name}</h4>
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <MapPin className="w-4 h-4" />
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        {testimonial.service}
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{animationDelay: `${i * 100}ms`}} />
                        ))}
                      </div>
                      <span className="ml-2 text-lg text-yellow-400 font-bold">5.0</span>
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-slate-200 text-base leading-relaxed mb-6 relative">
                      <span className="text-4xl text-yellow-400/30 absolute -top-2 -left-1 leading-none font-serif">"</span>
                      <span className="relative z-10 italic">{testimonial.text}</span>
                      <span className="text-4xl text-yellow-400/30 absolute -bottom-4 -right-1 leading-none font-serif">"</span>
                    </blockquote>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Verified Customer</span>
                      </div>
                      <div className="text-sm text-slate-500">{testimonial.date}</div>
                    </div>
                  </div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{padding: '2px'}}>
                    <div className="w-full h-full bg-slate-900 rounded-3xl"></div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-70 animate-ping group-hover:animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 animate-ping delay-300 group-hover:animate-pulse"></div>
              </div>
            ))}
          </div>
          
          {/* Powerful CTA */}
          <div className="text-center mt-20">
            <p className="text-xl text-slate-300 mb-8">
              Ready to join our family of satisfied customers?
            </p>
            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contact"
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 shadow-2xl hover:shadow-yellow-500/30 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  Get Free Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </Link>
              
              <a 
                href="https://wa.me/447413069737"
                target="_blank"
                rel="noopener noreferrer"
                className="group border-2 border-white/40 bg-white/10 backdrop-blur-xl text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 shadow-2xl hover:shadow-white/20 transform hover:-translate-y-2 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.130-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                  </svg>
                  WhatsApp Us Now
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-15 animate-pulse delay-700"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-6 py-3 rounded-full text-sm font-bold shadow-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Limited Time Offer
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Ready to Experience
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Premium Clean?
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of satisfied customers who trust L&C for their cleaning needs. 
            <span className="text-yellow-400 font-semibold"> Contact us today for professional service!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://wa.me/447413069737"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.130-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                </svg>
                WhatsApp Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </a>
            
            <Link
              href="/contact"
              className="group border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Get Free Quote
              </span>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold">500+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="font-semibold">5-Star Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold">Fully Insured</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
