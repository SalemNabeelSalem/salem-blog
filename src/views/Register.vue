<template>
  <div class="form-wrap">
    <Loading v-if="loading" />

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
          <input
            type="text"
            placeholder="First Name"
            v-model="userInfo.firstName"
          />
          <User class="icon" />
        </div>

        <div class="input">
          <input
            type="text"
            placeholder="Last Name"
            v-model="userInfo.lastName"
          />
          <User class="icon" />
        </div>

        <div class="input">
          <input
            type="text"
            placeholder="Username"
            v-model="userInfo.username"
          />
          <User class="icon" />
        </div>

        <div class="input">
          <input type="email" placeholder="Email" v-model="userInfo.email" />
          <Email class="icon" />
        </div>

        <div class="input">
          <input
            type="password"
            placeholder="Password"
            v-model="userInfo.password"
          />
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

import Loading from "@/components/Loading";

import firebase from "firebase/app";
import "firebase/auth";
import db from "@/firebase/firebaseInit";

export default {
  name: "register",

  components: {
    Email,
    Password,
    User,
    Loading,
  },

  data() {
    return {
      error: null,
      errorMsg: "",
      loading: false, // visibility of loading spinner

      userInfo: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    // check all form fields are filled
    checkFormFields() {
      if (
        this.userInfo.firstName === "" ||
        this.userInfo.lastName === "" ||
        this.userInfo.username === "" ||
        this.userInfo.email === "" ||
        this.userInfo.password === ""
      ) {
        this.error = true;
        this.errorMsg = "Please fill in all fields";
        return false;
      } else {
        return true;
      }
    },

    register() {
      if (this.checkFormFields()) {
        this.error = false;
        this.errorMsg = "";

        try {
          this.loading = true; // show loading spinner
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.userInfo.email,
              this.userInfo.password
            )
            .then(
              (user) => {
                this.loading = false; // hide loading spinner
                db.collection("users").doc(user.user.uid).set({
                  firstName: this.userInfo.firstName,
                  lastName: this.userInfo.lastName,
                  username: this.userInfo.username,
                  email: this.userInfo.email,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  updateAt: firebase.firestore.FieldValue.serverTimestamp(),
                });

                if (user) {
                  console.log("user created successfully with uid: ", user.user.uid);
                  this.$router.push({ name: "Home" });
                } else {
                  this.error = true;
                  this.errorMsg = "something went wrong user not created";
                }
              },
              (error) => {
                this.loading = false; // hide loading spinner
                this.error = true;
                this.errorMsg = error.message;
              }
            );
        } catch (error) {
          this.error = true;
          this.errorMsg = error.message;
        }
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