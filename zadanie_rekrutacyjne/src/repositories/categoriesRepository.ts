import usersService from '@/store/userService'
import axios from 'axios'
import { IProductCategory } from '@/types/productsTypes'
import Vue from 'vue'

class CategoriesRepository {
  public async getCategories (countItem = 100): Promise<IProductCategory[]> {
    const config = {
      headers: { Authorization: `Bearer ${usersService.token}` }
    }
    return await axios.get(`https://api.escuelajs.co/api/v1/categories?limit=${countItem}`, config).then(response => response.data).catch((error) => {
      Vue.notify({
        title: 'Error',
        type: 'error',
        text: error.response.status.toString() + ': ' + error.response.message
      })
      return []
    })
  }
}

const categoriesRepository = new CategoriesRepository()
export default categoriesRepository
