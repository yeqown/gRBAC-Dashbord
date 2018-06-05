import {getApi, postApi} from '.'
import {TOKEN} from '@/config'

export function getAllPerms (params) {
  let {
    limit,
    skip,
    token = TOKEN
  } = params

  return getApi('/perm/list', {limit, skip, token})
}

export function newPerm (params) {
  let {
    name,
    desc,
    token = TOKEN
  } = params

  return postApi('/perm/new', {permission_name: name, permission_desc: desc, token})
}

export function editPerm (params) {
  let {
    id,
    name,
    desc,
    token = TOKEN
  } = params

  return postApi('/perm/edit', {permission_id: id, name, desc, token})
}
