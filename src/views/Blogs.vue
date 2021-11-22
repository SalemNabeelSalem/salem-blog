<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit">
        <span>Toggle Editing Post</span>

        <input type="checkbox" v-model="editingPostControl" />
      </div>

      <BlogCard :post="post" v-for="(post, index) in blogCards" :key="index" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogCard from "@/components/BlogCard";

export default {
  name: "blogs",

  components: {
    BlogCard,
  },

  data() {
    return {};
  },

  computed: { 
    blogCards() {
      return this.$store.state.blogCards;
    },

    editingPostControl: {
      get() {
        return this.$store.state.editingPostControl;
      },

      set(payload) {
        this.$store.commit("toggleEditingPostControl", payload); // payload is true or false
      },
    },
  },

  beforeDestroy() { // this is called when the component is destroyed
    this.$store.commit("toggleEditingPostControl", false); // reset editing post control
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span { // is the toggle text
      margin-right: 16px;
    }

    input[type="checkbox"] { // is the toggle switch
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type="checkbox"]:before {
      background: rgb(7, 182, 45);
      left: 52px;
    }
  }
}
</style>