import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules'
import store from '@/store'
import productRepository from '@/repositories/productRepository'
import { IProductStory, IProduct } from '@/types/productsTypes'

@Module
class ProductService extends VuexModule {
    public state: IProductStory = {
      products: []
    }

    public get products (): IProduct[] {
      return this.state.products
    }

    @Mutation
    public setProducts (products: IProduct[]): void {
      this.state.products = products
    }

    @Action
    public async loadProducts (): Promise<void> {
      await productRepository.getProducts().then(response => {
        this.setProducts(response)
      })
    }

    @Action
    public async loadProductsPage (id: number): Promise<void> {
      await productRepository.getProducts(100, id).then(response => {
        this.setProducts(response)
      })
    }

    @Action
    public async deleteProduct (id: number): Promise<void> {
      await productRepository.deleteProduct(id).then(async () => {
        this.loadProducts()
      })
    }

    @Action
    public async addProduct (product: IProduct): Promise<void> {
      await productRepository.addProduct(product).then(async () => {
        this.loadProducts()
      })
    }

    @Action
    public async updateProduct (product: IProduct): Promise<void> {
      await productRepository.updateProduct(product).then(async () => {
        this.loadProducts()
      })
    }
}

const productService = new ProductService({ store, name: 'productService' })
export default productService
