<template>
  <div class="container pt-5">
    <suspense>
      <template #default>
        <div>
          <router-link to="/tutorials/add">Add Tutorial</router-link>
          <tutorials-list />
        </div>
      </template>
      <template #fallback> Loading ... </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TutorialsList from "@/components/tutorial/TutorialsList";

export default defineComponent({
  name: "TutorialsListView",
  components: { TutorialsList },
});
</script>
