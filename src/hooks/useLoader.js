import { useState } from 'react'

const useLoader = (loadersObj = {}) => {
  const [loader, setLoader] = useState(loadersObj);

  const updateLoader = (key, value) => {
    setLoader((curr) => ({
      ...curr,
      [key]: value
    })) 
  };

  return {
    loader,
    updateLoader
  }
}

export default useLoader