import React from 'react';

const Skeleton = ({ className = '', count = 1 }) => {
  const skeletons = Array(count).fill(0).map((_, i) => (
    <div 
      key={i} 
      className={`bg-white/10 animate-pulse rounded-xl ${className}`}
    ></div>
  ));

  return count === 1 ? skeletons[0] : <>{skeletons}</>;
};

export default Skeleton;
