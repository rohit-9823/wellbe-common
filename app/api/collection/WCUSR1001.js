import ApiUrl from '@/api/urls.json'

export function WCUSR1001($axios, xWLBHeader) {
  const uri = ApiUrl.WCUSR1001
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
