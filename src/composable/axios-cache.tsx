import { computed, reactive, ref, Ref } from "vue";
import axios from "axios";

export const useFetch = async (url: string, config: object = {}) => {
  let state: any[] = [];
  const response = ref<any | null>(null);
  const error = ref<unknown | null>(null);
  const loading = ref(false);

  const fetch = async () => {
    loading.value = true;
    try {
      const result = await axios.request({
        url,
        ...config,
      });
      const { data } = result;
      response.value = data;
      state = data;
    } catch (ex) {
      error.value = ex;
    } finally {
      loading.value = false;
    }
  };
  await fetch();
  return { response, error, state, loading, fetch };
};

const cacheMap = reactive(new Map());

export const useFetchCache = async (
  key: string,
  url: string,
  config: object
) => {
  const info = useFetch(url, { skip: true, ...config });

  const update = async () => cacheMap.set(key, (await info).response.value);
  const clear = () => cacheMap.set(key, undefined);

  const fetch = async () => {
    try {
      await (await info).fetch();
      await update();
    } catch {
      clear();
    }
  };

  const response = computed(() => cacheMap.get(key));
  const data = computed(() => response.value?.data);

  if (response.value == null) await fetch();

  return { ...info, fetch, data, response, clear };
};
