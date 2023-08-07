import ApiUrl from '@/api/urls.json'

export function WCMI1004($axios, xWLBHeader, prefId) {
  const uri = ApiUrl.WCMI1004 + prefId
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: uri,
    headers: {
      'Content-Type': 'application/json',
      'X-WLB-Authorization': xWLBHeader.xWLBAuthorization,
      'X-WLB-ApplicationId': xWLBHeader.xWLBApplicationId,
    },
  }

  return $axios(config).then(function (response) {
    return response
  })
}
