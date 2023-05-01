<script setup>
import Editable from "@/pages/spendings/components/editable.vue"

const router = useRouter()

const spendingData = ref({
  spending: {
    id: null,
    description: '',
    spending_type: '',
    value: '',
  },
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
    >
      <Editable :data="spendingData" />
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: write
  subject: Spendings
</route>
