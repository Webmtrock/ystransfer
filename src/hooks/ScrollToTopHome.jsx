import React, { useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const ScrollToTopHome = () => {
  const [scrollTop, setScrollTop] = useState(false);

  const scrollToTop = () => {
    //For Window Smooth Scroll when User click on Scroll To Top Button
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    //For Toggeling True Or False One Time When Screen is Loading
    const ScrollToTp = () => {
      if (window.pageYOffset > 400) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    };

    window.addEventListener("scroll", ScrollToTp); //ScrollToTop Function is run on "Scroll"

    return () => window.removeEventListener("scroll", ScrollToTp); //Removing Event Listener After user Clicked on Scroll To Top Button
  }, []);

  return (
    <div>
      {scrollTop && (
        <div className='fixed bottom-40 md:bottom-20  md:top-[400px] right-4 md:right-10'>
          <BsFillArrowUpCircleFill
            onClick={scrollToTop}
            className='text-yellow-500 cursor-pointer animate'
            size={45}
          />
        </div>
      )}
    </div>
  );
};

export default ScrollToTopHome;
