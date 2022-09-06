<template>
  <div class="aboutMe">
    <notifications/>
    <AboutMe/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AboutMe from '@/components/AboutMe.vue'

  @Component({
    components: {
      AboutMe
    }
  })
export default class AboutMeView extends Vue {}
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

</style>
