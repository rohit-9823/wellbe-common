export default function ({ $axios, redirect, error: nuxtError }) {
  $axios.onError((error) => {
    if (error && error.response && error.response.data) {
      return Promise.resolve({
        status: error.response.status,
        statusText: error.response.statusText,
        error: error.response.data,
      })
    }
    return Promise.resolve({
      error,
    })
  })
}
