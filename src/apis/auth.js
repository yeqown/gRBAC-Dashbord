import {postApi} from '.'

export function verify (params) {
  let {
    secret
  } = params

  return postApi('/admin/verify', {secret})
}
