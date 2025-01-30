import React, { useState, useEffect } from 'react';

const buttonStyle = {
    marginTop: '1rem',
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
};

const Inventory = ({ playerNumber }) => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemWeight, setItemWeight] = useState('');

    const inventoryLimit = 4; // Limite de peso do inventário

    // Função para carregar os itens do localStorage para o jogador
    const loadItems = () => {
        const storedItems = JSON.parse(localStorage.getItem(`inventory_player_${playerNumber}`)) || [];
        setItems(storedItems);
    };

    // Função para salvar os itens no localStorage para o jogador
    const saveItems = (updatedItems) => {
        localStorage.setItem(`inventory_player_${playerNumber}`, JSON.stringify(updatedItems));
        setItems(updatedItems);
    };

    // Efeito para carregar os itens ao montar o componente
    useEffect(() => {
        loadItems();
    }, [playerNumber]);

    // Função para adicionar um item ao inventário
    const addItem = () => {
        if (!itemName || !itemWeight || isNaN(itemWeight) || itemWeight <= 0) {
            alert('Por favor, preencha um nome válido e um peso positivo.');
            return;
        }

        const newItem = { name: itemName, weight: parseFloat(itemWeight) };

        // Calculando o peso total atual do inventário
        const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);

        // Verificando se o limite de peso será ultrapassado
        if (totalWeight + newItem.weight > inventoryLimit) {
            alert('O inventário está cheio! Não é possível adicionar este item.');
            return;
        }

        const updatedItems = [...items, newItem];
        saveItems(updatedItems);
        setItemName('');
        setItemWeight('');
    };

    // Função para remover um item do inventário
    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        saveItems(updatedItems);
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Inventário</h3>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Nome do item"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Peso do item"
                    value={itemWeight}
                    onChange={(e) => setItemWeight(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <button onClick={addItem} style={buttonStyle}>
                    Adicionar Item
                </button>
            </div>
            <div>
                <strong>Peso total: </strong>{items.reduce((acc, item) => acc + item.weight, 0)} / {inventoryLimit}
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {items.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        {item.name} - {item.weight}
                        <button
                            onClick={() => removeItem(index)}
                            style={{
                                marginLeft: '10px',
                                backgroundColor: 'grey',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            
        </div>
    );
};

export default Inventory;
