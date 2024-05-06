<template>
    <div class="menu-cliente">
        <AdicionarCliente @carregarTela="fetchClientes()"></AdicionarCliente>
    </div>
    <div class="tabela-cliente-data">
        <div class="card">
            <DataTable :value="clientes" :loading="loading" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 75rem">
                <Column field="codigo" header="Código"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="contato" header="Contato"></Column>
                <Column>
                    <template #body="slotProps">
                        <div class="card flex flex-wrap gap-2 justify-content-center">
                            <EditarCliente :clienteForm="slotProps.data" @carregarTabela="fetchClientes()"></EditarCliente>
                            <ExcluirCliente @confirmacaoExcluirCliente="deleteCliente(slotProps.data.codigo)"></ExcluirCliente>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdicionarCliente from './AdicionarCliente.vue';
import EditarCliente from './EditarCliente.vue';
import ExcluirCliente from './ExcluirCliente.vue';
import { useToast } from "primevue/usetoast";
import Column from 'primevue/column';
import { getClientes, deletarCliente } from '../ClienteService.js';

const toast = useToast();
const clientes = ref([]);
const loading = ref(false);

const fetchClientes = async () => {
    try {
        loading.value = true;
        clientes.value = await getClientes();
        loading.value = false;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
};
onMounted(fetchClientes);

const deleteCliente = async (codigo) => {
    try {
        const response = await deletarCliente(codigo);
        if (response === "Cliente deletado com sucesso.") {
            toast.add({ severity: 'success', summary: 'Sucesso', detail: response, life: 3000 });
            fetchClientes();
        } else {
            toast.add({ severity: 'error', summary: 'Erro ao deletar cliente', detail: response, life: 3000 });
        }
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        toast.add({ severity: 'error', summary: 'Erro ao deletar cliente', detail: 'Preencha todos os campos.', life: 3000 });
    }
};

</script>

<style scoped>
.tabela-cliente-data{
    margin-top: 50px;
}

</style>