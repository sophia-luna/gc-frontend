
<template>
    <div class="card flex justify-center">
        <Button label="Adicionar Cliente" icon="pi pi-plus" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Novo Cliente" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
            </template>
            <p class="m-0">
                <formularioCadastroCliente @confirmacaoAdicionarCliente="clienteAdicionado()"></formularioCadastroCliente>
            </p>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import formularioCadastroCliente from './FormularioCadastroCliente.vue';

const emits = defineEmits(['carregarTela']);

const visible = ref(false);
const clienteAdicionado = () => {
    visible.value = false;
    emits("carregarTela");
}
</script>
