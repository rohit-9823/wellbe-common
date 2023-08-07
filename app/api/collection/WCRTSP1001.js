import ApiUrl from '@/api/urls.json'

export function WCRTSP1001($axios, xWLBHeader, payload) {
  const uri = ApiUrl.WCRTSP1001 + '?mode=2'

  const config = {
    method: 'post',
    url: uri,
    headers: {
      'Content-Type': 'application/json',
      'X-WLB-Authorization': xWLBHeader.xWLBAuthorization,
      'X-WLB-ApplicationId': xWLBHeader.xWLBApplicationId,
    },
    data: JSON.stringify(payload),
  }

  return $axios(config).then(function (response) {
    return response
  })
}
