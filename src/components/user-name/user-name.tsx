import { computed, defineComponent, Ref } from "vue";
import { useUserModule } from "@/store";
import { useFetch } from "@/composable";
import { User } from "@/types/User";
interface UserFetch {
  response: any;
  error: Ref<unknown>;
  state: User[];
  loading: Ref<boolean>;
}
export default defineComponent({
  name: "UserName",
  async setup() {
    const user = useUserModule();
    const name = computed(() => user.name);
    const users: UserFetch = await useFetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    user.updateUsers(users.state);

    const updateName = (event: Event) => {
      event.preventDefault();
      user.updateName((event.target as HTMLInputElement).value);
    };

    const userList = computed(() => {
      console.log(name.value);
      return user.users.filter((user) => {
        return user.name.startsWith(name.value);
      });
    });

    return {
      updateName,
      name,
      users: userList,
    };
  },
  render() {
    return (
      <>
        <div class="username">User: {this.name}</div>
        <input class="border-2 bg-brown" onKeyup={this.updateName} />
        <ul>
          {this.users.map((user, index) => {
            return (
              <li>
                {index}.<span> {user.name}</span>
              </li>
            );
          })}
        </ul>
      </>
    );
  },
});
