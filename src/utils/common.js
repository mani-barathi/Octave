export const handleError = (error) => {
  console.log(error);
  alert(error);
};

export function isValidURL(string) {
  try {
    return Boolean(new URL(string));
  } catch (e) {
    return false;
  }
}
