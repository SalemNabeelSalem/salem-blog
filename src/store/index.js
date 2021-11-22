import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
import "firebase/auth";
import db from "@/firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // state is the data that is shared between components
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

    user: null,

    profileEmail: null,

    profileFirstName: null,

    profileLastName: null,

    profileUsername: null,

    profileId: null,

    profileInitials: null,
  },

  mutations: { // mutations are used to change the state of the store
    toggleEditingPostControl(state, payload) { // payload is boolean value
      state.editingPostControl = payload;
    },

    setProfileInfo(state, payload) {
      state.profileId = payload.id;
      state.profileEmail = payload.data().email;
      state.profileFirstName = payload.data().firstName;
      state.profileLastName = payload.data().lastName;
      state.profileUsername = payload.data().username;
    },

    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
  },

  actions: {
    async getCurrentUser({ commit }) {
      const user = db.collection("users").doc(firebase.auth().currentUser.uid);
      const userData = await user.get();
      commit("setProfileInfo", userData);
      commit("setProfileInitials");
    },
  },

  modules: { // modules are used to group related state

  },
});
