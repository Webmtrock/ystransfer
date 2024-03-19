import React, { useState, useEffect } from "react";

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);


    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {!isOnline && (
        <div className='fixed top-0 left-0 z-[999] w-full h-full bg-white'>
          <div className='w-full h-full relative'>
            <div className='absolute top-[20%] md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%]'>
              <div className='text-center text-lg tracking-wider py-5'>
                <span className='text-[24px] font-semibold text-black'>
                  Ops!
                </span>{" "}
                It Seems You Have Lost Internet Connection.
              </div>
              <div className='text-[120px] text-center'>&#128546;</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;
