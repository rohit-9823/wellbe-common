import ApiUrl from '@/api/urls.json'

export function WCSMTP1003($axios, xWLBHeader, date) {
  const uri = ApiUrl.WCSMTP1003 + '?' + 'answered=' + date
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
