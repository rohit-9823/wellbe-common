export function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone'
  }

  if (/android/i.test(userAgent)) {
    return 'Android'
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS'
  }

  return 'unknown'
}

export function sendEvent(methodName, argsJsonStr) {
  console.log('Log : sendEvent started : ', methodName, argsJsonStr)
  if (getMobileOperatingSystem() === 'iOS') {
    window.webkit.messageHandlers[methodName].postMessage(argsJsonStr)
  } else if (getMobileOperatingSystem() === 'Android') {
    // prettier-ignore
    /* eslint-disable */
    WlbAndroidApp[methodName](argsJsonStr)
  } else {
    console.log('Mobile sendEvent : browser access.')
  }
  console.log('Log : sendEvent finished : ', methodName, argsJsonStr)
}

export function sendEventOnError(resp) {
  let argsJsonStr = '{}'
  if (resp && resp.status && resp.error) {
    argsJsonStr = `{"code":"${resp.status}", "error":${JSON.stringify(
      resp.error
    )} }`
  } else if (resp && resp.error) {
    argsJsonStr = `{"error":${JSON.stringify(resp.error)} }`
  }
  sendEvent('onError', argsJsonStr)
}
