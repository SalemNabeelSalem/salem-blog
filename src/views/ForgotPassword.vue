<template>
  <div class="reset-password">
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      @close-modal="closeModal"
    />

    <Loading v-if="loading" />

    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Already have an account?
          <router-link class="router-link" :to="{ name: 'Login' }">
            Login
          </router-link>
        </p>

        <h2>Reset Password</h2>

        <p>Forgot your passowrd? Enter your email to reset it.</p>

        <div class="inputs">
          <div class="input">
            <input type="email" placeholder="Email" v-model="userInfo.email" />
            <Email class="icon" />
          </div>
        </div>

        <button @click.prevent="resetPassword">Reset</button>

        <div class="angle"></div>
      </form>

      <div class="background"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Email from "@/assets/icons/envelope-regular.svg";

import Modal from "@/components/Modal";
import Loading from "@/components/Loading";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "forgotPassword",

  components: {
    Email,
    Modal,
    Loading,
  },

  data() {
    return {
      modalActive: false, // visibility of modal
      modalMessage: null, // message to display in modal
      loading: false, // visibility of loading spinner

      userInfo: {
        email: "",
      },
    };
  },

  methods: {
    closeModal() {
      this.modalActive = !this.modalActive; // close modal
      this.modalMessage = ""; // reset modal message
      this.userInfo.email = ""; // reset email input
    },

    checkFormFields() {
      if (this.userInfo.email === "") {
        this.modalMessage = "Please enter your email.";
        this.modalActive = true;
        return false;
      } else {
        return true;
      }
    },

    resetPassword() {
      if (this.checkFormFields()) {
        try {
          this.loading = true; // show loading spinner
          firebase
            .auth()
            .sendPasswordResetEmail(this.userInfo.email)
            .then(() => {
              this.loading = false; // hide loading spinner
              this.modalMessage =
                "We have sent you an email with instructions to reset your password.";
              this.modalActive = true;
            })
            .catch((error) => {
              this.loading = false; // hide loading spinner
              this.modalMessage = error.message;
              this.modalActive = true;
            });
        } catch (error) {
          this.loading = false; // hide loading spinner
          this.modalMessage = error.message;
          this.modalActive = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;

  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }

      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
