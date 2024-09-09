export const triggerLocalStorageEvent = () => {
  const event = new Event("localStorageChange");
  window.dispatchEvent(event);
};
