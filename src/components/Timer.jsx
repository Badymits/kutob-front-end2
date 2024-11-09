/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";


const Timer = ({time}) => {
  const [count, setCount] = useState(parseInt(time));

  useInterval(() => {
    setCount(count - 1);
  }, 1000, count);

  
  return <h1 className="text-5xl text-center py-5 font-metaltext">Time left: {count}s</h1>;
}

function useInterval(callback, delay, count) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    // timer should stop when it reaches zero
    if (count != 0){
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    
  }, [delay, count]);
}

export default Timer