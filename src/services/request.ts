const request = async <T>(method, url, data = undefined): Promise<T> => {
  let options = {};

  if (method !== "GET") {
    options = {
      method,
    };
  }

  if (data) {
    options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || "Request failed");
  }

  const result = await response.json();

  return result as T;
};

export default request;
