import ApiUrl from '@/api/urls.json'

export function WCNHV1001($axios, xWLBHeader, date) {
  const uri = ApiUrl.WCNHV1001
  const config = {
    method: 'get',
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
