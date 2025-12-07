const { useState, useEffect, useRef } = React;

// Countdown Component
const Countdown = ({ onComplete }) => {
  const calculateTimeLeft = () => {
    const targetDate = new Date('December 07, 2025 01:00:00');
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isFading, setIsFading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [countdownFaded, setCountdownFaded] = useState(false);

  const handleComplete = () => {
    setIsFading(true);
    setTimeout(() => {
      setCountdownFaded(true);
      setShowCelebration(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        handleComplete();
      }
    }, 1000);

    const handleKeyPress = (e) => {
      if (e.key === '' || e.key === '*') {
        handleComplete();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      {!countdownFaded && (
        <div className={`relative z-10 text-center transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white cute-font mb-8" style={{ fontWeight: 800 }}>
          Countdown to Your Birthday!
        </h1>
        <div className="flex space-x-4 sm:space-x-8 justify-center mb-8">
          <div className="text-center">
            <div className="text-3xl sm:text-6xl md:text-7xl font-bold text-white cute-font" style={{ fontWeight: 900 }}>
              {timeLeft.days}
            </div>
            <p className="text-pink-100 text-sm sm:text-lg">Days</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-6xl md:text-7xl font-bold text-white cute-font" style={{ fontWeight: 900 }}>
              {timeLeft.hours}
            </div>
            <p className="text-pink-100 text-sm sm:text-lg">Hours</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-6xl md:text-7xl font-bold text-white cute-font" style={{ fontWeight: 900 }}>
              {timeLeft.minutes}
            </div>
            <p className="text-pink-100 text-sm sm:text-lg">Minutes</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-6xl md:text-7xl font-bold text-white cute-font" style={{ fontWeight: 900 }}>
              {timeLeft.seconds}
            </div>
            <p className="text-pink-100 text-sm sm:text-lg">Seconds</p>
          </div>
        </div>
        </div>
      )}
      
      {/* Celebration Effect */}
      {showCelebration && (
        <div className="absolute inset-0 z-20 pointer-events-none animate-fadeIn">
          {/* Fireworks */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              >
                <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg"></div>
              </div>
            ))}
            {[...Array(15)].map((_, i) => (
              <div
                key={`firework-${i}`}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${0.5 + Math.random() * 1}s`
                }}
              >
                <div className="w-1 h-1 bg-pink-400 rounded-full shadow-lg"></div>
              </div>
            ))}
          </div>
          
          {/* Celebration Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center animate-slideUp">
              <div className="text-6xl sm:text-8xl mb-4">🎉</div>
              <h2 className="text-3xl sm:text-5xl font-bold text-pink-300 cute-font mb-2" style={{ fontWeight: 900 }}>
                HAPPY BIRTHDAY!
              </h2>
              <p className="text-xl sm:text-3xl text-pink-100 cute-font" style={{ fontWeight: 700 }}>
                It's Your Special Day!
              </p>
            </div>
          </div>
          
          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={`confetti-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                  animation: `fall ${2 + Math.random() * 2}s linear ${Math.random() * 3}s infinite`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              >
                <div 
                  className="w-2 h-4 rounded-sm"
                  style={{
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'][Math.floor(Math.random() * 7)]
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in;
        }
        .animate-slideUp {
          animation: slideUp 1s ease-out;
        }
      `}</style>
    </div>
  );
};
const LockScreen = ({ onUnlock }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.toLowerCase() === '100724') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 fade-in">
      <div className="text-center max-w-md w-full">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 cute-font mb-4 fade-in" style={{ fontWeight: 800 }}>
            Enter the Code
          </h1>
          <p className="text-pink-500 cute-font slide-up" style={{ fontWeight: 600 }}>
            To unlock your special surprise
          </p>
        </div>        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code..."
            className="px-6 py-4 text-center text-xl font-bold bg-white/90 backdrop-blur-sm border-2 border-pink-200 rounded-full shadow-lg focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:scale-105 transition-all duration-300 cute-font"
            style={{ fontWeight: 700 }}
          />
          <br />
          <button
            type="submit"
            className=" bg-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cute-font hover:from-pink-500 hover:to-pink-600"
            style={{ fontWeight: 700 }}
          >
            Unlock
          </button>
        </form>
        
        {error && (
          <p className="text-red-500 mt-4 font-bold cute-font fade-in" style={{ fontWeight: 600 }}>
            Wrong code, try again!
          </p>
        )}
      </div>
    </div>
  );
};

// Opening Page Component
const OpeningPage = ({ onNext }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-pink-600 cute-font mb-4 sm:mb-2 fade-in px-2" style={{ fontWeight: 800 }}>
          Hi my love!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-pink-500 cute-font mb-8 sm:mb-12 slide-up px-2" style={{ fontWeight: 600 }}>
          I made something special for you
        </p>
        <button
          onClick={onNext}
          className="bg-pink-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:shadow-2xl hover:scale-110 transition-all duration-300 cute-font bounce-in hover:from-pink-500 hover:to-pink-600"
          style={{ fontWeight: 700 }}
        >
          Open Your Surprise
        </button>
      </div>
    </div>
  );
};

const PhotoGallery = ({ onNext }) => {
  const photos = [
    { src: './img/072aa258-468f-4ce5-869a-ef11772b01c7.jpg', caption: '' },
    { src: './img/249cecf7-ecc7-4d8c-8ae8-230c8d9c6087.jpg', caption: '' },
    { src: './img/4a9b76f3-a37a-40db-8afb-15ad680dbfce.jpg', caption: '' },
    { src: './img/510a9477-8e53-4225-b74d-d5afb4cb8a92.jpg', caption: '' },
    { src: './img/584fb871-7209-4854-8ff0-085dbca9fd44.jpg', caption: '' },
    { src: './img/621c4be5-52ff-41b9-b607-62d9071479ae.jpg', caption: '' },
    { src: './img/75b53c74-fa50-4bd0-a0a7-683c93776225.jpg', caption: '' },
    { src: './img/b34b5db6-787b-4de4-8a72-ef250b820fa5.jpg', caption: '' },
    { src: './img/ba0fbbdc-6b51-4a86-af9f-c556c3a9ab6e.jpg', caption: '' },
    { src: './img/d3c73ec1-7458-4d00-9596-bc01abf626b2.jpg', caption: '' },
    { src: './img/f875d1fd-2e96-4a7b-a6da-46e6dae2b1ce.jpg', caption: '' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [photos.length]);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      {/* Animated background gradient */}
      <div className="absolute inset-0"></div>
      
      <div className="max-w-sm sm:max-w-md lg:max-w-lg w-full fade-in relative z-10">
        <div className="text-center mb-2 sm:mb-3">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-pink-500 cute-font mb-1 sm:mb-2" style={{ fontWeight: 800 }}>
            Our Beautiful Memories
          </h2>
          <p className="text-pink-500 text-xs sm:text-sm cute-font" style={{ fontWeight: 600 }}>
            Every moment with you is precious
          </p>
        </div>
        
        <div className="relative">
          {/* Main photo display with 3D effect */}
          <div className="relative bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-1 sm:p-2 mb-2 sm:mb-3 transform transition-all duration-500" 
               style={{ 
                 boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.25)',
                 perspective: '1000px'
               }}>
            <div className="relative overflow-hidden rounded-md sm:rounded-lg" style={{ aspectRatio: '1/1' }}>
              <img
                src={photos[currentIndex].src}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-1000"
                style={{ 
                  filter: 'brightness(1.05) contrast(1.05)',
                  transformStyle: 'preserve-3d'
                }}
              />
              
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-1 sm:p-2 lg:p-3">
                <p className="text-white text-center text-xs sm:text-sm font-semibold cute-font" style={{ fontWeight: 600 }}>
                  Memory {currentIndex + 1} of {photos.length}
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-between items-center mb-1 sm:mb-2 px-1 sm:px-2">
            <button
              onClick={prevPhoto}
              className="group bg-pink-500 text-white px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 cute-font"
              style={{ fontWeight: 700 }}
            >
              <span className="group-hover:-translate-x-1 inline-block transition-transform">←</span> <span className="hidden sm:inline">Previous</span><span className="sm:hidden">Prev</span>
            </button>
            
            <div className="flex gap-0.5 sm:gap-1">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentIndex 
                      ? 'bg-pink-500 w-2 sm:w-2.5' 
                      : 'bg-pink-200 hover:bg-pink-300'
                  }`}
                  onClick={() => {
                    if (index !== currentIndex) {
                      setCurrentIndex(index);
                    }
                  }}
                />
              ))}
            </div>
            
            <button
              onClick={nextPhoto}
              className="group bg-pink-500 text-white px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 cute-font"
              style={{ fontWeight: 700 }}
            >
              <span className="hidden sm:inline">Next</span><span className="sm:hidden">Next</span> <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
            </button>
          </div>
          
          {/* Thumbnail preview strip */}
          <div className="flex gap-0.5 sm:gap-1 overflow-x-auto pb-1 pt-1 sm:pt-1.5 sm:pb-1.5 mb-2 sm:mb-3 px-1 scrollbar-hide">
            {photos.map((photo, index) => (
              <div
                key={index}
                onClick={() => {
                  if (index !== currentIndex) {
                    setCurrentIndex(index);
                  }
                }}
                className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-sm sm:rounded-md lg:rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  index === currentIndex 
                    ? 'ring-1 ring-pink-500 scale-105' 
                    : 'ring-0.5 ring-pink-200 hover:ring-1 hover:ring-pink-300'
                }`}
              >
                <img
                  src={photo.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onNext}
            className="bg-pink-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 cute-font bounce-in"
            style={{ fontWeight: 700 }}
          >
            Read My Letter
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
const BirthdayLetter = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full fade-in">
        <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10 border-2 border-pink-100 relative overflow-hidden max-h-[85vh] overflow-y-auto hide-scrollbar slideUpEnhanced">
          {/* Paper texture effect */}
          <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-pink-100 to-transparent pointer-events-none" />
          
          {/* Letter content */}
          <div className="relative">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-400 cute-font mb-3 sm:mb-4 slide-up px-2" style={{ fontWeight: 700 }}>
                Happy Birthday, My Love!
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-pink-300 rounded-full mx-auto" />
            </div>
            
            <div className="space-y-4 sm:space-y-5 text-gray-700 leading-relaxed cute-font fade-in text-sm sm:text-base">
              <p className="text-base sm:text-lg font-bold text-pink-400" style={{ fontWeight: 600 }}>
                My love,
              </p>
              
              <p style={{ fontWeight: 500 }}>
                Today is your special day, and I wanted to create something unique to show you just how much you mean to me. Words can hardly capture the depth of my feelings, but I'll try my best.
              </p>
              
              <p style={{ fontWeight: 500 }}>
                Every moment with you is a gift. You've brought so much joy, love, and light into my life. Your presence makes everything better, and I'm so grateful to celebrate another year of your beautiful existence.
              </p>
              
              <p style={{ fontWeight: 500 }}>
                On this birthday, I want you to know that you are loved beyond measure. You deserve all the happiness in the world, and I promise to do everything I can to make you smile every single day.
              </p>
              
              <p style={{ fontWeight: 500 }}>
                Here's to more adventures together, more laughter, more love, and countless memories yet to be made. As I continue to show you my love and commitment, know that you mean the world to me.
              </p>
              
              <div className="bg-gradient-to-r from-pink-50 to-pink-100/50 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl my-4 sm:my-6 border border-pink-200 shadow-sm">
                <p className="text-lg sm:text-xl font-bold text-pink-400 text-center cute-font" style={{ fontWeight: 700 }}>
                  I love you more than words can say! 💕
                </p>
              </div>
              
              <p className="text-right text-pink-400 mt-6 sm:mt-8  font-semibold text-sm sm:text-base" style={{ fontWeight: 600 }}>
                Forever yours,<br/>
                <span className="text-pink-500">Your loving Sean</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('countdown');

  const renderPage = () => {
    switch (currentPage) {
      case 'countdown':
        return <Countdown onComplete={() => setCurrentPage('locked')} />;
      case 'locked':
        return <LockScreen onUnlock={() => setCurrentPage('opening')} />;
      case 'opening':
        return <OpeningPage onNext={() => setCurrentPage('gallery')} />;
      case 'gallery':
        return <PhotoGallery onNext={() => setCurrentPage('letter')} />;
      case 'letter':
        return <BirthdayLetter />;
      default:
        return <Countdown onComplete={() => setCurrentPage('locked')} />;
    }
  };

  return <div>{renderPage()}</div>;
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
