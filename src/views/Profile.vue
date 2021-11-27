<template>
  <div class="profile">
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      @close-modal="closeModal"
    />

    <div class="container">
      <h2>Account Settings</h2>

      <div class="profile-info">
        <div class="initials">{{ profileInitials }}</div>

        <div class="admin-badge" v-if="admin">
          <AdminIcon class="icon" />
          <span>admin</span>
        </div>

        <div class="admin-badge" v-else>
          <UserIcon class="icon" />
          <span>User</span>
        </div>

        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>

        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>

        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>

        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="email" id="email" v-model="email" />
        </div>

        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminIcon from "@/assets/icons/user-crown-light.svg";
import UserIcon from "@/assets/icons/user-alt-light.svg";

import Modal from "@/components/Modal";

import firebase from "firebase/app";
import "firebase/auth";
import db from "@/firebase/firebaseInit";

export default {
  name: "Profile",

  components: {
    AdminIcon,
    UserIcon,
    Modal,
  },

  data() {
    return {
      modalActive: false, // visibility of modal
      modalMessage: "", // message to display in modal
    };
  },

  computed: {
    admin() {
      return this.$store.state.admin;
    },

    user() {
      return this.$store.state.user;
    },

    firstName: {
      get() {
        return this.$store.state.profileInfo.firstName;
      },
      set(payload) {
        this.$store.commit("changeFirstName", payload);
      },
    },

    lastName: {
      get() {
        return this.$store.state.profileInfo.lastName;
      },
      set(payload) {
        this.$store.commit("changeLastName", payload);
      },
    },

    username: {
      get() {
        return this.$store.state.profileInfo.username;
      },
      set(payload) {
        this.$store.commit("changeUsername", payload);
      },
    },

    email() {
      return this.$store.state.profileInfo.email;
    },

    profileInitials: {
      get() {
        return this.$store.state.profileInitials;
      },
    },
  },

  methods: {
    closeModal() {
      this.modalActive = !this.modalActive; // close modal
      this.modalMessage = ""; // reset modal message
    },

    // check all form fields are filled
    checkFormFields() {
      if (
        this.firstName === "" ||
        this.lastName === "" ||
        this.username === ""
      ) {
        this.modalMessage = "Please fill in all fields";
        this.modalActive = true;
        return false;
      } else {
        return true;
      }
    },

    updateProfile() {
      if (this.checkFormFields()) {
        try {
          db.collection("users")
            .doc(this.$store.state.user.uid)
            .update({
              firstName: this.firstName,
              lastName: this.lastName,
              username: this.username,
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              this.modalMessage = "Profile updated successfully";
              this.modalActive = true;
              this.$store.dispatch("updateProfileInitials");
            })
            .catch((error) => {
              this.modalMessage = error.message;
              this.modalActive = true;
            });
        } catch (error) {
          this.modalMessage = error.message;
          this.modalActive = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  position: relative;

  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
