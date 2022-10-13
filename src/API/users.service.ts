import { $instance } from ".";

export class UsersService {
  static async searchUsers(searchQuery: string) {
    const { data } = await $instance.get("/users/search", { params: { searchQuery } });
    return data;
  }
}
