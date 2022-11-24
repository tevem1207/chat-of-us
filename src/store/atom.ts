import { atom } from "recoil";
import { Message } from "store/interface";

export const messagesState = atom({
  key: "messagesState", // unique ID (with respect to other atoms/selectors)
  default: [] as Message[], // default value (aka initial value)
});
