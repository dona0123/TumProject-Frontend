import { API_BASE_URL } from "./api-config";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    method: method,
  };
  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(API_BASE_URL + api, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 403) {
        throw new Error("Forbidden"); // 403 에러는 여기서 처리하지 않고 signin 함수에서 처리
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => {
      console.error("http error", error);
      throw error; // 호출하는 쪽에서 에러 처리를 할 수 있도록 다시 throw
    });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      if (response.token) {
        localStorage.setItem("ACCESS_TOKEN", response.token);
        // 로그인 후 메인 페이지로 리다이렉트하지 않고 머무르도록 수정
        return response; // 이후 처리를 위해 response 반환
      }
    })
    .catch((error) => {
      console.error("Login failed:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      throw error; // 호출하는 쪽에서 에러 처리를 할 수 있도록 다시 throw
    });
}

export function signout() {
  localStorage.removeItem("ACCESS_TOKEN");
  window.location.href = "/login";
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}
