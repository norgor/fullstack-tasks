import { shallowMount } from '@vue/test-utils'
import createStore from "@/store/index.js";
import LoginComponent from '@/components/LoginComponent.vue'
import axios from 'axios';
import flushPromises from "flush-promises";

jest.mock('axios');

describe('LoginComponent.vue', () => {
  afterEach(() => {
    axios.post.mockClear();
  });

  it('check that LoginComponent renders', () => {
    const loginTitle = 'Please login!'
    const wrapper = shallowMount(LoginComponent)
    expect(wrapper.text()).toMatch(loginTitle)

    // add some additional checks. For example related to loginStatusLabel element
    // check that loginstatusLabel component exists
    expect(wrapper.find('#loginstatusLabel').exists()).toBe(true);
    const statusId = wrapper.find('#loginstatusLabel');
    // check that id of the loginstatusLabel element is correct
    expect(statusId.element.id).toBe('loginstatusLabel');
    // check that the loginstatusLabel element is displaying correct value
    expect(statusId.element.textContent).toBe('');
  });
  it('Modify LoginComponent data and test', async () => {
    const wrapper = shallowMount(LoginComponent)

    // get loginstatusLabel element
    const statusId = wrapper.find('#loginstatusLabel');
    // change loginStatus data and check that loginstatusLabel element is updated accordingly
    await wrapper.setData({ loginStatus: 'Success' });
    expect(statusId.element.textContent).toBe('Success');
    await wrapper.setData({ loginStatus: 'Failed' });
    expect(statusId.element.textContent).toBe('Failed');
  });
  it('Submits the username and password', async () => {
    const wrapper = shallowMount(LoginComponent, {
      global: {
        mocks: {
          $store: createStore(),
        }
      }
    });
    axios.post.mockImplementation(() => Promise.resolve({
      data: {
        loginStatus: "Success"
      }
    }));

    await wrapper.find("#usernameInput").setValue("foobar");
    await wrapper.find("#passwordInput").setValue("boofar");
    await wrapper.find("#signInButton").trigger("click");

    await flushPromises();

    const request = axios.post.mock.calls[0][1];

    expect(request).toMatchObject({ username: "foobar", password: "boofar" });
  });
  it('Displays the submit result', async () => {
    const wrapper = shallowMount(LoginComponent, {
      global: {
        mocks: {
          $store: createStore(),
        }
      }
    });
    const statusLabel = wrapper.find("#loginstatusLabel");
    axios.post.mockImplementation(() => Promise.resolve({
      data: { loginStatus: "Success" }
    }));

    await wrapper.find("#usernameInput").setValue("username");
    await wrapper.find("#passwordInput").setValue("password");
    await wrapper.find("#signInButton").trigger("click");

    await flushPromises();

    expect(statusLabel.element.textContent).toBe("Success");
  });
  it('Saves username into store', async () => {
    const store = createStore();
    const wrapper = shallowMount(LoginComponent, {
      global: {
        mocks: {
          $store: store,
        }
      }
    });
    axios.post.mockImplementation(() => Promise.resolve({
      data: { loginStatus: "Success" }
    }));

    await wrapper.find("#usernameInput").setValue("username");
    await wrapper.find("#passwordInput").setValue("password");
    await wrapper.find("#signInButton").trigger("click");

    await flushPromises();

    expect(store.state.auth.username).toBe("username");
  });
});