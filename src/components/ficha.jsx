import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Inventory from './Inventory';

// Importando as imagens
import player1 from '/images/player1.png'
import player2 from '/images/player2.png'
import player3 from '/images/player3.png'
import player4 from '/images/player4.png'

const Ficha = () => {
  const { playerNumber } = useParams(); // Obtém o número do jogador da URL

  // Definindo os valores iniciais de vida e exaustão para cada jogador
  const jogadores = {
    1: { nome: "Asterin Goldi", forca: 7, agilidade: 12, inteligencia: 9, vontade: 11, idade: 13, vida: 16, exaustao: 2, imagem: player1 },
    2: { nome: "Shion Marsh", forca: 7, agilidade: 10, inteligencia: 6, vontade: 4, idade: 14, vida: 16, exaustao: 2, imagem: player2 },
    3: { nome: "Amaya Goldi", forca: 10, agilidade: 8, inteligencia: 9, vontade: 8, idade: 13, vida: 19, exaustao: 2, imagem: player3 },
    4: { nome: "Louise Baker", forca: 9, agilidade: 10, inteligencia: 8, vontade: 5, idade: 13, vida: 18, exaustao: 2, imagem: player4 },
  };

  // Carrega os dados do jogador a partir do objeto 'jogadores'
  const jogador = jogadores[playerNumber];

  // Função para carregar um valor do localStorage ou definir um padrão
  const loadValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  // Estados de Vida e Exaustão carregados do localStorage, com valores dinâmicos baseados no jogador
  const [vidaAtual, setVidaAtual] = useState(() => loadValue(`vida_player_${playerNumber}`, jogador.vida));
  const [exaustaoAtual, setExaustaoAtual] = useState(() => loadValue(`exaustao_player_${playerNumber}`, jogador.exaustao));

  // Funções para alterar a vida e exaustão
  const alterarVida = (quantidade) => {
    setVidaAtual((prev) => Math.max(0, Math.min(jogador.vida, prev + quantidade)));
  };

  const alterarExaustao = (quantidade) => {
    setExaustaoAtual((prev) => Math.max(0, Math.min(jogador.exaustao, prev + quantidade)));
  };

  // Função para rolar 2d6
  const rolarDados = () => {
    const dado1 = Math.floor(Math.random() * 6) + 1;
    const dado2 = Math.floor(Math.random() * 6) + 1;
    return [dado1, dado2];
  };

  // Função para calcular o tipo de sucesso baseado no valor do atributo
  const calcularSucesso = (atributo, dados) => {
    const [dado1, dado2] = dados;
    const total = dado1 + dado2;

    // Se ambos os dados forem 1, é um "Extremo"
    if (dado1 === 1 && dado2 === 1) {
      return "Extremo";
    }

    // Divide o valor do atributo em 3 partes para os sucessos
    const parte = Math.floor(atributo / 3);

    if (total <= parte) {
      return "Bom";
    } else if (total <= parte * 2) {
      return "Normal";
    } else {
      return "Ruim";
    }
  };

  // Estados de rolagem e resultados
  const [forcaResultado, setForcaResultado] = useState(null);
  const [agilidadeResultado, setAgilidadeResultado] = useState(null);
  const [inteligenciaResultado, setInteligenciaResultado] = useState(null);
  const [vontadeResultado, setVontadeResultado] = useState(null);

  const rolarAtributo = (atributo) => {
    const dados = rolarDados();
    const resultado = calcularSucesso(atributo, dados);

    if (atributo === jogador.forca) {
      setForcaResultado({ dados, resultado });
    } else if (atributo === jogador.agilidade) {
      setAgilidadeResultado({ dados, resultado });
    } else if (atributo === jogador.inteligencia) {
      setInteligenciaResultado({ dados, resultado });
    } else if (atributo === jogador.vontade) {
      setVontadeResultado({ dados, resultado });
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row', // Organiza a ficha e o inventário em linha
      justifyContent: 'center', // Centraliza horizontalmente
      gap: '20px' // Adiciona um pequeno espaçamento entre a ficha e o inventário
    }}>
      <div>
        <h2>Ficha do Jogador:</h2>

        {/* Informações do personagem */}
        <p><strong>Nome:</strong> {jogador.nome}</p>

        {/* Exibe a imagem do jogador */}
        <img
          src={jogador.imagem}
          alt={`${jogador.nome}`}
          style={{ width: '150px', height: 'auto', borderRadius: '50%' }}
        />

        {/* Campo de Vida com botões */}
        <p>
          <strong>Vida:</strong>
          <button onClick={() => alterarVida(-1)} style={buttonStyle}>-</button>
          <span style={{ margin: '0 10px' }}>{vidaAtual} / {jogador.vida}</span>
          <button onClick={() => alterarVida(1)} style={buttonStyle}>+</button>
        </p>

        {/* Campo de Exaustão com botões */}
        <p>
          <strong>Exaustão:</strong>
          <button onClick={() => alterarExaustao(-1)} style={buttonStyle}>-</button>
          <span style={{ margin: '0 10px' }}>{exaustaoAtual} / {jogador.exaustao}</span>
          <button onClick={() => alterarExaustao(1)} style={buttonStyle}>+</button>
        </p>

        {/* Atributos e Rolagens */}

        <p>
          <strong>Força:</strong> {jogador.forca}
          <button onClick={() => rolarAtributo(jogador.forca)} style={buttonStyle}>Rolagem</button>
          {forcaResultado && (
            <span>
              {" "}
              | Resultado: {forcaResultado.dados[0] + forcaResultado.dados[1]} ({forcaResultado.dados[0]}, {forcaResultado.dados[1]}) - {forcaResultado.resultado}
            </span>
          )}
        </p>

        <p>
          <strong>Agilidade:</strong> {jogador.agilidade}
          <button onClick={() => rolarAtributo(jogador.agilidade)} style={buttonStyle}>Rolagem</button>
          {agilidadeResultado && (
            <span>
              {" "}
              | Resultado: {agilidadeResultado.dados[0] + agilidadeResultado.dados[1]} ({agilidadeResultado.dados[0]}, {agilidadeResultado.dados[1]}) - {agilidadeResultado.resultado}
            </span>
          )}
        </p>

        <p>
          <strong>Inteligência:</strong> {jogador.inteligencia}
          <button onClick={() => rolarAtributo(jogador.inteligencia)} style={buttonStyle}>Rolagem</button>
          {inteligenciaResultado && (
            <span>
              {" "}
              | Resultado: {inteligenciaResultado.dados[0] + inteligenciaResultado.dados[1]} ({inteligenciaResultado.dados[0]}, {inteligenciaResultado.dados[1]}) - {inteligenciaResultado.resultado}
            </span>
          )}
        </p>

        <p>
          <strong>Vontade:</strong> {jogador.vontade}
          <button onClick={() => rolarAtributo(jogador.vontade)} style={buttonStyle}>Rolagem</button>
          {vontadeResultado && (
            <span>
              {" "}
              | Resultado: {vontadeResultado.dados[0] + vontadeResultado.dados[1]} ({vontadeResultado.dados[0]}, {vontadeResultado.dados[1]}) - {vontadeResultado.resultado}
            </span>
          )}
        </p>

      </div>

      {/* Exibe o inventário ao lado da ficha */}
      <div style={{ width: '250px' }}>
        <Inventory playerNumber={playerNumber} />
      </div>
    </div>
  );
};

// Estilo dos botões
const buttonStyle = {
  padding: '5px 10px',
  margin: '0 5px',
  cursor: 'pointer',
  display: 'inline-block', // Alinha os botões na mesma linha
  verticalAlign: 'middle', // Garante que eles fiquem centralizados verticalmente
};

export default Ficha;
