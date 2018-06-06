import {getApi, postApi} from './'
import {TOKEN} from '@/config'

export function getAllUsers (params) {
  let {
    limit = 10,
    skip = 0,
    token = TOKEN
  } = params

  if (!token) {
    token = '129831nas8b12i2sajkd'
  }

  return getApi('/user/list', {limit, skip, token})
}

export function revokeRolefromUser (params) {
  let {
    user_id,
    role_id,
    token = TOKEN
  } = params

  return postApi('/user/revoke_role', {user_id, role_id, token})
}

export function assignRoletoUser (params) {
  let {
    user_id,
    role_id,
    token = TOKEN
  } = params

  return postApi('/user/assign_role', {user_id, role_id, token})
}

export function newUser (params) {
  let {
    mobile,
    token = TOKEN
  } = params

  return postApi('/user/new', {mobile, token})
}
