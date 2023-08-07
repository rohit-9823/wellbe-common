import ApiUrl from '@/api/urls.json'

export function WCSCR1001($axios, xWLBHeader, screenId) {
  const uri = ApiUrl.WCSCR1001 + screenId

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
