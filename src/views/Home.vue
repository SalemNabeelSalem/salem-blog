<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />

    <BlogPost :post="post" v-for="(post, index) in blogPosts" :key="index" />

    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>

        <div class="blog-cards">
          <BlogCard
            v-for="(post, index) in blogCards"
            :key="index"
            :post="post"
          />
        </div>
      </div>
    </div>

    <div class="updates" v-if="!user">
      <div class="container">
        <h2>never miss a post. register for your free account today!</h2>

        <router-link class="router-button" :to="{ name: 'Register' }">
          Register for Blog <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogPost from "@/components/BlogPost";
import BlogCard from "@/components/BlogCard";
import Arrow from "@/assets/icons/arrow-right-light.svg";

export default {
  name: "home",

  components: {
    BlogPost,
    BlogCard,
    Arrow,
  },

  data() {
    return {
      welcomeScreen: {
        welcomeScreen: true,

        welcomeTitle: "welcome!",

        welcomeBody: "It's so good to have you here! Welcome to my blog.",

        welcomeCoverPhoto: "welcome",
      },

      blogPosts: [
        {
          postTitle: "This is a Filter Title1!",
          postBody: "This is a filter blog post title2!",
          postCoverPhoto: "beautiful-stories",
        },
        {
          postTitle: "This is a Filter Title2!",
          postBody: "This is a filter blog post title2!",
          postCoverPhoto: "designed-for-everyone",
        },
      ],
    };
  },

  computed: {
    blogCards() {
      return this.$store.state.blogCards;
    },

    user() {
      return this.$store.state.user;
    },
  },
};
</script>


<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>