const request = async <T>(method, url, data = undefined): Promise<T> => {
    let options = {};

    if (method !== "GET") {
        options = {
            method
        }
    }

    if (data) {
        options = {
            ...options,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        throw response.json()
    }

    const result = await response.json();

    return result as T;
}

export default request;