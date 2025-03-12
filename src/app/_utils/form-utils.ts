/**
 * To change form data into javascript object
 * @param formData form data to be changed
 */
export function formDataToObject(formData: FormData) {
  const obj = {};

  for (const [key, value] of formData.entries()) {
    const keys = key.match(/[^\[\]]+|\[\]/g);
    let ref: Record<string, unknown> | (Record<string, unknown> | unknown)[] =
      obj;

    keys?.forEach((k, i) => {
      if (i < keys?.length - 1) {
        if (!Array.isArray(ref) && !ref[k]) {
          ref[k] = isNaN(Number(keys[i + 1])) && keys[i + 1] !== "[]" ? {} : [];
        } else if (!Array.isArray(ref)) {
          ref = ref[k] as Record<string, unknown>;
        }
      } else {
        if (k === "[]") {
          ref = (Array.isArray(ref) ? ref : []) as (
            | Record<string, unknown>
            | unknown
          )[];
          ref.push(value);
        } else if (!Array.isArray(ref)) {
          ref[k] = value;
        }
      }
    });
  }

  return obj;
}
