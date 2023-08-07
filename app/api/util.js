export function GetHeaderToken(reqHeaders) {
  if (!reqHeaders) return ''

  const reqHeader = JSON.stringify(reqHeaders)
    .replace('x-wlb-authorization', 'xtoken')
    .replace('x-wlb-applicationid', 'xappid')
    .replace('content-type', 'contenttype')

  const reqHeaderParsed = JSON.parse(reqHeader)

  return {
    xWLBAuthorization: reqHeaderParsed.xtoken,
    xWLBApplicationId: reqHeaderParsed.xappid,
    contentType: reqHeaderParsed.contenttype,
  }
}
