import './App.css';
import ServerForm from './components/serverForm/ServerForm';
import Table from './components/table/Table';

function App() {
  return (
    <div className="App container">
      <h1 className='text-center mt-2'>Severly</h1>
      <Table />
      {/* <ServerForm /> */}
    </div>
  );
}

export default App;
