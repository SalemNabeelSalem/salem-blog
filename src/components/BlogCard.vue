<template>
  <div class="blog-card">
    <div class="icons" v-show="editingPostControl">
      <div class="icon">
        <Edit class="edit" />
      </div>

      <div class="icon">
        <Delete class="delete" />
      </div>
    </div>

    <img
      :src="require(`@/assets/blog-cards/${post.postCoverPhoto}.jpg`)"
      alt="blog post cover photo"
    />

    <div class="info">
      <h4>{{ post.postTitle }}</h4>

      <h6>Posted on: {{ post.postDate }}</h6>

      <router-link class="link" to="#">
        View the Post <Arrow class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Arrow from "@/assets/icons/arrow-right-light.svg";
import Edit from "@/assets/icons/edit-regular.svg";
import Delete from "@/assets/icons/trash-regular.svg";

export default {
  name: "blogCard",

  props: ["post"],

  components: {
    Arrow,
    Edit,
    Delete,
  },

  computed: {
    editingPostControl() {
      return this.$store.state.editingPostControl; // get editing post control from store
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;

      &:hover {
        background-color: #303030;

        .edit,
        .delete {
          path {
            fill: #fff;
          }
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      // post title
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 600;
    }

    h6 {
      // post date
      font-weight: 600;
      font-size: 12px;
      padding-bottom: 16px;
    }

    .link {
      // link to post
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 600;
      padding-top: 20px;
      font-size: 13px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }

      .arrow {
        // arrow icon
        width: 10px;
      }
    }
  }
}
</style>