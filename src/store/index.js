import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
import "firebase/auth";
import db from "@/firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // state is the data that is shared between components
    blogCards: [
      {
        postTitle: "Post Card #1",
        postCoverPhoto: "stock-1",
        postDate: "May 1, 2021",
      },
      {
        postTitle: "Post Card #2",
        postCoverPhoto: "stock-2",
        postDate: "May 2, 2021",
      },
      {
        postTitle: "Post Card #3",
        postCoverPhoto: "stock-3",
        postDate: "May 3, 2021",
      },
      {
        postTitle: "Post Card #4",
        postCoverPhoto: "stock-4",
        postDate: "May 4, 2021",
      },
    ],

    editingPostControl: false, // true if editing post, false if not

    user: false,

    profileInfo: {
      id: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
    },

    profileInitials: "",
  },

  mutations: {
    toggleEditingPostControl(state, payload) {
      state.editingPostControl = payload; // payload is boolean value
    },

    updateUser(state, payload) {
      state.user = payload;
    },

    setProfileInfo(state, payload) {
      state.profileInfo.id = payload.id;
      state.profileInfo.firstName = payload.data().firstName;
      state.profileInfo.lastName = payload.data().lastName;
      state.profileInfo.username = payload.data().username;
      state.profileInfo.email = payload.data().email;
    },

    setProfileInitials(state) {
      state.profileInitials =
        state.profileInfo.firstName.match(/(\b\S)?/g).join("") +
        state.profileInfo.lastName.match(/(\b\S)?/g).join("");
    },

    changeFirstName(state, payload) {
      state.profileInfo.firstName = payload;
    },

    changeLastName(state, payload) {
      state.profileInfo.lastName = payload;
    },

    changeUsername(state, payload) {
      state.profileInfo.username = payload;
    },
  },

  actions: {
    async getCurrentUser({ commit }) {
      const user = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);

      const userData = await user.get();

      commit("setProfileInfo", userData);

      commit("setProfileInitials");

      // console.log("user email is: ", userData.data().email);
    },

    /*
    async updateUserSettings({ commit, state }) {
      const user = await db.collection("users").doc(state.profileInfo.id);

      await user.update({
        firstName: state.profileInfo.firstName,
        lastName: state.profileInfo.lastName,
        username: state.profileInfo.username,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      commit("setProfileInitials");
    },
    */

    async updateProfileInitials({ commit }) {
      commit("setProfileInitials");
    },
  },

  modules: {
    // modules are used to group related state
  },
});
