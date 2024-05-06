import axios from 'axios';

export async function getClientes() {
    try {
        const response = await axios.get('http://localhost:5256/api/controller/GetCliente');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
}

export async function addCliente(cliente) {
    try {
        const response = await axios.post('http://localhost:5256/api/controller/PostCliente', cliente);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        throw error;
    }
}

export async function editarCliente(cliente) {
    try {
        const response = await axios.put('http://localhost:5256/api/controller/PutCliente', cliente);
        return response.data;
    } catch (error) {
        console.error('Erro ao editar cliente:', error);
        throw error;
    }
}

export async function deletarCliente(codigo) {
    try {
        const response = await axios.delete(`http://localhost:5256/api/controller/DeleteCliente/${codigo}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        throw error;
    }
}
