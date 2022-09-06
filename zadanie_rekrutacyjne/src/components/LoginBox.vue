<template>
  <div class="c-loginBox">
    <div class="text">
      <h2>Zaloguj się!</h2>
      <p>Wpisz poprawne dane aby się zalogować!</p>
    </div>
  <div class="form-element">
    <label>Email</label>
    <input type="email" class="textInput" placeholder="Email" v-model="form.email" @blur="checkEmail()" :class="{error: emailInfo.length > 0 }">
    <p class="emailInfo" v-show="checkInputs">{{emailInfo}}</p>
  </div>
  <div class="form-element">
    <label>Hasło</label>
    <input type="password" class="password textInput" placeholder="Hasło" v-model="form.password">
  </div>
    <button @click="login()" :disabled="checkInputs">Zaloguj</button>
    <router-link to="/" class="link home"><p class="backToHome">Powrót do strony głównej</p></router-link>
  </div>
</template>

<script lang="ts">
import userService from '@/store/userService'
import { Component, Vue } from 'vue-property-decorator'
import { IUserLogin } from '@/types/userTypes'

@Component({
  components: {
  }
})
export default class LoginBox extends Vue {
  public form: IUserLogin = {
    email: '',
    password: ''
  }

  public emailInfo = ''

  public async login (): Promise <void> {
    await userService.login(this.form).then(() => {
      if (userService.token) {
        this.$router.push('/products')
      }
    })
  }

  public get checkInputs (): boolean {
    return (this.emailInfo.length) > 0 || ((this.form.email && this.form.password) === '')
  }

  public checkEmail (): void {
    if (this.form.email.match(/^\S+@\S+\.\S+$/)) {
      this.emailInfo = ''
    } else if (this.email === '') {
      this.emailInfo = ''
    } else {
      this.emailInfo = 'Wpisz poprawny email'
    }
  }

  public mounted (): void {
    if (userService.token) {
      this.$router.push('/products')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

  .c-loginBox {
    margin: 100px auto;
    width: 440px;
    max-width: 100%;
    background: $cl-bg-secondary;
    padding: 40px;
    border-radius: 16px;
    border: 1px solid $cl-border;
    box-sizing: border-box;

    @media (max-width: 480px) {
      width: 90%;
    }
  }

  .textInput {
    @include textInput;
  }

  .form-element {
    height: 80px;
    margin-top: 30px;

    @include formElement;
  }

  button {
    @include buttonSign
  }

  button:hover {
    background-color: $cl-color-7;
    cursor: pointer;
  }

  .emailInfo {
    @include errorInputsInfo
  }

  .error {
    @include errorInputs
  }

  .backToHome {
    margin-top: 40px;
    font-size: 14px;
  }

</style>
