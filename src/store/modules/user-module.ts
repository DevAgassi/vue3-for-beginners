import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { User } from "@/types/User";

@Module({ namespaced: true, name: "user" })
export class UserModule extends VuexModule {
  name = "";
  users: User[] = [];

  @Mutation
  setName(newName: string): void {
    this.name = newName;
  }

  @Mutation
  setUsers(newUsers: User[]): void {
    this.users = newUsers;
  }

  @Action
  updateName(newName: string): void {
    this.context.commit("setName", newName);
  }

  @Action
  updateUsers(newUsers: User[]): void {
    this.context.commit("setUsers", newUsers);
  }
}
