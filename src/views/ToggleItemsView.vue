<template>
  <div class="container">
    <TodoListItemToggle />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoListItemToggle from "@/components/todo-list-item-toggle";

export default defineComponent({
  name: "ToggleItemsView",
  components: {
    TodoListItemToggle,
  },
});
</script>
