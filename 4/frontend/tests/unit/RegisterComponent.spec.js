import { shallowMount } from '@vue/test-utils'
import createStore from "@/store/index.js";
import RegisterComponent from '@/components/RegisterComponent.vue'
import axios from 'axios';
import flushPromises from "flush-promises";

jest.mock('axios');

describe('RegisterComponent.vue', () => {
  afterEach(() => {
    axios.post.mockClear();
  });

  it('Submits the email, username and password', async () => {
    const wrapper = shallowMount(RegisterComponent, {
      global: {
        mocks: {
          $store: createStore(),
        }
      }
    });
    axios.post.mockImplementation(() => Promise.resolve({
      data: {
        status: "Success"
      }
    }));

    await wrapper.find("#emailInput").setValue("baz");
    await wrapper.find("#usernameInput").setValue("foobar");
    await wrapper.find("#passwordInput").setValue("boofar");
    await wrapper.find("#registerButton").trigger("click");

    await flushPromises();

    const request = axios.post.mock.calls[0][1];

    expect(request).toMatchObject({
      email: "baz",
      username: "foobar",
      password: "boofar"
    });
  });
  it('Displays the submit result', async () => {
    const wrapper = shallowMount(RegisterComponent, {
      global: {
        mocks: {
          $store: createStore(),
        }
      }
    });
    const statusLabel = wrapper.find("#statusLabel");
    axios.post.mockImplementation(() => Promise.resolve({
      data: {
        status: "Success"
      }
    }));

    await wrapper.find("#emailInput").setValue("baz");
    await wrapper.find("#usernameInput").setValue("foobar");
    await wrapper.find("#passwordInput").setValue("boofar");
    await wrapper.find("#registerButton").trigger("click");

    await flushPromises();

    expect(statusLabel.element.textContent).toBe("Success");
  });
  it('Saves username into store', async () => {
    const store = createStore();
    const wrapper = shallowMount(RegisterComponent, {
      global: {
        mocks: {
          $store: store,
        }
      }
    });
    axios.post.mockImplementation(() => Promise.resolve({
      data: {
        status: "Success"
      }
    }));

    await wrapper.find("#emailInput").setValue("baz");
    await wrapper.find("#usernameInput").setValue("foobar");
    await wrapper.find("#passwordInput").setValue("boofar");
    await wrapper.find("#registerButton").trigger("click");

    await flushPromises();

    expect(store.state.auth.username).toBe("foobar");
  });
});