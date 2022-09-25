import { useState, useLayoutEffect } from 'react'
import { screenResolutions } from '../constant/windowSize';

const useWindowResize = () => {

  const [size, setSize] = useState([0, 0]);
  const [screenMode, setScreenMode] = useState(null);


  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  
  }, []);

  useLayoutEffect(() => {
    Object.entries(screenResolutions).forEach((resolution) => {
      const min = resolution[1].min
      const max = resolution[1].max
      const key = resolution[0];
      
      if(min && max && size[0] >= min && size[0] <= max){
        setScreenMode(key);
      }else if(min && !max && size[0] > min){
        setScreenMode(key)
      }else if(max && !min && size[0] < max){
        setScreenMode(key);
      }
    })
  }, [size]);

  return {
    screenSize: size,
    screenMode
  };
}

export default useWindowResize