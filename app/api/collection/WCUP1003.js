import ApiUrl from '@/api/urls.json'

export function WCUP1003($axios, xWLBHeader, dataObj) {
  const uri = ApiUrl.WCUP1003
  const config = {
    method: 'put',
    url: uri,
    headers: {
      'Content-Type': 'application/json',
      'X-WLB-Authorization': xWLBHeader.xWLBAuthorization,
      'X-WLB-ApplicationId': xWLBHeader.xWLBApplicationId,
    },
    data: JSON.stringify(dataObj),
  }

  return $axios(config).then(function (response) {
    return response
  })
}
