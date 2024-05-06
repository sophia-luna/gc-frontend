import axios from 'axios';

export async function getPedidos() {
    try {
        const response = await axios.get('http://localhost:5256/api/controller/GetPedido/tabela');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        throw error;
    }
}

export async function adicionarPedido(pedido) {
    try {
        const response = await axios.post('http://localhost:5256/api/controller/PostPedido', pedido)
        return response.data;
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
}

export async function deletarPedido(codigo) {
    try {
        const response = axios.delete(`http://localhost:5256/api/controller/DeletePedido/${codigo}`)
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        throw error;
    }
}

export async function getClienteSelecionado(codigo) {
    try {
        const response = await axios.get(`http://localhost:5256/api/controller/ChecarEmailCliente/${codigo}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
    }
}

export async function getProduto(codigo) {
    try {
        const response = await axios.get(`http://localhost:5256/api/controller/GetProduto/${codigo}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
    }
}

export async function getTodosClientes() {
    try {
        const response = await axios.get('http://localhost:5256/api/controller/GetCliente');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
}

export async function getTodosProdutos() {
    try {
        const response = await axios.get('http://localhost:5256/api/controller/GetProduto');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        throw error;
    }
}