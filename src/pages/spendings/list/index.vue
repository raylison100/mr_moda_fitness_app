<script setup>
import { spendingService } from "@/services/spendings/spendingService"

const service = spendingService()
const router = useRouter()

const searchQuery = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalSpendings = ref(0)
const spendings = ref([])
const selectedRows = ref([])

watchEffect(() => {
  service.fetchSpendings({
    search: searchQuery.value,
    limit: rowPerPage.value,
    page: currentPage.value,
  }).then(response => {
    spendings.value = response.data.data
    totalPage.value = response.data.meta.pagination.total_pages
    totalSpendings.value = response.data.meta.pagination.total
  }).catch(error => {
    console.log(error)
  })
})

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

const paginationData = computed(() => {
  const firstIndex = spendings.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = spendings.value.length + (currentPage.value - 1) * rowPerPage.value

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalSpendings.value} entradas`
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
    >
      <VCard
        v-if="spendings"
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
            <!-- 👉 Create Spendings -->
            <VBtn
              prepend-icon="tabler-plus"
              :to="{ name: 'spendings-store' }"
            >
              Novo Gasto
            </VBtn>
          </div>
          <VSpacer />

          <div class="d-flex align-center flex-wrap gap-4">
            <!-- 👉 Search  -->
            <div class="table-search-filter">
              <VTextField
                v-model="searchQuery"
                placeholder="Buscar"
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
                DESCRIÇÃO
              </th>

              <th scope="col">
                VALOR
              </th>

              <th scope="col">
                TIPO
              </th>

              <th scope="col">
                AÇÕES
              </th>
            </tr>
          </thead>
          <!-- 👉 Table Body -->
          <tbody>
            <tr
              v-for="spending in spendings"
              :key="spending.id"
              style="height: 3.75rem;"
            >
              <td>
                <RouterLink :to="{ name: 'spendings-show-id', params: { id: spending.id } }">
                  #{{ spending.id }}
                </RouterLink>
              </td>

              <td>
                {{ spending.description }}
              </td>

              <td>
                R$ {{ spending.value }}
              </td>

              <td>
                {{ spending.spending_type }}
              </td>

              <td style="width: 8rem;">
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="x-small"
                  :to="{ name: 'spendings-edit-id', params: { id: spending.id } }"
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
          <tfoot v-show="!spendings.length">
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
  subject: Auth
</route>
