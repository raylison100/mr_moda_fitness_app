<script setup>
import { productService } from "@/services/product/productService"

const route = useRoute()
const service = productService()

const productData = ref()

service.fetchProductId(Number(route.params.id)).then(response => {
  productData.value = {
    id: response.data.data.id,
    name: response.data.data.name,
    purchase_price: response.data.data.purchase_price,
    percentage_on_sale: response.data.data.percentage_on_sale,
    final_value: response.data.data.final_value,
    product_type: response.data.data.product_type,
    stocks: response.data.data.stocks,
    department: {
      id: response.data.data.department.id,
      name: response.data.data.department.name,
    },
    category: {
      id: response.data.data.category.id,
      name: response.data.data.category.name,
    },
    sub_category: {
      id: response.data.data.sub_category.id,
      name: response.data.data.sub_category.name,
    },
  }

}).catch(err => {
  console.log(err)
  router.push('/products/list')
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      v-if="productData?.id"
      cols="12"
    >
      <VCard>
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="3"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Nome
              </h6>
              <p class="mb-1">
                {{ productData.name }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="1"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Tipo
              </h6>
              <p class="mb-1">
                {{ productData.product_type }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="2"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Preço de venda
              </h6>
              <p class="mb-1">
                {{ productData.purchase_price }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="2"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Percentual na venda
              </h6>
              <p class="mb-1">
                {{ productData.percentage_on_sale }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="2"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Valor Final
              </h6>
              <p class="mb-1">
                {{ productData.final_value }}
              </p>
            </VCol>
          </VRow>
          <br>
          <VDivider />
          <br>
          <VRow>
            <VCol
              cols="12"
              md="4"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Departamento
              </h6>
              <p class="mb-1">
                {{ productData.department.name }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="4"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Categoria
              </h6>
              <p class="mb-1">
                {{ productData.category.name }}
              </p>
            </VCol>

            <VCol
              cols="12"
              md="4"
            >
              <h6 class="text-sm font-weight-semibold mb-3">
                Sub Categoria
              </h6>
              <p class="mb-1">
                {{ productData.sub_category.name }}
              </p>
            </VCol>
          </VRow>
          <br>
          <VDivider />
          <br>
          <h4>
            Tamanhos
          </h4>
          <br>
          <VRow>
            <VCol
              v-for="(item, index) in productData.stocks"
              v-bind="index"
              cols="4"
            >
              <VRow no-gutters>
                <VCol
                  cols="12"
                  md="2"
                >
                  <h6 class="text-sm font-weight-semibold mb-3">
                    {{ item.size }}
                  </h6>
                </VCol>

                <VCol
                  cols="12"
                  md="4"
                >
                  <VChip
                    class="mb-1"
                    :color="productData.stocks[index].qtd === 0 ? 'error' : 'primary'"
                    variant="elevated"
                  >
                    {{ productData.stocks[index].qtd }}
                  </VChip>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <br>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
meta:
  action: write
  subject: Products
</route>
