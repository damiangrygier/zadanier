<template>
  <div class="container">
    <div class="header">
      <b-button v-b-modal.modal-addProduct>Dodaj produkt</b-button>
      <router-link to="/O-mnie" class="link O-mnie"><button>O mnie</button></router-link>
      <button @click="logout()">Wyloguj się</button>
    </div>

    <b-modal id="modal-addProduct" title="Dodaj produkt">
      <AddProductForm/>
    </b-modal>

    <div class="products" v-if="products.length > 0">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" @click.prevent="prevPage()"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item" :class="{'active': currentPage === 1}" @click.prevent="setPage(1)"><a class="page-link" href="#">1</a></li>
          <li class="page-item" :class="{'active': currentPage === 2}" @click.prevent="setPage(2)"><a class="page-link" href="#">2</a></li>
          <li class="page-item" :class="{'active': currentPage === 3}" @click.prevent="setPage(3)"><a class="page-link" href="#">3</a></li>
          <li class="page-item" @click.prevent="nextPage()"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
      <div class="myProducts">
        <h3>Produkty</h3>
          <b-list-group>
            <b-list-group-item class="item" href="#" variant="secondary" v-for="product in products" :key="product.id">
              <p>{{product.title}}</p>
              <b-button variant="danger" v-b-modal="`modal-deleteProduct${product.id}`">Usuń</b-button>
              <b-modal :id="`modal-deleteProduct${product.id}`" :title="`Usuń produkt ${product.title}`">
                <p>Czy na pewno chcesz usunąć produkt?</p>
                <b-button @click="deleteProduct(product.id)">Tak usuń</b-button>
                <b-button @click="$bvModal.hide(`modal-deleteProduct${product.id}`)">Nie</b-button>
              </b-modal>
              <b-button variant="outline-primary" v-b-modal="`modal-editProduct${product.id}`">Edytuj</b-button>
              <b-modal :id="`modal-editProduct${product.id}`" :title="`Edytuj produkt ${product.title}`">
                <EditProductForm :product="product"/>
              </b-modal>
            </b-list-group-item>
          </b-list-group>
      </div>
   </div>
    <b-spinner class="spinner" v-else variant="primary"></b-spinner>
  </div>
</template>

<script lang="ts">
import productService from '@/store/productService'
import { IProduct } from '@/types/productsTypes'
import { Component, Watch, Vue } from 'vue-property-decorator'
import AddProductForm from '@/components/AddProductForm.vue'
import EditProductForm from '@/components/EditProductForm.vue'
import userService from '@/store/userService'

@Component({
  components: {
    AddProductForm,
    EditProductForm
  }
})
export default class ProductsPage extends Vue {
  public currentPage = 1

  public async mounted (): Promise <void> {
    if (!userService.token) {
      this.$router.push('/login')
    }

    await productService.loadProducts()
  }

  public nextPage (): void {
    if (this.currentPage < 3) {
      this.currentPage = this.currentPage + 1
    }
  }

  public prevPage (): void {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1
    }
  }

  public setPage (id: number): void {
    this.currentPage = id
  }

  @Watch('currentPage')
  public async loadProducts (): Promise<void> {
    await productService.loadProductsPage(this.currentPage)
  }

  public async logout (): Promise<void> {
    await userService.logout().then(() => {
      window.location.reload()
    })
  }

  public get products (): IProduct[] {
    return productService.products
  }

  public async deleteProduct (id: number): Promise <void> {
    await productService.deleteProduct(id)
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";

  .header {
    width: 100%;
    height: 100px;
    background-color: $cl-bg-dark-accent;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      height: 40px;
      margin-right: 50px;
      border: 1px solid $cl-border;
      border-radius: 8px;
      background: $cl-text-inverse;

      @media (max-width: 480px) {
      width: 50%;
      }
    }

    button:hover {
      cursor: pointer;
      background-color: $cl-border;
    }
  }

  .products {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   margin: 100px 100px;
  }

  .myProducts {
    width: 100%;
    background-color: $cl-bg-secondary;
  }

  h3 {
    line-height: 50px;
  }

  :deep(.modal-footer) {
    display: none;
  }

  .spinner {
    margin-top: 300px;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    p {
      line-height: 56px;
      margin-right: auto;
      margin-bottom: 0;
    }

    button {
      margin-right: 10px;
    }
  }
</style>
