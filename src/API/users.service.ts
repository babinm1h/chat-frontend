import { $authInstance} from ".";

export class UsersService {
  static async searchUsers(searchQuery: string) {
    const { data } = await $authInstance.get("/users/search", { params: { searchQuery } });
    return data;
  }
}
