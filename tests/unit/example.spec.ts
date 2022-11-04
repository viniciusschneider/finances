import AppVue from '@/App.vue';
import { shallowMount } from '@vue/test-utils';

xdescribe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(AppVue, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
