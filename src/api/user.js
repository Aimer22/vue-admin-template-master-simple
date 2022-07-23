import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/admin/index/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-admin-template/user/info',
    url:'/admin/index/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
