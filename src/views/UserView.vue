<template>
  <div class="container">
    <suspense>
      <template #default>
        <UserName />
      </template>
      <template #fallback> Loading ... </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserName from "@/components/user-name";

export default defineComponent({
  name: "UserView",
  components: {
    UserName,
  },
});
</script>
