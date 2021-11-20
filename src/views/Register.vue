<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">
          Login
        </router-link>
      </p>

      <h2>Create Your Blog Account</h2>

      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <User class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <User class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <User class="icon" />
        </div>

        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>

        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <Password class="icon" />
        </div>

        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>

      <button @click.prevent="register">Sign Up</button>

      <div class="angle"></div>
    </form>

    <div class="background"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Email from "@/assets/icons/envelope-regular.svg";
import Password from "@/assets/icons/lock-alt-solid.svg";
import User from "@/assets/icons/user-alt-light.svg";

import firebase from "firebase/app";
import "firebase/auth";
import db from "@/firebase/firebaseInit";

export default {
  name: "register",

  components: {
    Email,
    Password,
    User,
  },

  data() {
    return {
      error: null,
      errorMsg: "",

      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    };
  },

  methods: {
    register() {
      if (
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== "" &&
        this.email !== "" &&
        this.password !== ""
      ) {
        this.error = false;
        this.errorMsg = "";

        try {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(
              (user) => {
                db.collection("users").doc(user.user.uid).set({
                  firstName: this.firstName,
                  lastName: this.lastName,
                  username: this.username,
                  email: this.email,
                });

                this.$router.push({ name: "Home" });
              },
              (error) => {
                this.error = true;
                this.errorMsg = error.message;
              }
            );
        } catch (error) {
          this.error = true;
          this.errorMsg = error.message;
        }
      } else {
        this.error = true;
        this.errorMsg = "Please fill out all fields.";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>