import React from 'react';
import './App.css';
import LibraryForm from './components/LibraryForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Gestión de Bibliotecas</h1>
      </header>
      <main className="App-main">
        <LibraryForm />
      </main>
    </div>
  );
}

export default App;
