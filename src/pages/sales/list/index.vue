<script setup>
import { saleService } from "@/services/sale/saleService"

const service = saleService()
const router = useRouter()

const searchQuery = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalSales = ref(0)
const sales = ref([])
const selectedRows = ref([])

watchEffect(() => {
  service.fetchSales({
    search: searchQuery.value,
    limit: rowPerPage.value,
    page: currentPage.value,
    orderBy: 'id',
    sortedBy: 'desc',
  }).then(response => {
    sales.value = response.data.data
    totalPage.value = response.data.meta.pagination.total_pages
    totalSales.value = response.data.meta.pagination.total
  }).catch(error => {
    console.log(error)
  })
})

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

const paginationData = computed(() => {
  const firstIndex = sales.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = sales.value.length + (currentPage.value - 1) * rowPerPage.value

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalSales.value} entradas`
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
    >
      <VCard
        v-if="sales"
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
              v-if="$can('write', 'Sales')"
              prepend-icon="tabler-plus"
              :to="{ name: 'sales-store' }"
            >
              Nova Venda
            </VBtn>
          </div>
          <VSpacer />

          <div class="d-flex align-center flex-wrap gap-4">
            <!-- 👉 Search  -->
            <div class="table-search-filter">
              <VTextField
                v-model="searchQuery"
                placeholder="Buscar Venda"
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
                STATUS
              </th>

              <th scope="col">
                PARCELAMENTO
              </th>

              <th scope="col">
                PARCELA QTD
              </th>

              <th scope="col">
                VALOR DA PARCELADO
              </th>

              <th scope="col">
                VALOR EM DINHEIRO
              </th>

              <th scope="col">
                VALOR DE DESCONTO
              </th>

              <th scope="col">
                VALOR TOTAL
              </th>

              <th scope="col">
                AÇÕES
              </th>
            </tr>
          </thead>
          <!-- 👉 Table Body -->
          <tbody>
            <tr
              v-for="sale in sales"
              :key="sale.id"
              style="height: 3.75rem;"
            >
              <td>
                <RouterLink :to="{ name: 'sales-show-id', params: { id: sale.id } }">
                  #{{ sale.id }}
                </RouterLink>
              </td>

              <td>
                <VChip
                  class="mb-1"
                  :color="sale.status === 'CANCELED' ? 'error' : 'primary'"
                  variant="elevated"
                >
                  {{ sale.status }}
                </VChip>
              </td>

              <td>
                {{ sale.installment ? 'SIM' : 'NÃO' }}
              </td>

              <td>
                {{ sale.installment_qtd }}
              </td>

              <td>
                R$ {{ sale.installment_value }}
              </td>

              <td>
                R$ {{ sale.cash_value }}
              </td>

              <td>
                R$ {{ sale.discount_value }}
              </td>

              <td>
                R$ {{ sale.amount }}
              </td>


              <td style="width: 8rem;">
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="x-small"
                  :disabled="sale.status === 'CANCELED'"
                  v-if="$can('write', 'Sales')"
                  :to="{ name: 'sales-edit-id', params: { id: sale.id } }"
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
          <tfoot v-show="!sales.length">
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
  subject: Sales
</route>

