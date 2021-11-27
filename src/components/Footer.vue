<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'Home' }">
            Salem-Blog
          </router-link>

          <ul>
            <li>
              <a :href="profiles.guthub" target="_blank">
                <Github class="svg-icon" />
              </a>
            </li>
            <li>
              <a :href="profiles.linkedin" target="_blank">
                <Linkedin class="svg-icon" />
              </a>
            </li>
            <li>
              <a :href="profiles.twitter" target="_blank">
                <Twitter class="svg-icon" />
              </a>
            </li>
            <li>
              <a :href="profiles.instegram" target="_blank">
                <Instegram class="svg-icon" />
              </a>
            </li>
          </ul>
        </div>

        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'Home' }">
              Home
            </router-link>

            <router-link class="link" :to="{ name: 'Blogs' }">
              Blogs
            </router-link>

            <router-link class="link" :to="{ name: 'CreatePost' }">
              Create Post
            </router-link>

            <router-link v-if="!user" class="link" :to="{ name: 'Login' }">
              Login In / Register
            </router-link>
          </ul>
        </div>
      </div>

      <div class="right">
        <p>Copyright {{ new Date().getFullYear() }} All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
// @ is an alias to /src
import Github from "@/assets/icons/github-brand.svg";
import Linkedin from "@/assets/icons/linkedin-brand.svg";
import Twitter from "@/assets/icons/twitter-brand.svg";
import Instegram from "@/assets/icons/instagram-brand.svg";

export default {
  name: "footer",

  components: {
    Github,
    Linkedin,
    Twitter,
    Instegram,
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  data() {
    return {
      profiles: {
        linkedin: "https://www.linkedin.com/in/isalem-nabeel",
        twitter: "https://twitter.com/isalem_nabeel",
        instegram: "https://www.instagram.com/isalem_nabeel",
        guthub: "https://github.com/SalemNabeelSalem",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;

  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        text-align: center;
        font-size: 24px;
        color: #fff;
        margin-bottom: 16px;
        text-decoration: none;
        font-weight: 600;

        @media (min-width: 800px) {
          text-align: initial;
        }
      }

      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }

      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;

        @media (min-width: 800px) {
          gap: 0;
        }
      }

      .col-1 {
        flex-direction: column;

        h2 {
          text-align: center;

          @media (min-width: 800px) {
            text-align: initial;
          }
        }

        ul {
          margin-top: auto;

          li {
            display: flex;
            align-items: center;

            .svg-icon {
              width: 24px;
              height: auto;
              color: #fff;
            }
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;

          @media (min-width: 800px) {
            flex-direction: column;
          }

          .link {
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }

    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;

      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
