<template>
    <nav class="c-top-menu">
      <div class="container">
        <p class="text">Witaj w naszym serwisie!</p>
        <div class="links">
          <router-link to="/login" class="link login"><button>Zaloguj się</button></router-link>
          <router-link to="/O-mnie" class="link O-mnie"><button>O mnie</button></router-link>
        </div>
      </div>
    </nav>
  </template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
  })
export default class TopMenu extends Vue {

}
</script>

  <style scoped lang="scss">
    @import "@/styles/main.scss";

    .c-top-menu {
      padding: 0 15px;
      border-bottom: 1px solid $cl-border;
      font-size: 16px;
      color: $cl-title;
      background-color: $cl-bg-secondary;
    }

    .container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .text {
      margin-left: 20px;
      margin-top: auto;
      margin-bottom: auto;
      color: $cl-primary;

      @media (max-width: 480px) {
        padding: 15px 0;
      }
    }

    .links {
      padding: 15px 0;
      margin-right: 20px;

      button {
        width: 100px;
        height: 40px;
        margin-right: 8px;
        border: 1px solid $cl-border;
        border-radius: 8px;
        background: $cl-text-inverse;

        @media (max-width: 480px) {
        width: 50%;
        font-size: 12px;
      }
      }

      button:hover {
        cursor: pointer;
        background-color: $cl-border;
      }
    }

  </style>
