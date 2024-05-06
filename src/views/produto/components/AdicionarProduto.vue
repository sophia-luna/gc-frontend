
<template>
    <div class="card flex justify-center">
        <Button label="Adicionar Produto" icon="pi pi-plus" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Novo Produto" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
            </template>
            <p class="m-0">
                <formularioCadastroProduto @confirmacaoAdicionarProduto="produtoAdicionado()"></formularioCadastroProduto>
            </p>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import formularioCadastroProduto from './FormularioCadastroProduto.vue';

const emits = defineEmits(['carregarTela']);

const visible = ref(false);
const produtoAdicionado = () => {
    visible.value = false;
    emits("carregarTela");
}
</script>
