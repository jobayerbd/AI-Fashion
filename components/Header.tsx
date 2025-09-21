import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/60 backdrop-blur-lg sticky top-0 z-10 p-4 text-center border-b border-slate-700">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        AI Fashion Stylist
      </h1>
      <p className="text-slate-400 mt-1">Create stunning virtual model photoshoots with AI</p>
    </header>
  );
};

export default Header;