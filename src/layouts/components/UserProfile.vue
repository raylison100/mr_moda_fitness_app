<script setup>
import {initialAbility} from '@/plugins/casl/ability'
import {useAppAbility} from '@/plugins/casl/useAppAbility'

const router = useRouter()
const ability = useAppAbility()
const userData = JSON.parse(localStorage.getItem('userData') || 'null')

const logout = () => {
  localStorage.removeItem('userData')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userAbilities')
  ability.update(initialAbility)
  router.push('/login')
}

const acronymsName = () => {
  const name = userData.name.split(" ")

  let acronymsName = []

  if (name.length > 1){
    acronymsName[0] = name[0].charAt(0).toUpperCase()
    acronymsName[1] = name[1].charAt(0).toUpperCase()
  }else{
    acronymsName[0] = name[0].charAt(0).toUpperCase()
    acronymsName[1] = name[0].charAt(1).toUpperCase()
  }

  return acronymsName.join('')
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <span>{{ acronymsName() }}</span>

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <VListItemTitle class="font-weight-semibold">
              {{ userData.name }}
            </VListItemTitle>
            <VListItemSubtitle>{{ userData.role }}</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem
            link
            @click="logout"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
