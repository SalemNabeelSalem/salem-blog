<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <Close @click="closeCoverPhotoPreview" class="icon" />

      <img
        :src="this.blogPostCoverPhotoUrl"
        :alt="this.blogPostCoverPhotoName"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Close from "@/assets/icons/times-circle-light.svg";

export default {
  name: "PhotoPreview",

  components: {
    Close,
  },

  computed: {
    blogPostCoverPhotoName() {
      return this.$store.state.blogPost.coverPhotoName;
    },

    blogPostCoverPhotoUrl() {
      return this.$store.state.blogPost.coverPhotoUrl;
    },
  },

  methods: {
    closeCoverPhotoPreview() {
      this.$store.commit("openCoverPhotoPreview");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .modal-content {
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    height: 400px;
    width: 600px;
    padding: 50px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .icon {
      width: 24px;
      height: auto;
      cursor: pointer;
      font-size: 24px;
      position: absolute;
      top: 15px;
      right: 15px;
      color: #303030;
    }

    img {
      margin-top: 16px;
      display: block;
      width: auto;
      height: 100%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
