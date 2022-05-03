import { Immutable } from "immer";

export type BaseState = Immutable<{
  title: string;
  done: boolean;
}>;
