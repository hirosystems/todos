import { shallowMount, mount } from '@vue/test-utils'
import Landing from '@/components/Landing.vue'

const mock = {
  methods: {
    signIn: jest.fn()
  }
}

describe('Landing.vue', () => {
  it('should contain h1 element', () => {
    const wrapper = mount(Landing)
    expect(wrapper.contains('h1')).toBe(true)
  })

  it('should contain p element', () => {
    const wrapper = mount(Landing)
    expect(wrapper.contains('p')).toBe(true)
  })

  it('should contain button element', () => {
    const wrapper = mount(Landing)
    expect(wrapper.contains('button')).toBe(true)
  })
})

describe('Sign in button', () => {
  it('should call method signIn() when clicked', async () => {
    const wrapper = shallowMount(Landing, mock)
    await wrapper.find('button').trigger('click')
    expect(mock.methods.signIn).toHaveBeenCalled()
  })
})
