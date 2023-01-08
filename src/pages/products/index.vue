<script setup>
import Form from '@/views/products/Form.vue'
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
    >
      <VCard>
        <div>
          <VCardItem>
            <VCardTitle>Novo Produto</VCardTitle>
          </VCardItem>
          <VCardText>
            <Form />
          </VCardText>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: read
  subject: Sales
</route>
