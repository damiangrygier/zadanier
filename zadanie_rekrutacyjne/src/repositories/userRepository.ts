import { IUserLogin } from '@/types/userTypes'
import axios from 'axios'

class UserRepository {
  public async login (user: IUserLogin): Promise<string> {
    return await axios.post('https://api.escuelajs.co/api/v1/auth/login', user).then(response => response.data.access_token)
  }
}

const userRepository = new UserRepository()
export default userRepository
