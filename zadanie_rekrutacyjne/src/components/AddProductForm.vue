<template>
  <form>
    <h2>Dodaj produkt</h2>
    <div class="form-element">
      <label>Nazwa Produktu</label>
      <input type="text" placeholder="Nazwa produktu" class="textInput" v-model="form.title" @blur="checkTextInput()" :class="{ error: textInfo.length > 0 }">
      <p class="textInfo">{{textInfo}}</p>
    </div>
    <div class="form-element">
      <label>Cena</label>
      <input type="number" step="0.1" placeholder="Cena" class="textInput" v-model="form.price" @blur="checkPriceInput()" :class="{ error: priceInfo.length > 0 }">
      <p class="priceInfo">{{priceInfo}}</p>
    </div>
    <div class="form-element">
      <label>Opis produkty</label>
      <textarea placeholder="Opis produktu" rows="4" class="textInput" v-model="form.description" @blur="checkAreaInput()" :class="{ error: areaInfo.length > 0 }"></textarea>
      <p class="areaInfo">{{areaInfo}}</p>
    </div>
    <div class="form-element category">
      <label>Kategoria</label>
      <select placeholder="Wybierz kategorie" v-model="form.categoryId">
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>
    <div class="images">
      <label>Obrazki</label>
      <p v-for="(image, index) in form.images" :key="index">{{ image }}</p>
      <input v-model="image" type="text" placeholder="Podaj link do obrazka">
      <button @click.prevent="addImage()">Dodaj obrazek</button>
    </div>
    <button @click.prevent="add()" :disabled="checkInputs">Dodaj</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import categoriesService from '@/store/categoriesService'
import { IProduct, IProductCategory } from '@/types/productsTypes'
import productService from '@/store/productService'

  @Component
export default class AddProductForm extends Vue {
  public form: IProduct = {
    title: '',
    description: '',
    categoryId: 0,
    price: '',
    images: []
  }

  public textInfo = ''
  public priceInfo = ''
  public areaInfo = ''
  public image = ''

  public get checkInputs (): boolean {
    const { title, description, price, categoryId } = this.form
    return ((title.length <= 2 || title.length >= 65) || price === 0 || (description.length <= 31 || description.length >= 129) || categoryId === 0)
  }

  public checkTextInput () {
    if (this.form.title.length <= 2 || this.form.title.length >= 65) {
      this.textInfo = 'Min 3 max 64 znaki'
    } else {
      this.textInfo = ''
    }
  }

  public checkPriceInput () {
    if (this.form.price === 0 || this.form.price === '') {
      this.priceInfo = 'Pole nie może być puste oraz wartość musi być większa niż 0'
    } else {
      this.priceInfo = ''
    }
  }

  public checkAreaInput () {
    if (this.form.description.length <= 31 || this.form.description.length >= 129) {
      this.areaInfo = 'Min 32 max 128 znaków'
    } else {
      this.areaInfo = ''
    }
  }

  public get categories (): IProductCategory[] {
    return categoriesService.categories ?? []
  }

  public async mounted (): Promise<void> {
    await categoriesService.loadCategories()
  }

  public addImage (): void {
    this.form.images.push(this.image)
    this.image = ''
  }

  public async add (): Promise<void> {
    await productService.addProduct(this.form).then(() => {
      this.$bvModal.hide('modal-addProduct')
    })
    console.log('Dodałem produkt')
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

  form {
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

  .category,
  .images {
    display: flex;
    flex-direction: column;

    select {
      height: 25px;
    }
  }

  .category {
    margin-top: 110px;
  }

  button {
    @include buttonSign
  }

  button:hover {
    background-color: $cl-color-7;
    cursor: pointer;
  }

  .error {
    @include errorInputs
  }

  .textInfo,
  .priceInfo,
  .areaInfo {
    @include errorInputsInfo
  }

</style>
