import ApiUrl from '@/api/urls.json'

export function WCSMTP1002($axios, xWLBHeader, date, dataObj) {
  const uri = ApiUrl.WCSMTP1002 + '?' + 'answered=' + date
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
