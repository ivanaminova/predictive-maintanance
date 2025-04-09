
import React from 'react';

const Archived = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-medium text-hpe-green animate-slideIn">Archived Projects</h2>
      <div className="p-6 border border-hpe-lightGray rounded-md bg-black/20 animate-slideIn" style={{ animationDelay: '0.1s' }}>
        <p className="text-gray-400">No archived projects yet.</p>
      </div>
    </div>
  );
};

export default Archived;
