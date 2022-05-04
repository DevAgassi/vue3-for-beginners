import { produce, Draft } from "immer";
import { shallowRef } from "vue";
import { BaseState } from "@/types/BaseState";

export function useImmer(baseState: BaseState[]) {
  const state = shallowRef(baseState);
  const update = (initialState: (state: Draft<BaseState[]>) => void) => {
    state.value = produce(state.value, initialState);
  };

  return { state, update };
}
