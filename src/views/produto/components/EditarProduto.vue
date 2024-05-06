<template>
    <div class="card flex justify-center">
        <Button icon="pi pi-pencil" @click="abrirModal()" outlined />
        <Dialog v-model:visible="visible" modal header="Editar Produto" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
            </template>
            <div class="container">
                <form @submit.prevent="editProduto">
                    <div class="p-field">
                        <small>Codigo:</small>
                        <InputText v-model="produto.codigo" disabled />
                    </div>
                    <div class="p-field">
                        <small>Descrição:</small>
                        <input id="descricao" type="text" v-model="produto.descricao" @input="produto.descricao = produto.descricao.slice(0,100)" class="p-inputtext p-component" />
                    </div>
                    <div class="p-field">
                        <small>Valor:</small>
                        <input id="valor" type="number" step="0.01" min="0" v-model="produto.valor" class="p-inputtext p-component" />
                    </div>
                    <div class="p-field">
                        <small>Estoque:</small>
                        <input id="contato" type="number" min="0" v-model="produto.estoque" class="p-inputtext p-component" />
                    </div>
                    <div class="p-field">
                        <Toast />
                        <ConfirmPopup></ConfirmPopup>
                        <Button label="Editar" @click="confirmar" icon="pi pi-pencil" />
                    </div>
                </form>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { editarProduto } from '../ProdutoService.js';

const confirm = useConfirm();
const toast = useToast();
const props = defineProps(['produtoForm']);
const emits = defineEmits(['carregarTabela']);

const visible = ref(false);

const produto = ref({
    codigo: '',
    descricao: '',
    valor: '',
    estoque: ''
});

const produtoSelecionado = props.produtoForm;

const abrirModal = () => {
    preencherDetalhesProduto();
    visible.value = true;
}

const preencherDetalhesProduto = () => {
    if (produtoSelecionado) {
        produto.value = {
            ...produto.value,
            codigo: produtoSelecionado.codigo,
            descricao: produtoSelecionado.descricao,
            valor: produtoSelecionado.valor,
            estoque: produtoSelecionado.estoque
        };
    }
};

const confirmar = () => {
    confirm.require({
        target: event.currentTarget,
        message: 'Deseja editar produto?',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
        acceptClass: 'p-button-sm',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Salvar',
        accept: () => {
            editProduto();
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Cancelado', detail: 'Ação cancelada.', life: 3000 });
        }
    });
};

const editProduto = async () => {
    try {
        const response = await editarProduto(produto.value);
        if (response === "Produto editado com sucesso!") {
            toast.add({ severity: 'success', summary: 'Sucesso', detail: response, life: 3000 });
            visible.value = false;
            emits("carregarTabela");
        } else {
            toast.add({ severity: 'error', summary: 'Erro ao editar produto', detail: response, life: 3000 });
        }
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        toast.add({ severity: 'error', summary: 'Erro ao editar produto', detail: 'Preencha todos os campos.', life: 3000 });
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

.p-dropdown.p-component.p-inputwrapper {
    width: 100%;
}
</style>