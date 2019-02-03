import proxy from '../../../src/object/proxy'
import when from '../../../src/when'
declare var assert : any // globally defined in test/helper.js for now

export interface Context {
  data: Data
}

export interface User {
  id: string
  name: string | null
  postIDs: string[]
}

export interface Post {
  id: string
  title: string
  content: string
  published: boolean
  authorId: string
}

export interface Data {
  posts: Post[]
  users: User[]
  idProvider: () => string
}

export default {
  beforeEach: () => {
  },
  'deeply-nested proxy objects can be typed nicely' () {
    const user = { id: 'some user', name: 'some name', postIDs: ['some post'] }
    const context = proxy<Context>('some context')
    context.data.users = [user]
    when(context.data.idProvider()).thenReturn('some id provider')

    assert._isEqual(context.data.users[0].name, 'some name')
  }
}