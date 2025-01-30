import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Ficha from './components/ficha';
import { IoArrowBack } from 'react-icons/io5'

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
};

const backIconStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  cursor: 'pointer',
};

const App = () => {
  const [showSelection, setShowSelection] = useState(true);
  const navigate = useNavigate();  // Usando o useNavigate aqui

  const handlePlayerSelect = (playerNumber) => {
    // Esconde a tela de seleção e vai para a ficha do jogador
    setShowSelection(false);
    navigate(`/ashen/ficha/${playerNumber}`);
  };

  const handleBackToSelection = () => {
    // Volta para a tela de seleção
    setShowSelection(true);
    navigate('/ashen/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {showSelection ? (
        <>
          <h1>Escolha a ficha de RPG</h1>
          <div>
            <button onClick={() => handlePlayerSelect(1)} style={buttonStyle}>
              Asterin Goldi
            </button>
            <button onClick={() => handlePlayerSelect(2)} style={buttonStyle}>
              Shion Marsh
            </button>
            <button onClick={() => handlePlayerSelect(3)} style={buttonStyle}>
              Amaya Goldi
            </button>
            <button onClick={() => handlePlayerSelect(4)} style={buttonStyle}>
              Louise Baker
            </button>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/ashen/ficha/:playerNumber" element={<Ficha />} />
        </Routes>
      )}

      {/* Se não estiver na tela de seleção, mostra o ícone de voltar */}
      {!showSelection && (
        <div
          onClick={handleBackToSelection}
          style={backIconStyle}
        >
          <IoArrowBack size={30} color="#f44336" />  {/* Ícone de seta para voltar */}
        </div>
      )}
    </div>
  );
};



export default App;
