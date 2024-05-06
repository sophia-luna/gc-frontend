<template>
    <div class="menu-produto">
        <div class="add-produto">
            <AdicionarProduto @carregarTela="fetchProdutos()"></AdicionarProduto>
        </div>
    </div>
    <div class="tabela-produto-data">
        <div class="card">
            <DataTable :value="produtos" :loading="loading" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 75rem">
                <Column field="codigo" header="Código"></Column>
                <Column field="descricao" header="Descrição"></Column>
                <Column field="valor" header="Valor em R$"></Column>
                <Column field="estoque" header="Estoque"></Column>
                <Column>
                    <template #body="slotProps">
                        <div class="card flex flex-wrap gap-2 justify-content-center">
                            <EditarProduto :produtoForm="slotProps.data" @carregarTabela="fetchProdutos()"></EditarProduto>
                            <ExcluirProduto :produto="slotProps.data.codigo" @confirmacaoExcluirProduto="deletarProduto(slotProps.data.codigo)"></ExcluirProduto>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdicionarProduto from './AdicionarProduto.vue';
import EditarProduto from './EditarProduto.vue';
import ExcluirProduto from './ExcluirProduto.vue';
import { useToast } from 'primevue/usetoast';
import { getProdutos, deleteProduto } from '../ProdutoService.js';

const toast = useToast();
const produtos = ref();
const loading = ref(false);

const fetchProdutos = async () => {
    try {
        loading.value = true;
        produtos.value = await getProdutos();
        produtos.value.forEach(produto => {
            produto.valor = produto.valor.toFixed(2);
        });
        loading.value = false;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
};
onMounted(fetchProdutos);

const deletarProduto = async (codigo) => {
    try {
        const response = await deleteProduto(codigo);
        if (response === "Produto deletado com sucesso.") {
            toast.add({ severity: 'success', summary: 'Sucesso', detail: response, life: 3000 });
            fetchProdutos();
        } else {
            toast.add({ severity: 'error', summary: 'Erro ao deletar produto', detail: response, life: 3000 });
        }
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        toast.add({ severity: 'error', summary: 'Erro ao deletar produto', detail: 'Preencha todos os campos.', life: 3000 });
    }
};
</script>

<style scoped>
.tabela-produto-data{
    margin-top: 50px;
}
</style>