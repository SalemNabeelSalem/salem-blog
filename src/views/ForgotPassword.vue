<template>
  <div class="reset-password">
    <Modal v-if="modalActive" v-on:close-modal="closeModal" />

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
            <input type="text" placeholder="Email" v-model="email" />
            <Email class="icon" />
          </div>
        </div>

        <button>Reset</button>

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

export default {
  name: "forgotPassword",

  components: {
    Email,
    Modal,
    Loading,
  },

  data() {
    return {
      email: null,
      modalActive: false,
      modalMessage: null,
      loading: null,
    };
  },

  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = null;
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