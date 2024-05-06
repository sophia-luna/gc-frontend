<template>
  <div class="container">
    <form @submit.prevent="addPedido">
      <div class="p-field">
        <small>Selecione o cliente:</small>
        <Dropdown v-model="pedido.codigoCliente" :options="clientes" optionLabel="nome" optionValue="codigo"
          placeholder="Selecione o cliente" @change="clienteSelecionado(pedido.codigoCliente)" />
      </div>
      <div class="p-field">
        <div class="card">
          <small>Selecione os produtos:</small>
          <DataTable v-model:selection="pedido.produtos" :value="produtos" dataKey="codigo"
            tableStyle="min-width: 20rem" @change="produtoSelecionado()">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="descricao" header="Descrição"></Column>
            <Column field="estoque" header="Estoque">
              <template #body="slotProps">
                <Tag :value="slotProps.data.estoque" :severity="getSeverity(slotProps.data)" />
              </template>
            </Column>
            <Column field="valor" header="Valor"></Column>
          </DataTable>
        </div>
      </div>
      <div class="p-field">
        <Checkbox v-model="pedido.enviarPorEmail" :binary="true" :disabled="!bloquearEmail" />
        <label for="enviar" class="ml-2"> Enviar por E-mail </label>
      </div>
      <div class="p-field">
        <Toast />
        <ConfirmDialog />
        <Button label="Salvar" @click="showTemplate()" icon="pi pi-plus" :disabled="disabled" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { adicionarPedido, getClienteSelecionado, getTodosClientes, getTodosProdutos } from '../PedidoService.js';


let disabled = true;
const confirm = useConfirm();
const toast = useToast();
const emits = defineEmits(['confirmacaoAdicionarPedido']);
let bloquearEmail = false;

const showTemplate = () => {
  calcularTotal();
  confirm.require({
    header: 'Confirmar pedido',
    message: 'Confirmar pedido de ' + pedido.value.produtos.length + ' produtos totalizando R$' + totalPedido + '?',
    icon: 'pi pi-exclamation-circle',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    acceptLabel: 'Confirmar',
    rejectLabel: 'Cancelar',
    rejectClass: 'p-button-outlined p-button-sm',
    acceptClass: 'p-button-sm',
    accept: () => {
      addPedido();
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Cancelado', detail: 'Ação cancelada.', life: 3000 });
    }
  });
}

let totalPedido = "";
const calcularTotal = () => {
  try {
    let total = 0;
    for (let i = 0; i < pedido.value.produtos.length; i++) {
      total += Number(pedido.value.produtos[i].valor);
    }
    totalPedido = Number(total).toFixed(2);
  } catch (error) {
    console.error('Erro ao calcular total:', error);
  }
}

const getSeverity = (produto) => {
  switch (produto.estoque) {
    case 1:
      return 'warning';
    case 0:
      produto.estoque = "INDISPONÍVEL";
      return 'danger';
    case "INDISPONÍVEL":
      return 'danger'
    default:
      return 'success';
  }
};

const produtoSelecionado = () => {
  if (pedido.value.codigoCliente != '') disabled = false;
}

const clienteSelecionado = async (codigo) => {
  try {
    if (pedido.value.produtos != []) disabled = false;
    const response = await getClienteSelecionado(codigo);
    email.value = response;
    bloquearEmail = email.value.existeEmail;

  } catch (error) {
    console.error('Erro ao buscar email:', error);
  }
}

const email = ref({
  enderecoEmail: '',
  existeEmail: ''
})

const pedido = ref({
  enviarPorEmail: false,
  codigoCliente: '',
  produtos: []
});

const addPedido = async () => {
  const add = ref(true);
  pedido.value.produtos.forEach(produto => {
    if (produto.estoque == "INDISPONÍVEL") {
      add.value = false;
      toast.add({ severity: 'error', summary: 'Erro ao adicionar pedido', detail: "Produto selecionado está indisponível.", life: 3000 });
    }
  });
  if (add.value) {
    try {
      const response = await adicionarPedido(pedido.value);
      if (response == "Pedido adicionado com sucesso!") {
        toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Pedido adicionado.', life: 3000 });
        emits('confirmacaoAdicionarPedido');
      }
      else toast.add({ severity: 'error', summary: 'Erro ao adicionar pedido', detail: response.data, life: 3000 });
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      toast.add({ severity: 'error', summary: 'Erro ao adicionar pedido', detail: response.data, life: 3000 });
    }
  }
};

const clientes = ref([]);
const getClientes = async () => {
  try {
    const response = await getTodosClientes();
    clientes.value = response;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
  }
};
onMounted(getClientes);

const produtos = ref([]);
const getProdutos = async () => {
  try {
    const response = await getTodosProdutos();
    produtos.value = response;
    produtos.value.forEach(produto => {
      produto.valor = produto.valor.toFixed(2);
    })
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};
onMounted(getProdutos);

</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
}

.p-d-block {
  display: block;
  margin-bottom: 0.5rem;
}

.p-inputtext {
  width: 100%;
}

.p-field {
  margin-bottom: 1rem;
}

.p-dropdown.p-component.p-inputwrapper {
  width: 100%;
}

.p-multiselect.p-component.p-inputwrapper {
  width: 100%;
}
</style>