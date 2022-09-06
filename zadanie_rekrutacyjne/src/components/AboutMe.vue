<template>
    <div class="aboutMe">
        <router-link to="/" class="link home"><button>Home</button></router-link>
        <h2>Aplikacja napisana w ramach zadania rekrutacyjnego</h2>
        <h3>Wykonawca:
            Damian Grygier
        </h3>
        <p>Kontakt:</p>
        <p>telefon: 536992750</p>
        <p>mail: grygier.dam@gmail.com</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {

  }
})
export default class AboutMe extends Vue {}
</script>

  <style scoped lang="scss">
    @import "@/styles/main";

    .aboutMe {
        margin-top: 80px;
    }

    button {
        width: 200px;
        height: 50px;
        margin-bottom: 35px;
        border-radius: 12px;
        font-size: 16px;
    }

    button:hover {
        background-color: $cl-text-inverse;
        cursor: pointer;
      }

  </style>
