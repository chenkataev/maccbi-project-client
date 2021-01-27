import React from 'react';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';

function App() {
  const isLoading = useSelector((state: any) => state.mainAppReducer.isLoading)
  return (
    <div>
      {isLoading && <div>
          Loading...
      </div>}
      <NavBar />
    </div>
  );
}

export default App;
