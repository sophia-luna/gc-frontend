<template>
    <div class="card flex justify-center">
        <Button icon="pi pi-pencil" @click="abrirModal()" outlined />
        <Dialog v-model:visible="visible" modal header="Editar Cliente" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
            </template>
            <div class="container">
                <form @submit.prevent="editarCliente">
                    <div class="p-field">
                        <small>Código:</small>
                        <InputText v-model="cliente.codigo" disabled />
                    </div>
                    <div class="p-field">
                        <small>Nome:</small>
                        <input id="nome" type="text" v-model="cliente.nome" @input="cliente.nome = cliente.nome.slice(0,60)" class="p-inputtext p-component" />
                    </div>
                    <div class="p-field">
                        <small>Email:</small>
                        <input id="email" type="email" v-model="cliente.email" @input="cliente.email = cliente.email.slice(0,40)" class="p-inputtext p-component" />
                    </div>
                    <div class="p-field">
                        <small>Contato:</small>
                        <input id="contato" type="text" v-model="cliente.contato" @input="cliente.contato = cliente.contato.slice(0,15)" class="p-inputtext p-component" />
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
import { editarCliente } from '../ClienteService.js'

const confirm = useConfirm();
const toast = useToast();
const props = defineProps(['clienteForm']);
const emits = defineEmits(['carregarTabela']);

const visible = ref(false);

const cliente = ref({
    codigo: '',
    nome: '',
    email: '',
    contato: ''
});

const clienteSelecionado = props.clienteForm;

const abrirModal = () => {
    preencherDetalhesCliente();
    visible.value = true;
}

const preencherDetalhesCliente = () => {
    if (clienteSelecionado) {
        cliente.value = {
            ...cliente.value,
            codigo: clienteSelecionado.codigo,
            nome: clienteSelecionado.nome,
            email: clienteSelecionado.email,
            contato: clienteSelecionado.contato
        };
    }
};

const confirmar = () => {
    confirm.require({
        target: event.currentTarget,
        message: 'Deseja editar cliente?',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
        acceptClass: 'p-button-sm',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Salvar',
        accept: () => {
            editCliente();
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Cancelado', detail: 'Ação cancelada.', life: 3000 });
        }
    });
};

const editCliente = async () => {
    try {
        const response = await editarCliente(cliente.value);
        if (response === "Cliente editado com sucesso!") {
            toast.add({ severity: 'success', summary: 'Sucesso', detail: response, life: 3000 });
            visible.value = false;
            emits("carregarTabela");
        } else {
            toast.add({ severity: 'error', summary: 'Erro ao editar cliente', detail: response, life: 3000 });
        }
    } catch (error) {
        console.error('Erro ao editar cliente:', error);
        toast.add({ severity: 'error', summary: 'Erro ao editar cliente', detail: 'Preencha todos os campos.', life: 3000 });
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