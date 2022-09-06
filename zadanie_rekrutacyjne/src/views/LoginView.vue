<template>
  <div class="v-login">
    <notifications/>
    <LoginBox/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginBox from '@/components/LoginBox.vue'

  @Component({
    components: {
      LoginBox
    }
  })
export default class Login extends Vue {

}
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss"

</style>
