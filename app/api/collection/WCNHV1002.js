import ApiUrl from '@/api/urls.json'

export function WCNHV1002($axios, xWLBHeader, dataObj) {
  const uri = ApiUrl.WCNHV1002
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
