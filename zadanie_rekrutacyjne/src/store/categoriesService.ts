import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules'
import store from '@/store'
import { ICategoriesStory, IProductCategory } from '@/types/productsTypes'
import categoriesRepository from '@/repositories/categoriesRepository'

@Module
class CategoriesService extends VuexModule {
  public state: ICategoriesStory = {
    categories: []
  }

  public get categories (): IProductCategory[] {
    return this.state.categories
  }

  @Mutation
  public setCategories (categories: IProductCategory[]): void {
    this.state.categories = categories
  }

  @Action
  public async loadCategories (): Promise<void> {
    await categoriesRepository.getCategories().then(response => {
      this.setCategories(response)
    })
  }
}

const categoriesService = new CategoriesService({ store, name: 'categoriesService' })
export default categoriesService
