<template>
  <div class="container">
      <div class="tabela">
        <TesteFilter></TesteFilter>
          <tabelaProduto></tabelaProduto>
      </div>
  </div>
</template>
<script setup lang="ts">
import tabelaProduto from './components/TabelaProduto.vue'
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