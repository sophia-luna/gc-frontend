<template>
  <div class="container">
    <form @submit.prevent="criarCliente">
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
import { addCliente } from '../ClienteService.js'

const confirm = useConfirm();
const toast = useToast();
const emits = defineEmits(['confirmacaoAdicionarCliente']);

const confirmar = () => {
  confirm.require({
    target: event.currentTarget,
    message: 'Deseja adicionar novo cliente?',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-sm',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Salvar',
    accept: () => {
      criarCliente();
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Cancelado', detail: 'Ação cancelada.', life: 3000 });
    }
  });
};

const cliente = ref({
  nome: '',
  email: '',
  contato: ''
});

const criarCliente = async () => {
  try {
    const response = await addCliente(cliente.value);
    if (response === "Cliente adicionado com sucesso!") {
      toast.add({ severity: 'success', summary: 'Sucesso', detail: response, life: 3000 });
      emits('confirmacaoAdicionarCliente');
    } else {
      toast.add({ severity: 'error', summary: 'Erro ao adicionar cliente', detail: response, life: 3000 });
    }
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    toast.add({ severity: 'error', summary: 'Erro ao adicionar cliente', detail: 'Preencha todos os campos.', life: 3000 });
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