import axios from 'axios';

export async function getProdutos() {
    try {
        const response = await axios.get('http://localhost:5256/api/controller/GetProduto');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        throw error;
    }
}

export async function addProduto(produto) {
    try {
        const response = await axios.post('http://localhost:5256/api/controller/PostProduto', produto)
        return response.data;
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
}

export async function editarProduto(produto) {
    try {
        const response = await axios.put('http://localhost:5256/api/controller/PutProduto', produto)
        return response.data;
    } catch (error) {
        console.error('Erro ao editar:', error);
        throw error;
    }
}

export async function deleteProduto(codigo) {
    try {
       const response = await axios.delete(`http://localhost:5256/api/controller/DeleteProduto/${codigo}`);
       return response.data;
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        throw error;
    }
}
