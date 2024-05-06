<template>
    <div class="card flex justify-center">
        <Button label="Adicionar Pedido" icon="pi pi-plus" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Novo Pedido" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
            </template>
            <p class="m-0">
                <formularioCadastroPedido @confirmacaoAdicionarPedido="pedidoAdicionado()"></formularioCadastroPedido>
            </p>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import formularioCadastroPedido from './FormularioCadastroPedido.vue';

const emits = defineEmits(['carregarTela']);
const visible = ref(false);

const pedidoAdicionado = () => {
    visible.value = false;
    emits('carregarTela');
}
</script>
