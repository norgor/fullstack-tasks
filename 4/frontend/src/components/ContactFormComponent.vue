<template>
  <form class="contact-form" @submit.prevent="submit">
    <label for="name-field">Name: </label>
    <input
      id="name-field"
      type="text"
      placeholder="Name Nameson"
      v-model="form.name"
      @input="updateValidity"
    />

    <label for="email-field">Email: </label>
    <input
      id="email-field"
      type="email"
      placeholder="name@example.com"
      v-model="form.email"
      @input="updateValidity"
    />

    <label for="message-field">Message: </label>
    <textarea
      id="message-field"
      placeholder="I like cheese."
      v-model="form.message"
      @input="updateValidity"
    />

    <input :disabled="!canSubmit" type="submit" value="Send!" />
  </form>
  <p v-if="status">{{ status }}</p>
</template>

<script>
import { string, object } from "yup";
import { SubmitContactForm } from "@/services/ContactService.js";

const USER_SCHEMA = object({
  name: string()
    .required()
    .matches(/^([\w]+ ){1,}[\w]+$/),
  email: string().required().email(),
  message: string().required(),
});

export default {
  name: "contact-form",
  data() {
    return {
      formMessage: "",
      canSubmit: false,
    };
  },
  computed: {
    form() {
      return {
        message: this.formMessage,
        ...this.$store.state.formDetails,
      };
    },
    status() {
      return this.$store.getters.contactFormSubmitNiceStatus;
    },
  },
  methods: {
    async updateValidity() {
      console.log(this.$store.getters.contactFormSubmitNiceStatus);
      this.canSubmit = await USER_SCHEMA.isValid(this.form);
    },
    async submit() {
      this.$store.dispatch("setContactFormSending");
      await SubmitContactForm(this.form);
      this.$store.dispatch("setFormDetails", this.form);
      this.$store.dispatch("setContactFormSent");
      this.updateValidity();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contact-form {
  display: grid;
  margin-left: 30%;
  margin-right: 30%;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr auto 1fr;
  row-gap: 5px;
  column-gap: 8px;
}
.contact-form label {
  margin-top: 2px;
}
.contact-form input {
  font: inherit;
  padding: 5px;
  margin: 0;
}
.contact-form textarea {
  font: inherit;
  resize: none;
}
.contact-form input[type="submit"] {
  grid-column: 1/3;
}
</style>
