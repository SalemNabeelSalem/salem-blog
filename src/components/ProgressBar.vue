<template>
  <div class="modal">
    <div class="modal-content">
      <radial-progress-bar
        :diameter="diameter"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
      >
        <!-- <p>Total steps: {{ totalSteps }}</p> -->

        <p>Completed: {{ completedSteps }}</p>
      </radial-progress-bar>

      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RadialProgressBar from "vue-radial-progress";

export default {
  name: "ProgressBar",

  // props are passed in from the parent component
  props: ["diameter", "completedSteps", "totalSteps", "buttonActive"],

  components: {
    RadialProgressBar,
  },

  methods: {
    closeModal() {
      this.$emit("close-modal"); // emit close-modal event
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;

    .radial-progress-container {
      margin: auto;
    }

    // modal message
    p {
      text-align: center;
    }

    // close button
    button {
      align-self: center;
      margin-top: 20px;
    }
  }
}
</style>
