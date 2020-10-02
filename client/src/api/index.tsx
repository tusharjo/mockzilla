type APIClient = {
  <T = any>(
    endpoint: string,
    method: string,
    body?: any,
    mockmeSessionKey?: string
  ): Promise<T>;
};
export const api: APIClient = async (
  endpoint,
  method,
  body = {},
  mockmeSessionKey
) => {
  let bodyParams = {};
  let headers = {};

  switch (method) {
    case "POST":
      bodyParams = { key: mockmeSessionKey, ...body };
      headers = { "Content-Type": "application/json" };
      break;
  }

  const payload: RequestInit = { method };

  if (method === "POST") {
    payload.body = JSON.stringify(bodyParams);
    payload.headers = headers;
  }

  try {
    const response = await fetch(endpoint, payload);
    return await response.json();
  } catch (e) {
    return new Error("Error while calling API.");
  }
};
