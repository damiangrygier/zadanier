<template>
  <div class="home">
    <notifications/>
    <Home/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Home from '@/components/Home.vue'

@Component({
  components: {
    Home
  }
})
export default class HomeView extends Vue {}
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

</style>
