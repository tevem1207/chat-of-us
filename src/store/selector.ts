import { selector } from "recoil";
import { messagesState } from "store/atom";

export const sortedMessagesState = selector({
  key: "sortedMessagesState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const messages = get(messagesState);
    console.log(messages);

    return messages
      .slice()
      .sort(
        (a, b) =>
          new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
      );
  },
});
