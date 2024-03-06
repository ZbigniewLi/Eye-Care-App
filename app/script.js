import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';


function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay; 
}



const App = () => { 
  const [status,setStatus] = useState('off')
  const [time,setTime] = useState(0)
  const [timer,setTimer] = useState(null)

  const startTimer = () => {
    setTime(1200);
    setStatus('work');
    setTimer(setInterval(() => {
      setTime(time => time - 1);
    },
    1000));
}
const stopTimer = () => {
  clearInterval(timer)
  setTimer(null)
  setStatus('off')
}

const closeApp =() => {
  window.close()
}

useEffect(()=>{
  if (time === 0){
    if (status === 'work'){
      setTime(20)
      setStatus('rest')

    } else if (status === 'rest') {
      setTime(1200)
      setStatus('work')   
    }
  }
},[time,status])

  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      { status === 'work' && (<img src="./images/work.png" />)}
      { status === 'rest' && (<img src="./images/rest.png" />)}
      { status !== 'off' && (
        <div className="timer">
          {secondsToHms(time)}
        </div>
      )}
      { status === 'off' && (<button onClick= {startTimer} className="btn">Start</button>)}
      { status !== 'off' && (<button onClick={stopTimer} className="btn">Stop</button>)}
      <button onClick={closeApp} className="btn btn-close">X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
