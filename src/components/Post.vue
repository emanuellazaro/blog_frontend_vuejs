<template>
  <div class="container">
    <div class="main" v-for="(content) in post"
      v-bind:key="content.post_ID"
      v-bind:post_title="content.post_title">
      <br>
      <div>
        <h2>{{ content.post_title }}</h2>
      </div>
      <div>
        <h6 class="text-muted">Published at {{ content.post_created_at | formatDate }}</h6>
      </div>
      <br>
      <div>
        {{ content.post_picture }}
      </div>
      <div>
        <vue-markdown>{{ content.post_content }}</vue-markdown>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueMarkdown from 'vue-markdown';

export default {
  data() {
    return {
      post: [],
    };
  },
  components: {
    VueMarkdown,
  },
  created() {
    // console.log(this.$route.params.slug);
    this.getPost(this.$route.params.slug);
  },
  methods: {
    getPost(postslugforsearch) {
      const path = `https://f4jtl1myz7.execute-api.us-east-1.amazonaws.com/dev/posts/${postslugforsearch}/`;
      axios.get(path).then(
        (response) => {
          // console.log(response.data.post);
          this.post = response.data.post;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
  h6 {
    font-size: 13px;
  }
</style>
