/**
 * To change form data into javascript object
 * @param formData form data to be changed
 */
export function formDataToObject(formData: FormData) {
  const obj = {};

  for (const [key, value] of formData.entries()) {
    const keys = key.match(/[^\[\]]+|\[\]/g);
    let ref:
      | Record<string, unknown>
      | Record<string, unknown>[]
      | unknown
      | unknown[] = obj;

    keys?.forEach((k, i) => {
      if (i < keys?.length - 1) {
        if (!(ref as Record<string, unknown>)[k]) {
          (ref as Record<string, unknown>)[k] =
            isNaN(Number(keys[i + 1])) && keys[i + 1] !== "[]" ? {} : [];
        }

        ref = (ref as Record<string, unknown>)[k];
      } else {
        if (k === "[]") {
          ref = Array.isArray(ref) ? ref : [];
          (ref as unknown[]).push(value);
        } else {
          (ref as Record<string, unknown>)[k] = value;
        }
      }
    });
  }

  return obj;
}
