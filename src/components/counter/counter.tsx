import { computed, defineComponent } from "vue";
import { useCounterModule } from "@/store";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Counter",
  setup() {
    const counter = useCounterModule();
    const count = computed(() => counter.count);
    const doubleTimes = computed(() => {
      return counter.count * 2;
    });
    return {
      count,
      doubleTimes,
    };
  },
  render() {
    return (
      <div>
        <div>Counter: {this.count}</div>
        <div>Double Counter: {this.doubleTimes}</div>
      </div>
    );
  },
});
