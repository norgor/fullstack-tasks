import { createStore } from 'vuex'

const SUBMIT_STATUS = {
  NONE: "",
  SENDING: "SENDING",
  SENT: "SENT",
};
const NICE_SUBMIT_STATUS = {
  [SUBMIT_STATUS.NONE]: "",
  [SUBMIT_STATUS.SENDING]: "Sending...",
  [SUBMIT_STATUS.SENT]: "Sent!",
}

export default () => createStore({
  state() {
    return {
      auth: {
        username: null,
      },
      formDetails: {
        name: "",
        email: "",
      },
      contactFormSubmitStatus: "",
    }
  },
  getters: {
    authed(state) {
      return state.auth.username !== null;
    },
    contactFormSubmitNiceStatus(state) {
      return NICE_SUBMIT_STATUS[state.contactFormSubmitStatus];
    }
  },
  mutations: {
    SET_AUTH_USERNAME(state, username) {
      state.auth.username = username;
    },
    SET_CONTACT_FORM_SUBMIT_STATUS(state, status) {
      state.contactFormSubmitStatus = status;
    },
    SET_FORM_DETAILS(state, { name, email }) {
      state.formDetails = { name, email };
    }
  },
  actions: {
    setContactFormSending({ commit }) {
      commit("SET_CONTACT_FORM_SUBMIT_STATUS", SUBMIT_STATUS.SENDING);
    },
    setContactFormSent({ commit }) {
      commit("SET_CONTACT_FORM_SUBMIT_STATUS", SUBMIT_STATUS.SENT);
      setTimeout(() => {
        commit("SET_CONTACT_FORM_SUBMIT_STATUS", SUBMIT_STATUS.NONE);
      }, 2000);
    },
    setFormDetails({ commit }, formDetails) {
      commit("SET_FORM_DETAILS", formDetails);
    },
    setAuthUsername({ commit }, username) {
      commit("SET_AUTH_USERNAME", username);
    },
  },
  modules: {
  }
});
