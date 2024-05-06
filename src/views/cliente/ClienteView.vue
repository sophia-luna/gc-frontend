<template>
    <div class="container">
        <div class="tabela">
            <tabelaCliente></tabelaCliente>
        </div>
    </div>
</template>

<script setup lang="ts">
import tabelaCliente from './components/TabelaCliente.vue'
</script>

<style scoped>

.tabela {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

@media (min-width: 1024px) {
    .container {
        align-items: center;
    }
}
</style>