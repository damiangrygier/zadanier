<template>
  <div class="home">
    <TopMenu></TopMenu>
    <HomeContent></HomeContent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TopMenu from '@/components/TopMenu.vue'
import HomeContent from '@/components/HomeContent.vue'
import userService from '@/store/userService'

@Component({
  components: {
    TopMenu,
    HomeContent
  }
})
export default class home extends Vue {
  public mounted (): void {
    if (userService.token) {
      this.$router.push('/products')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

</style>
