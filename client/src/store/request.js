export const request = async (url, method = "GET", body = null) => {
  try {
    const resp = await fetch(url, { method, body });
    const data = await resp.json();

    if (!resp.ok) throw new Error(data.message || "Ошибка http запроса");
    return data;
  } catch (e) {
    if (!e.message) e.message = "Ошибка http запроса";
    throw e;
  }
};
