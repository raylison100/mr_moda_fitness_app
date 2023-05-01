<script setup>
import { userService } from "@/services/user/userService"

const service = userService()
const router = useRouter()

const searchQuery = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])
const selectedRows = ref([])

watchEffect(() => {
  service.fetchUsers({
    search: searchQuery.value,
    limit: rowPerPage.value,
    page: currentPage.value,
  }).then(response => {
    users.value = response.data.data
    totalPage.value = response.data.meta.pagination.total_pages
    totalUsers.value = response.data.meta.pagination.total
  }).catch(error => {
    console.log(error)
  })
})

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

const paginationData = computed(() => {
  const firstIndex = users.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = users.value.length + (currentPage.value - 1) * rowPerPage.value

  return `Mostrando ${firstIndex} a ${lastIndex} de ${totalUsers.value} entradas`
})
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
    >
      <VCard
        v-if="users"
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
              :to="{ name: 'users-store' }"
            >
              Novo Usuário
            </VBtn>
          </div>
          <VSpacer />

          <div class="d-flex align-center flex-wrap gap-4">
            <!-- 👉 Search  -->
            <div class="table-search-filter">
              <VTextField
                v-model="searchQuery"
                placeholder="Buscar Usuário"
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
                Data de criação
              </th>

              <th scope="col">
                AÇÕES
              </th>
            </tr>
          </thead>
          <!-- 👉 Table Body -->
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              style="height: 3.75rem;"
            >
              <td>
                <RouterLink :to="{ name: 'users-show-id', params: { id: user.id } }">
                  #{{ user.id }}
                </RouterLink>
              </td>

              <td>
                {{ user.name }}
              </td>

              <td>
                {{ user.created_at }}
              </td>

              <td style="width: 8rem;">
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="x-small"
                  :to="{ name: 'users-edit-id', params: { id: user.id } }"
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
          <tfoot v-show="!users.length">
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
  action: write
  subject: Auth
</route>
