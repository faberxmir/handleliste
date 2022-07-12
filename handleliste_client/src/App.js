import './App.css';

import {useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(err => console.log(err));
  });

  return (
    <div className="App">
      <h1>{data}</h1>
    </div>
  );
}

export default App;
