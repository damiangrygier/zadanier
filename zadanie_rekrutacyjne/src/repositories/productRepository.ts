import usersService from '@/store/userService'
import { IProduct } from '@/types/productsTypes'
import axios from 'axios'
import Vue from 'vue'

class ProductRepository {
  public async getProducts (countItem = 100, page = 1): Promise<IProduct[]> {
    const config = {
      headers: { Authorization: `Bearer ${usersService.token}` }
    }

    const offset = page * countItem - 100

    return await axios.get(`https://api.escuelajs.co/api/v1/products?limit=${countItem}&offset=${offset}`, config).then(response => response.data).catch((error) => {
      Vue.notify({
        title: 'Error',
        type: 'error',
        text: error.response.status.toString() + ': ' + error.response.message
      })
      return []
    })
  }

  public async deleteProduct (id: number): Promise<void> {
    const config = {
      headers: { Authorization: `Bearer ${usersService.token}` }
    }
    await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`, config).then(response => {
      Vue.notify({
        title: 'Success',
        type: 'success',
        text: 'Product is deleted'
      })
      return response.data
    }).catch((error) => {
      Vue.notify({
        title: 'Error',
        type: 'error',
        text: error.response.status.toString() + ': ' + error.response.message
      })
      return []
    })
  }

  public async addProduct (product: IProduct): Promise<void> {
    const config = {
      headers: { Authorization: `Bearer ${usersService.token}` }
    }
    await axios.post('https://api.escuelajs.co/api/v1/products', product, config).then(() => {
      Vue.notify({
        title: 'Success',
        type: 'success',
        text: 'Product is added'
      })
    }).catch((error) => {
      Vue.notify({
        title: 'Error',
        type: 'error',
        text: error.response.status.toString() + ': ' + error.response.message
      })
    })
  }

  public async updateProduct (product: IProduct): Promise<void> {
    const config = {
      headers: { Authorization: `Bearer ${usersService.token}` }
    }
    await axios.put(`https://api.escuelajs.co/api/v1/products/${product.id}`, product, config).then(() => {
      Vue.notify({
        title: 'Success',
        type: 'success',
        text: 'Product is updated'
      })
    }).catch((error) => {
      Vue.notify({
        title: 'Error',
        type: 'error',
        text: error.response.status.toString() + ': ' + error.response.message
      })
    })
  }
}

const productRepository = new ProductRepository()
export default productRepository
