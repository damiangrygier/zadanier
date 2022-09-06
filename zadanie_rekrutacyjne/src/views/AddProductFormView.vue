<template>
    <AddProductForm></AddProductForm>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddProductForm from '@/components/AddProductForm.vue'

    @Component({
      components: {
        AddProductForm
      }
    })
export default class AddProductFormView extends Vue {

}
</script>

    <style scoped lang="scss">
      @import '@/styles/main.scss'

    </style>
