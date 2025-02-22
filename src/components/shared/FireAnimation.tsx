import React from "react";

const FireAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-4 h-4 ml-2 opacity-80">
        <div className="absolute w-full h-full fire-center">
          <div className="absolute w-full h-full main-fire"></div>
          <div className="absolute top-2/3 left-1/2 w-2.5 h-2.5 particle-fire"></div>
        </div>

        <div className="absolute w-full h-full fire-right">
          <div className="absolute top-[15%] -right-1/4 w-4/5 h-4/5 main-fire"></div>
          <div className="absolute top-[45%] left-1/2 w-3.5 h-3.5 particle-fire"></div>
        </div>

        <div className="absolute w-full h-full fire-left">
          <div className="absolute top-[15%] -left-1/4 w-4/5 h-4/5 main-fire"></div>
          <div className="absolute top-[10%] left-[20%] w-2.5 h-2.5 particle-fire"></div>
        </div>

        <div className="absolute top-1/3 left-1/4 w-3/4 h-3/4 fire-bottom">
          <div className="absolute w-full h-full main-fire"></div>
        </div>
      </div>

      <style>
        {`
          @keyframes scaleUpDown {
            0%, 100% { transform: scaleY(1) scaleX(1); }
            50%, 90% { transform: scaleY(1.1); }
            75% { transform: scaleY(0.95); }
            80% { transform: scaleX(0.95); }
          }

          @keyframes shake {
            0%, 100% { transform: skewX(0) scale(1); }
            50% { transform: skewX(5deg) scale(0.9); }
          }

          @keyframes particleUp {
            0% { opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; top: -100%; transform: scale(0.5); }
          }

          @keyframes glow {
            0%, 100% { background-color: #3cff1a; }
            50% { background-color: #3cff1e; }
          }

          .main-fire {
            background: radial-gradient(farthest-corner at 10px 0, #3cff1e 0%, #3cff1e 95%);
            transform: scaleX(0.8) rotate(45deg);
            border-radius: 0 40% 60% 40%;
            filter: drop-shadow(0 0 10px #3cff1e);
          }

          .particle-fire {
            background-color: #3cff1e;
            border-radius: 50%;
            filter: drop-shadow(0 0 10px #3cff1e);
            animation: particleUp 2s infinite ease-out;
          }

          .fire-center { animation: scaleUpDown 3s infinite ease-out; }
          .fire-right { animation: shake 2s infinite ease-out; }
          .fire-left { animation: shake 3s infinite ease-out; }
          .fire-bottom .main-fire { filter: blur(10px); animation: glow 2s infinite ease-out; }
        `}
      </style>
    </div>
  );
};

export default FireAnimation;
