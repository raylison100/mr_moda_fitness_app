<script setup>
import {productService} from "@/services/product/productService"

const route = useRoute()
const service = productService()
const showIssueLabels = ref(false)

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

const printLabels = () => {
  window.print()
}

const stocks = computed(() => {
  return productData.value.stocks?.reduce((acc, curr) => {
    if (curr.value !== 0) {
      console.log(curr)
      for (let i = 0; i < curr.qtd; i++) {
        acc.push({size: curr.size, code: curr.code});
      }
    }
    return acc;
  }, []);
});
</script>

<template>
  <VRow class="match-height">
    <VCol
      v-if="productData?.id"
      cols="12"
    >
      <VCard v-if="!showIssueLabels">
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
          <VDivider/>
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
          <VDivider/>
          <br>
          <div class="d-flex align-center flex-wrap gap-4">
            <h4>
              Tamanhos
            </h4>
            <VSpacer/>
            <VBtn @click="showIssueLabels=true">
              Emitir Etiquetas
            </VBtn>
          </div>
          <br>
          <VRow>
            <VCol
              v-for="(item, index) in productData.stocks"
              v-bind="index"
              cols="12"
              sm="4"
            >
              <VCard class="text-center">
                <VCardText class="d-flex flex-column justify-center align-center">
                  <VChip
                    class="mb-5"
                    :color="productData.stocks[index].qtd === 0 ? 'error' : 'primary'"
                    variant="elevated"
                  >
                    {{ productData.stocks[index].qtd }}
                  </VChip>

                  <h6 class="text-h6">
                    {{ item.size }}
                  </h6>
                </VCardText>

                <VCardText>
                  {{ item.code }}
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
          <br>
        </VCardText>
      </VCard>
      <VCard v-if="showIssueLabels">
        <div class="d-print-none">
          <VToolbar color="primary">
            <VBtn
              icon
              variant="plain"
              @click="showIssueLabels=false"
            >
              <VIcon
                color="white"
                icon="tabler-x"
              />
            </VBtn>

            <VToolbarTitle>Etiquetas</VToolbarTitle>

            <VSpacer/>

            <VToolbarItems>
              <VBtn prepend-icon="mdi-printer" @click="printLabels">
                Imprimir
              </VBtn>
            </VToolbarItems>
          </VToolbar>
        </div>
        <div>
          <div class="labels">
            <VCard v-for="(stock, index) in stocks" class="print-stocks mb-12">
                <div class="mb-12 d-flex flex-column justify-center align-center">
                  <div class="d-flex flex-column justify-center align-center">
                    <span class="mt-2">Tamanho</span>
                    <VChip
                      color="primary"
                      class="size"
                      variant="elevated"
                    >
                      {{ stock.size }}
                    </VChip>
                  </div>
                  <h6 class="mt-2 text-h6">
                    R$ {{ productData.final_value }}
                  </h6>
                </div>
                <div class="label">
                  <BarcodeGenerator :value="stock.code" width="2"/>
                </div>
                <div class="mt-12 d-flex justify-center flex-column align-center">
                  <div class="contact">
                    <VIcon
                      size="16"
                      icon="mdi-instagram"
                    >
                    </VIcon>
                    <span> @mr.modafitnes2022</span>
                  </div>
                  <div class="contact">
                    <VIcon
                      size="16"
                      icon="mdi-whatsapp"
                    >
                    </VIcon>
                    <span> 81 99941-8663</span>
                  </div>
                </div>
            </VCard>
          </div>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">

.labels {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
}

.contact {
  font-size: 12px;
  color: #ffffff;
}

.print-stocks {
  width: 4.2cm;
  height: 8.8cm !important;
  margin: 0.3cm;
  border-color: #000000 !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-radius: 10px !important;
  display: flex !important;
  flex-direction: column !important;
  align-content: center !important;
  justify-content: center !important;
  flex-wrap: wrap;

  h6 {
    font-size: 12px !important;
  }

  .v-card-text {
    padding: 1px;
  }

  .label {
    svg {
      font-size: 12px !important;
      width: 7cm;
      height: 1.8cm;
      transform: rotate(90deg) !important;
    }
  }

}

@media print {
  @page  {
    padding: 0;
    margin: 0;
  }

  .layout-page-content {
    padding: 0;
    margin: 0;
  }

  .v-navigation-drawer,
  .layout-vertical-nav,
  .app-customizer-toggler,
  .layout-footer,
  .layout-navbar,
  .layout-navbar-and-nav-container {
    display: none;
  }

  .layout-page-content{
    margin-block-start:0!important;
  }

  html, body {
    width: 210mm;
    height: 297mm;
  }

  .v-card {
    box-shadow: none !important;
  }

  .v-col{
    padding: 0;
  }

  .labels {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    margin-left: 1.2cm;
    //padding: 0;
    padding-top: 14px;
  }

  .print-stocks {
    margin-right: 16px;
    margin-bottom: 16px;
    page-break-inside: avoid;

    h6 {
      color: #000000;
    }

    .v-card-text {
      color: #000000;
    }

    .contact {
      color: #000000;
    }
  }
  .print-stocks:nth-child(12n) {
    page-break-after: always;
  }

  .print-stocks:nth-last-child(12n) {
    page-break-inside: avoid;
  }
}

</style>

<route lang="yaml">
meta:
  action: write
  subject: Products
</route>
