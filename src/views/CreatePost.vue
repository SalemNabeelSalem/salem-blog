<template>
  <div class="create-post">
    <BlogPostCoverPhotoPreview
      v-show="this.$store.state.blogPost.coverPhotoPreview"
    />

    <div class="container">
      <div class="err-message" :class="{ invisible: !error }">
        <p><span>Error:</span> {{ errorMsg }}</p>
      </div>

      <div class="blog-info">
        <input
          type="text"
          plaseholder="Enter Blog Title"
          v-model="blogPostTitle"
        />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            id="blog-photo"
            ref="blogPhoto"
            accept=".png, .jpg, .jpeg"
            @change="uploadBlogPostCoverPhoto"
          />
          <button
            class="preview"
            :class="{
              'button-inactive': !this.$store.state.blogPost.coverPhotoUrl,
            }"
            @click="showCoverPhotoPreview"
          >
            Previwe Photo
          </button>
          <span>
            File Chosen: {{ this.$store.state.blogPost.coverPhotoName }}
          </span>
        </div>
      </div>

      <div class="editor">
        <vue-editor
          :editorOptions="editorSetting"
          v-model="blogPostHtml"
          useCustomImageHandler
        />
      </div>

      <div class="blog-actions">
        <button>Publish Blog</button>
        <router-link class="router-button" to="#">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogPostCoverPhotoPreview from "@/components/PhotoPreview.vue";

import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "CreatePost",

  components: {
    BlogPostCoverPhotoPreview,
  },

  data() {
    return {
      error: false,

      errorMsg: "",

      editorSetting: {
        modules: {
          imageResize: {},
        },
      },

      imageFile: null,
    };
  },

  computed: {
    profileId() {
      return this.$store.state.profileInfo.id;
    },

    blogPostTitle: {
      get() {
        return this.$store.state.blogPost.title;
      },

      set(payload) {
        this.$store.commit("updateBlogPostTitle", payload);
      },
    },

    blogPostHtml: {
      get() {
        return this.$store.state.blogPost.html;
      },

      set(payload) {
        this.$store.commit("updateBlogPostHtml", payload);
      },
    },

    blogPostCoverPhotoName() {
      return this.$store.state.blogPost.coverPhotoName;
    },
  },

  methods: {
    uploadBlogPostCoverPhoto() {
      this.imageFile = this.$refs.blogPhoto.files[0];

      const imageFileName = this.imageFile.name;

      this.$store.commit("updateBlogPostCoverPhotoName", imageFileName);

      const imageFileUrl = URL.createObjectURL(this.imageFile);

      this.$store.commit("updateBlogPostCoverPhotoUrl", imageFileUrl);
    },

    showCoverPhotoPreview() {
      this.$store.commit("openCoverPhotoPreview");
    },
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px; // top = 10px, bottom = 60px, left = 25px, right = 25px
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
