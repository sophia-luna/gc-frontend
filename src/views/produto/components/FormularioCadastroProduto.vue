<template>
    <div class="container">
        <form @submit.prevent="addProduto">
            <div class="p-field">
                <small>Descrição:</small>
                <input id="descricao" type="text" v-model="produto.descricao" @input="produto.descricao = produto.descricao.slice(0,100)" class="p-inputtext p-component" />
            </div>
            <div class="p-field">
                <small>Valor:</small>
                <input id="valor" type="number" step="0.01" min="0" v-model="produto.valor"
                    class="p-inputtext p-component" />
            </div>
            <div class="p-field">
                <small>Estoque:</small>
                <input id="contato" type="number" step="1" min="0" v-model="produto.estoque"
                    class="p-inputtext p-component" />
            </div>
            <div class="p-field">
                <Toast />
                <ConfirmPopup></ConfirmPopup>
                <Button label="Salvar" @click="confirmar" icon="pi pi-plus" />
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { addProduto } from '../ProdutoService.js';

const confirm = useConfirm();
const toast = useToast();
const emits = defineEmits(['confirmacaoAdicionarProduto']);

const produto = ref({
    descricao: '',
    valor: 0,
    estoque: 0
});

const confirmar = () => {
    confirm.require({
        target: event.currentTarget,
        message: 'Deseja adicionar novo produto?',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
        acceptClass: 'p-button-sm',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Salvar',
        accept: () => {
            criarProduto();
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Cancelado', detail: 'Ação cancelada.', life: 3000 });
        }
    });
};

const criarProduto = async () => {
    try {
    const response = await addProduto(produto.value);
    if (response === "Produto adicionado com sucesso!") {
      toast.add({ severity: 'success', summary: 'Sucesso', detail: response, life: 3000 });
      emits('confirmacaoAdicionarProduto');
    } else {
      toast.add({ severity: 'error', summary: 'Erro ao adicionar produto', detail: response, life: 3000 });
    }
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    toast.add({ severity: 'error', summary: 'Erro ao adicionar produto', detail: 'Preencha todos os campos.', life: 3000 });
  }
};

</script>

<style scoped>
.container {
    max-width: 400px;
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