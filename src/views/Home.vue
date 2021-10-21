<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />

    <BlogPost
      :post="post"
      v-for="(post, index) in sampleBlogPost"
      :key="index"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import BlogPost from "@/components/BlogPost";

export default {
  name: "home",

  components: {
    BlogPost,
  },

  data() {
    return {
      welcomeScreen: {
        title: "Welocome!",

        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",

        welcomeScreen: true,

        photo: "coding",
      },

      sampleBlogPost: [
        {
          title: "This is a Filter Title1!",
          blogHtml: "This is a filter blog post title2!",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "This is a Filter Title2!",
          blogHtml: "This is a filter blog post title2!",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],

      sampleBlogCards: [
        {
          blogTitle: "Blog Card #1",
          blogCoverPhoto: "stock-1",
          blogDate: "May 1, 2021",
        },
        {
          blogTitle: "Blog Card #2",
          blogCoverPhoto: "stock-2",
          blogDate: "May 2, 2021",
        },
        {
          blogTitle: "Blog Card #3",
          blogCoverPhoto: "stock-3",
          blogDate: "May 3, 2021",
        },
        {
          blogTitle: "Blog Card #4",
          blogCoverPhoto: "stock-4",
          blogDate: "May 4, 2021",
        },
      ],
    };
  },
};
</script>
