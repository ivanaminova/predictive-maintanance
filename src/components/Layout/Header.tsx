
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const logoByTheme = theme === 'light' ? "/HPE_Logo_Light.png" : "/HPE_Logo_Dark.png";

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-background border-b border-border w-full">
      <div className="flex items-center gap-3">
        <img 
          src={logoByTheme} 
          alt="HPE Logo" 
          className="h-8 w-auto"
        />
        <h1 className="text-primary font-semibold tracking-wide text-2xl">Predictive Maintanence</h1>
      </div>
      
      <button 
        className="flex items-center gap-2 px-3 py-1.5 rounded text-sm text-foreground hover:bg-accent transition-colors"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? (
          <>
            <Sun size={16} />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={16} />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    </header>
  );
};

export default Header;
