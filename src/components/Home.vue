<template>
  <div class="container">
      <div class="col-sm-10 main">
        <div v-for="(post) in posts" v-bind:key="post.post_ID" v-bind:post_title="post.post_title">
          <ul class="lu">
            <li @click="goToPost(post.post_slug)">
              <h5 class="h5">{{ post.post_title }}</h5><h6 class="text-muted">{{ post.post_created_at | formatDate }}</h6>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      const path = 'https://f4jtl1myz7.execute-api.us-east-1.amazonaws.com/dev/posts/';
      // const path = 'http://localhost:5000/posts/';
      axios.get(path).then(
        (response) => {
          // console.log(response.data);
          this.posts = response.data.reverse(); // Sort posts by date
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    goToPost(postslug) {
      // console.log(postslug);
      this.$router.push({ name: 'post', params: { slug: postslug } });
    },
  },
};
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .lu li {
      position: relative;
      padding: 20px 0 20px;
      border-bottom: 1px solid #e6e6e6;
  }
  h5:hover {
    color: #f33;
    margin-right: 0px;
  }
  h6 {
    font-size: 13px;
  }
</style>
