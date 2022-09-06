import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules'
import store from '@/store'
import { IUserLogin, IUserStory } from '@/types/userTypes'
import userRepository from '@/repositories/userRepository'

@Module
class UsersService extends VuexModule {
    public state: IUserStory = {
      token: ''
    }

    public get token (): string {
      const cookieToken = localStorage.getItem('token')
      return cookieToken ?? this.state.token
    }

    @Mutation
    public setToken (token: string): void {
      this.state.token = token
    }

    @Action
    public async login (user: IUserLogin): Promise<void> {
      await userRepository.login(user).then(response => {
        this.setToken(response)
        localStorage.setItem('token', response)
      })
    }

    @Action
    public async logout (): Promise<void> {
      this.setToken('')
      localStorage.removeItem('token')
    }
}

const usersService = new UsersService({ store, name: 'userService' })
export default usersService
