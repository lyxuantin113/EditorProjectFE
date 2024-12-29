import './App.css';
import Blur from './Functional/Blur/BlurImage';
import {  useState } from 'react';
function App() {

  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShow(!show)}>Show</button>
      {show && <Blur />}
    </div>
  );
}

export default App;
