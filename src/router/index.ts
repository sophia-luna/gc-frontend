import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/cliente',
      name: 'cliente',
      component: () => import('../views/cliente/ClienteView.vue')
    },
    {
      path: '/produto',
      name: 'produto',
      component: () => import('../views/produto/ProdutoView.vue')
    },
    {
      path: '/pedido',
      name: 'pedido',
      component: () => import('../views/pedido/PedidoView.vue')
    }
  ]
})

export default router
