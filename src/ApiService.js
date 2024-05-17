import { API_BASE_URL } from "./api-config";

export function call(api, method, requset) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
  };

  if (requset) {
    options.body = JSON.stringify(requset);
  }

  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .catch((error) => {
      console.log("http error");
      console.log(error);
    });
}
