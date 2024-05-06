<template>
    <div class="card flex justify-center">
        <Toast />
        <ConfirmPopup></ConfirmPopup>
        <div class="card flex flex-wrap gap-2 justify-content-center">
            <Button @click="confirmar" icon="pi pi-trash" severity="danger" outlined></Button>
        </div>
    </div>
</template>

<script setup>
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { defineEmits } from 'vue';

const confirm = useConfirm();
const toast = useToast();

const emits = defineEmits(['confirmacaoExcluirPedido']);

const confirmar = () => {
    confirm.require({
        target: event.currentTarget,
        message: 'Deseja deletar esse pedido?',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
        acceptClass: 'p-button-danger p-button-sm',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Deletar',
        accept: () => {
            emits('confirmacaoExcluirPedido');
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Cancelado', detail: 'Ação cancelada.', life: 3000 });
        }
    });
};
</script>
