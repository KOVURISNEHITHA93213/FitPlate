import React, { useEffect, useRef } from 'react';

interface HeroProps {
  onStartTracking: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartTracking }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const x = (clientX - left - width / 2) / 25;
      const y = (clientY - top - height / 2) / 25;
      
      container.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      container.style.transition = 'transform 0.5s ease-out';
    };

    const handleMouseEnter = () => {
      container.style.transition = 'none';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <div 
        ref={containerRef}
        className="text-center max-w-4xl px-4 transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <h1 
          className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
          style={{ transform: 'translateZ(50px)' }}
        >
          Transform Your Fitness Journey
        </h1>
        <p 
          className="text-2xl mb-8 text-gray-300"
          style={{ transform: 'translateZ(30px)' }}
        >
          Track your workouts, monitor nutrition, and achieve your fitness goals with our comprehensive fitness tracking platform
        </p>
        <div 
          className="space-y-4"
          style={{ transform: 'translateZ(40px)' }}
        >
          <button
            onClick={onStartTracking}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xl py-4 px-12 rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Journey
          </button>
          <p className="text-gray-400 text-sm">
            Join thousands of others who have already transformed their lives
          </p>
        </div>
        
        {/* Feature Highlights */}
        <div 
          className="mt-16 grid md:grid-cols-3 gap-8 text-left"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-orange-500">Workout Tracking</h3>
            <p className="text-gray-300">Log your exercises, sets, and reps with our intuitive workout tracker</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-orange-500">Nutrition Monitoring</h3>
            <p className="text-gray-300">Track your daily nutrition with our comprehensive food database</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-orange-500">Progress Analytics</h3>
            <p className="text-gray-300">Visualize your progress with detailed charts and insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
