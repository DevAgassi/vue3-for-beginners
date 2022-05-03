<template>
  <div class="container mx-auto">
    <Counter />
    <TodoList />
    <CounterIncrementButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Counter from "@/components/counter";
import CounterIncrementButton from "@/components/counter-increment-button";
import TodoList from "@/components/todo-list";

export default defineComponent({
  name: "HomeView",
  components: {
    TodoList,
    CounterIncrementButton,
    Counter,
  },
});
</script>
