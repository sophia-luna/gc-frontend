<template>
    <div class="menu-pedido">
        <div class="add-pedido">
            <AdicionarPedido @carregarTela="getPedidos()"></AdicionarPedido>
        </div>
    </div>
    <div class="tabela-pedido-data">
        <div class="card">
            <DataTable :value="pedidos" stripedRow :loading="loading" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 75rem">
                <Column field="codigo" header="Código do Pedido"></Column>
                <Column field="nomeCliente" header="Cliente"></Column>
                <Column field="total" header="Total em R$"></Column>
                <Column>
                    <template #body="slotProps">
                        <div class="card flex flex-wrap gap-2 justify-content-center">
                            <VerDetalhes :pedidoSelecionado="slotProps.data"></VerDetalhes>
                            <ExcluirPedido @confirmacaoExcluirPedido="deletarPedido(slotProps.data.codigo)"></ExcluirPedido>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AdicionarPedido from './AdicionarPedido.vue'
import VerDetalhes from './VerDetalhes.vue';
import ExcluirPedido from './ExcluirPedido.vue';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const pedidos = ref([]);
const loading = ref(false);

const getPedidos = async () => {
    try {
        loading.value = true;
        const response = await axios.get('http://localhost:5256/api/controller/GetPedido/tabela');
        pedidos.value = response.data;
        pedidos.value.forEach(pedido => {
            pedido.total = pedido.total.toFixed(2);
        })
        loading.value = false;
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
    }
};
onMounted(getPedidos);

const deletarPedido = (codigo) => {
    axios.delete(`http://localhost:5256/api/controller/DeletePedido/${codigo}`)
    .then(response => {
        console.log('Pedido deletado:', response.data);
        toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Pedido deletado!', life: 3000 });
        getPedidos();
    })
    .catch(error => {
        console.error('Erro ao deletar pedido:', error);
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar pedido.', life: 3000 });
    });
};

</script>

<style scoped>
.tabela-pedido-data{
    margin-top: 50px;
}
</style>