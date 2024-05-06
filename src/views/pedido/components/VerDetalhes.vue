<template>
    <div class="card flex justify-center">
        <Button icon="pi pi-eye" @click="abrirModal()" outlined />
        <Dialog v-model:visible="visible" modal header="Detalhes do pedido" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
            </template>
            <div class="container">
                <div class="p-field">
                    <small>Código:</small>
                    <InputText v-model="pedido.codigo" disabled placeholder="Disabled" />
                </div>
                <div class="p-field">
                    <small>Enviar por email:</small>
                    <InputText v-model="pedido.enviarPorEmail" disabled placeholder="Disabled" />
                </div>
                <div class="p-field">
                    <small>Total em R$:</small>
                    <InputText v-model="pedido.total" disabled />
                </div>
                <div class="card">
                    <Accordion :activeIndex="0">
                        <AccordionTab header="Cliente">
                                <div class="p-field">
                                    <small>Código:</small>
                                    <InputText v-model="cliente.codigo" disabled placeholder="Disabled" />
                                </div>
                                <div class="p-field">
                                    <small>Nome:</small>
                                    <InputText v-model="cliente.nome" disabled placeholder="Disabled" />
                                </div>
                                <div class="p-field">
                                    <small>Email:</small>
                                    <InputText v-model="cliente.email" disabled placeholder="Disabled" />
                                </div>
                                <div class="p-field">
                                    <small>Contato:</small>
                                    <InputText v-model="cliente.contato" disabled placeholder="Disabled" />
                                </div>
                        </AccordionTab>
                        <AccordionTab header="Produtos">
                            <p class="m-0">
                                <DataTable :value="produtos" stripedRows tableStyle="min-width: 10rem">
                                    <Column field="codigo" header="Código"></Column>
                                    <Column field="descricao" header="Descrição"></Column>
                                    <Column field="valor" header="Valor"></Column>
                                </DataTable>
                            </p>
                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';

const props = defineProps(['pedidoSelecionado']);
const visible = ref(false);

const pedido = props.pedidoSelecionado;
const cliente = ref({});
const produtos = ref([]);

if(pedido.enviarPorEmail == true) pedido.enviarPorEmail = "Sim";
if(pedido.enviarPorEmail == false) pedido.enviarPorEmail = "Não";


const abrirModal = () => {
    visible.value = true;
    getCliente();
    getProdutos();
}
const getCliente = async () => {
    try {
        const response = await axios.get(`http://localhost:5256/api/controller/GetCliente/${pedido.codigoCliente}`);
        cliente.value = response.data;
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
    }
};

const getProdutos = async () => {
    try 
    {
        produtos.value = [];
        let total = 0;
        for (let i = 0; i < pedido.produtos.length; i++) {
            let codigo = pedido.produtos[i];
            const response = await axios.get(`http://localhost:5256/api/controller/GetProduto/${codigo}`);
            const produto = response.data;
            produto.valor = produto.valor.toFixed(2);
            produtos.value.push(produto);
            total += produto.valor;
        }
        pedido.total = total.toFixed(2);

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
};

</script>

<style scoped>
.container {
    max-width: 500px;
    margin: 0 auto;
}

.p-field {
    margin-bottom: 1rem;
}

.p-d-block {
    display: block;
    margin-bottom: 0.5rem;
}

.p-inputtext {
    width: 100%;
}
</style>