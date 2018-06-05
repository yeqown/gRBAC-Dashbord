import {getApi, postApi} from '.'
import {TOKEN} from '@/config'

export function getAllRoles (params) {
  let {
    limit,
    skip,
    token = TOKEN
  } = params

  return getApi('/role/list', {limit, skip, token})
}

export function newRole (params) {
  let {
    name,
    token = TOKEN
  } = params

  return postApi('/role/new', {role_name: name, token})
}

export function assignPermtoRole (params) {
  let {
    role_id,
    perm_id,
    token = TOKEN
  } = params

  return postApi('/role/assign_perm', {role_id, permission_id: perm_id, token})
}

export function revokePermfromRole (params) {
  let {
    role_id,
    perm_id,
    token = TOKEN
  } = params
  return postApi('/role/revoke_perm', {role_id, permission_id: perm_id, token})
}
