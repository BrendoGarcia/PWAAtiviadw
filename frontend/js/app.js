const API_URL = 'http://localhost:3000/api/cadeiras';

// Função para adicionar um novo item
document.getElementById('chairForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nomecadeira = document.getElementById('nomecadeira').value;
    const detalhes = document.getElementById('detalhes').value;
    const tipo = document.getElementById('tipo').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nomecadeira, detalhes, tipo })
        });

        if (!response.ok) throw new Error('Erro ao criar a cadeira.');

        const cadeira = await response.json();
        appendCadeira(cadeira);

        document.getElementById('nomecadeira').value = '';
        document.getElementById('detalhes').value = '';
        document.getElementById('tipo').value = '';
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível criar a cadeira.');
    }
});

// Função para carregar todas as cadeiras
async function loadCadeiras() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error('Erro ao carregar as cadeiras.');

        const cadeiras = await response.json();
        cadeiras.forEach(appendCadeira);
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível carregar as cadeiras.');
    }
}

// Função para adicionar uma cadeira à lista
function appendCadeira(cadeira) {
    const li = document.createElement('li');
    li.setAttribute('id', cadeira._id);
    li.innerHTML = `
        <strong>${cadeira.nomecadeira}</strong>
        <p>Detalhes: ${cadeira.detalhes}</p>
        <p>Tipo: ${cadeira.tipo}</p>
        <button onclick="deleteCadeira('${cadeira._id}', this)">Deletar</button>
        <button onclick="editCadeira('${cadeira._id}')">Editar</button>
    `;
    document.getElementById('chairsList').appendChild(li);
}

// Função para deletar uma cadeira
async function deleteCadeira(id, button) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        if (!response.ok) throw new Error('Erro ao deletar a cadeira.');

        button.parentElement.remove();
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível deletar a cadeira.');
    }
}

// Função para editar uma cadeira (exemplo simplificado)
async function editCadeira(id) {
    const nomecadeira = prompt('Novo nome da cadeira:');
    const detalhes = prompt('Novos detalhes:');
    const tipo = prompt('Novo tipo:');

    if (nomecadeira && detalhes && tipo) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nomecadeira, detalhes, tipo })
            });

            if (!response.ok) throw new Error('Erro ao atualizar a cadeira.');

            const updatedCadeira = await response.json();
            const li = document.getElementById(id);
            li.innerHTML = `
                <strong>${updatedCadeira.nomecadeira}</strong>
                <p>Detalhes: ${updatedCadeira.detalhes}</p>
                <p>Tipo: ${updatedCadeira.tipo}</p>
                <button onclick="deleteCadeira('${updatedCadeira._id}', this)">Deletar</button>
                <button onclick="editCadeira('${updatedCadeira._id}')">Editar</button>
            `;
        } catch (error) {
            console.error('Erro:', error);
            alert('Não foi possível atualizar a cadeira.');
        }
    }
}

loadCadeiras();
