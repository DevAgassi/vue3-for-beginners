import { useImmer } from "@/lib/immer";
import { Draft } from "immer";
import { defineComponent } from "vue";
import { BaseState } from "@/types/BaseState";

import "./todo-list-item.toggle.scss";

export default defineComponent({
  name: "TodoListItemToggle",
  setup() {
    const { state, update } = useImmer([
      {
        title: "Learn Vue",
        done: true,
      },
      {
        title: "Use Vue with Immer",
        done: false,
      },
    ]);

    const toggleItem = function (index: number) {
      update((state: Draft<BaseState[]>) => {
        state[index].done = !state[index].done;
      });
    };

    return {
      state,
      toggleItem,
    };
  },

  render() {
    return (
      <ul>
        {this.state.map((item: BaseState, index: number) => {
          return (
            <li
              class={item.done || "done"}
              onClick={() => this.toggleItem(index)}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    );
  },
});
