/**
 * To change form data into javascript object
 * @param formData form data to be changed
 */
export function formDataToObject(formData: FormData) {
  const obj: { [k: string]: any } = {};

  for (let [key, value] of formData.entries()) {
    const keys = key.match(/[^\[\]]+|\[\]/g);
    let ref = obj;

    keys?.forEach((k, i) => {
      if (i < keys?.length - 1) {
        if (!ref[k]) {
          ref[k] = isNaN(Number(keys[i + 1])) && keys[i + 1] !== "[]" ? {} : [];
        }
        ref = ref[k];
      } else {
        if (k === "[]") {
          ref = Array.isArray(ref) ? ref : [];
          ref.push(value);
        } else {
          ref[k] = value;
        }
      }
    });
  }

  return obj;
}
