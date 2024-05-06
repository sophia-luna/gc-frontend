<template>
  <div class="card">
    <TabMenu :model="items">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </router-link>
      </template>
    </TabMenu>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
  
  const items = ref([
    {
        label: 'Clientes',
        icon: 'pi pi-user',
        route: '/cliente',
    },
    {
        label: 'Produtos',
        icon: 'pi pi-box',
        route: '/produto',
    },
    {
        label: 'Pedidos',
        icon: 'pi pi-truck',
        route: '/pedido'
    }
  ]);

</script>
