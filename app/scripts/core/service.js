import md5 from 'md5'

export function youdaoTranslate (q) {
  const secret = '86yFtM6b9GkojYZqoWtdQzp0KFcong1v'
  const appId = '53c2f3942b5d0c65'
  const salt = new Date().getTime() + ''
  let url = '//openapi.youdao.com/api'
  url += '?q=' + encodeURI(q)
  url += '&from=auto'
  url += '&to=auto'
  url += '&appKey=' + appId
  url += '&salt=' + salt
  url += '&sign=' + md5(appId + q + salt + secret)
  console.log('[call api] url: ', url)
  return fetch(url).then(res => res.json())
}
