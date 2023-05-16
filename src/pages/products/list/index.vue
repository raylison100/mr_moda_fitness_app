<script setup>
import { productService } from "@/services/product/productService"

const service = productService()
const router = useRouter()

const searchQuery = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalProducts = ref(0)
const products = ref([])
const selectedRows = ref([])

watchEffect(() => {
  service.fetchProducts({
    search: searchQuery.value,
    limit: rowPerPage.value,
    page: currentPage.value,
  }).then(response => {
    products.value = response.data.data
    totalPage.value = response.data.meta.pagination.total_pages
    totalProducts.value = response.data.meta.pagination.total
  }).catch(error => {
    console.log(error)
  })
})

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

const paginationData = computed(() => {
  const firstIndex = products.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = products.value.length + (currentPage.value - 1) * rowPerPage.value

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalProducts.value} entradas`
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
    >
      <VCard
        v-if="products"
      >
        <VCardText class="d-flex align-center flex-wrap gap-4">
          <!-- 👉 Rows per page -->
          <div
            class="d-flex align-center"
            style="width: 9em;"
          >
            <span class="text-no-wrap me-3">Mostrar:</span>
            <VSelect
              v-model="rowPerPage"
              density="compact"
              :items="[10, 20, 30, 50]"
            />
          </div>

          <div class="me-3">
            <!-- 👉 Create Products -->
            <VBtn
              prepend-icon="tabler-plus"
              v-if="$can('write', 'Products')"
              :to="{ name: 'products-store' }"
            >
              Novo Produto
            </VBtn>
          </div>
          <VSpacer />

          <div class="d-flex align-center flex-wrap gap-4">
            <!-- 👉 Search  -->
            <div class="table-search-filter">
              <VTextField
                v-model="searchQuery"
                placeholder="Buscar Produto"
                density="compact"
              />
            </div>
          </div>
        </VCardText>

        <VDivider />
        <!-- SECTION Table -->
        <VTable class="text-no-wrap invoice-list-table">
          <!-- 👉 Table head -->
          <thead class="text-uppercase">
            <tr>
              <th scope="col">
                #ID
              </th>

              <th scope="col">
                NOME
              </th>

              <th scope="col">
                PREÇO
              </th>

              <th scope="col">
                TIPO
              </th>

              <th scope="col">
                DEPARTAMENTO
              </th>

              <th scope="col">
                CATEGORIA
              </th>

              <th scope="col">
                SUB CATEGORIA
              </th>

              <th scope="col">
                AÇÕES
              </th>
            </tr>
          </thead>
          <!-- 👉 Table Body -->
          <tbody>
            <tr
              v-for="product in products"
              :key="product.id"
              style="height: 3.75rem;"
            >
              <td>
                <RouterLink :to="{ name: 'products-show-id', params: { id: product.id } }">
                  #{{ product.id }}
                </RouterLink>
              </td>

              <td>
                {{ product.name }}
              </td>

              <td>
                R$ {{ product.final_value }}
              </td>

              <td>
                {{ product.product_type }}
              </td>

              <td>
                {{ product.department.name }}
              </td>

              <td>
                {{ product.category.name }}
              </td>

              <td>
                {{ product.sub_category.name }}
              </td>

              <td style="width: 8rem;">
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="x-small"
                  v-if="$can('write', 'Products')"
                  :to="{ name: 'products-edit-id', params: { id: product.id } }"
                >
                  <VIcon
                    :size="22"
                    icon="tabler-pencil"
                  />
                </VBtn>
              </td>
            </tr>
          </tbody>
          <!-- 👉 table footer  -->
          <tfoot v-show="!products.length">
            <tr>
              <td
                colspan="8"
                class="text-center text-body-1"
              >
                No data available
              </td>
            </tr>
          </tfoot>
        </VTable>
        <!-- !SECTION -->
        <VDivider />

        <!-- SECTION Pagination -->
        <VCardText class="d-flex align-center flex-wrap gap-4 py-3">
          <!-- 👉 Pagination meta -->
          <span class="text-sm text-disabled">
            {{ paginationData }}
          </span>
          <VSpacer />

          <!-- 👉 Pagination -->
          <VPagination
            v-model="currentPage"
            size="small"
            :total-visible="5"
            :length="totalPage"
            @next="selectedRows = []"
            @prev="selectedRows = []"
          />
        </VCardText>
        <!-- !SECTION -->
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.table-search-filter {
  inline-size: 12rem;
}
</style>

<route lang="yaml">
meta:
  action: read
  subject: Products
</route>
