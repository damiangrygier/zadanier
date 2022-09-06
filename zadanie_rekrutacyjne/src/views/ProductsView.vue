<template>
  <div class="v-products">
    <notifications/>
    <ProductsPage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProductsPage from '@/components/ProductsPage.vue'

  @Component({
    components: {
      ProductsPage
    }
  })
export default class ProductsView extends Vue {

}
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss"

</style>
