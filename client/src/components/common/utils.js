export const cleanJson = (json) => {
  return json.trim().replace(/<\/?[^>]+(>|$)/g, "");
};
