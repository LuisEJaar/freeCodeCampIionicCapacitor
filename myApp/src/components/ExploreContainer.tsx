import { useState } from 'react';
import './ExploreContainer.css';

interface ContainerProps { }



const ExploreContainer: React.FC<ContainerProps> = () => {
  const [count, setCount] = useState(0);
  
  function fireEvent() {
    console.log("clicked Me");
  }
  
  function increment() {
    setCount(count +1);
  }
  
  return (
    <div id="container">
      <strong>Ready to create an app?</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      <button typeof="button" className="btn btn-primary" onClick={fireEvent}>Click me</button>
      <button typeof="button" className="btn btn-primary" onClick={increment}>Second button</button>
      <div>{count}</div>
    </div>
  );
};

export default ExploreContainer;
