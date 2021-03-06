<template>
  <div class="form-wrap">
    <Loading v-if="loading" />

    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">
          Register
        </router-link>
      </p>

      <h2>Login to Blog Account</h2>

      <div class="inputs">
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

      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">
        Forgot your password?
      </router-link>

      <button @click.prevent="signIn">Sign In</button>

      <div class="angle"></div>
    </form>

    <div class="background"></div>
  </div>
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
import Email from "@/assets/icons/envelope-regular.svg";
import Password from "@/assets/icons/lock-alt-solid.svg";

import Loading from "@/components/Loading";

import firebase from "firebase/app";
import "firebase/auth";
import db from "@/firebase/firebaseInit";

export default {
  name: "login",

  components: {
    Email,
    Password,
    Loading,
  },

  data() {
    return {
      error: null,
      errorMsg: "",
      loading: false, // visibility of loading spinner

      userInfo: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    // check all form fields are filled
    checkFormFields() {
      if (this.userInfo.email === "" || this.userInfo.password === "") {
        this.error = true;
        this.errorMsg = "Please fill in all fields";
        return false;
      } else {
        return true;
      }
    },

    signIn() {
      if (this.checkFormFields()) {
        this.error = false;
        this.errorMsg = "";

        try {
          this.loading = true; // show loading spinner
          firebase
            .auth()
            .signInWithEmailAndPassword(
              this.userInfo.email,
              this.userInfo.password
            )
            .then(
              (user) => {
                this.loading = false; // hide loading spinner
                db.collection("users")
                  .doc(user.user.uid)
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      console.log("user exists with id: ", user.user.uid);

                      // console.log("user exists with id: ", firebase.auth().currentUser.uid);

                      this.$router.push({ name: "Home" });
                    } else {
                      this.loading = false; // hide loading spinner
                      this.error = true;
                      this.errorMsg = "user does not exist";
                    }
                  });
              },
              (error) => {
                this.loading = false; // hide loading spinner
                this.error = true;
                this.errorMsg = error.message;
              }
            );
        } catch (error) {
          this.loading = false;
          this.error = true;
          this.errorMsg = error.message;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0 50px;
    }

    // title of the form
    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;

      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px; // top = 16px, bottom = 32px, left = 0, right = 0
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("../assets/background.jpg");
    width: 100%;
    height: 100%;

    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
