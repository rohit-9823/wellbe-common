import ApiUrl from '@/api/urls.json'

export function WCMI1003($axios, xWLBHeader, payload) {
  const uri = ApiUrl.WCMI1003
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
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
