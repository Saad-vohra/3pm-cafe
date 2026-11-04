export let pendingScroll: string | null = null;
export const setPendingScroll = (id: string | null) => {
  pendingScroll = id;
};
