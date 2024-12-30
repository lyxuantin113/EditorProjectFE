import './App.css';
import Container from './Functional/FuncContainer';
import {  useState } from 'react';
function App() {

  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShow(!show)}>Show</button>
      {show && <Container />}
    </div>
  );
}

export default App;
