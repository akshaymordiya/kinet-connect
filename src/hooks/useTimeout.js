import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react'

const useTimeout = (callback, delay, preventOnMount = false, preventAutoTrigger = false) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(null);
  const preventSetTimeoutOnMount = useRef(preventOnMount)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)  
  }, [timeoutRef.current]);

  useEffect(() => {
    if(preventSetTimeoutOnMount.current){
      preventSetTimeoutOnMount.current = false
    }else if(!preventAutoTrigger) {
      set();
    }

    return () => {
      if(!preventAutoTrigger){
        clear();
      }
    };
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [set, clear]);

  return {
    set,
    reset,
    clear,
  }
}

export default useTimeout