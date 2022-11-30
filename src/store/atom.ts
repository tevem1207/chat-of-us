import { atom } from "recoil";
import { MessageType } from "store/interface";

export const messagesState = atom({
  key: "messagesState", // unique ID (with respect to other atoms/selectors)
  default: [] as MessageType[], // default value (aka initial value)
});
