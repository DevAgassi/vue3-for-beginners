<template>
  <div class="container pt-5">
    <suspense>
      <template #default>
        <add-tutorial />
      </template>
      <template #fallback> Loading ... </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddTutorial from "@/components/tutorial/AddTutorial";

export default defineComponent({
  name: "AddTutorialView",
  components: { AddTutorial },
});
</script>
