
export const setItem = (key, data) => {
    if (typeof (data) === "object") {
        localStorage.setItem(key, JSON.stringify(data))
    } else {
        localStorage.setItem(key, data)
    }
}


export const getItem = (key) => {
  return localStorage.getItem(key)
}
