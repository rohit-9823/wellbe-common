import ApiUrl from '@/api/urls.json'

export function WCSMTP1001($axios, xWLBHeader, date) {
  const uri = ApiUrl.WCSMTP1001 + '?' + 'answered=' + date
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
