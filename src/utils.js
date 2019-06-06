import { ME_FILENAME, SUBJECTS_FILENAME } from './constants'

export function jsonCopy(object) {
  return JSON.parse(JSON.stringify(object))
}


/**
 * Return a JSON object with the username
 * and domain of the kingdom
 *
 * Accepts URLs of the format:
 * https://example.com/kingdom/username.id
 * @param  {string} url
 * @return {Object} an Object with keys `app` and `username`
 */
export function subjectFromKingdomUrl(url) {
  const tokens = url.split('/kingdom')
  const app = tokens[0]
  const username = tokens[1].split('/')[1]
  return {
    app,
    username
  }
}

export function resolveSubjects(component, userSession, subjects) {
  subjects.map((subject, index) => {
    const options = {
      decrypt: false,
      app: subject.app,
      username: subject.username
    }
    return userSession.getFile(ME_FILENAME, options) // fetch me.json for each subject
    .then(content => {
      if(!content) {

        subjects[index] = Object.assign({}, subject, { missing: true })
        component.setState({ subjects })
        return subjects
      } else {
        subjects[index] = Object.assign({}, subject, { missing: false }, JSON.parse(content))
        component.setState({ subjects })
        return subjects
      }

    })
  })
}

export function loadRuler(userSession, username, app) {
  const options = { decrypt: false, username, app }
  return userSession.getFile(ME_FILENAME, options)
  .then((content) => {
    if(content) {
      const ruler = JSON.parse(content)
      return ruler
    } else {
      const ruler = null
      return ruler
    }
  })
}

export function loadSubjects(userSession, username, app) {
  const options = { decrypt: false, username, app }
  return userSession.getFile(SUBJECTS_FILENAME, options)
  .then((content) => {
    if(content) {
      const subjects = JSON.parse(content)
      return subjects
    } else {
      return []
    }
  })
}
