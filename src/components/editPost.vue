<template>
  <div class="container">
        <form v-on:submit.prevent="onSubmitUpdate" @reset="onReset">
          <h1 class="h3 mb-3 font-weight-normal">Edit Post</h1>
          <div class="form-group">
            <label for="post_title">Post Title:</label>
            <input v-model="editPostForm.post_title"
              class="form-control" name="post_title" placeholder="Enter Title">
          </div>
          <div class="form-group">
            <input type="checkbox" name="published" value="true" v-model="editPostForm.published">
            <label for="published"> Published?</label>
          </div>
          <div class="form-group">
            <label for="post_picture">Post Picture</label>
            <input v-model="editPostForm.post_picture"
              class="form-control" name="post_picture" placeholder="Path to a picture">
          </div>
          <div class="form-group">
            <label for="post_content">Post Editor</label>
            <textarea v-model="editPostForm.post_content"
                      class="form-control"
                      rows="4"
                      name="post_content"
                      placeholder="Post Content...">
            </textarea>
          </div>
          <div class="form-group">
            <label for="form-content">Post final content:</label>
            <vue-simple-markdown id="form-content"
                                 required
                                 :source="editPostForm.post_content">
            </vue-simple-markdown>
          </div>
          <button type="submit" class="btn btn-primary">Edit Post</button>
          <button type="reset" class="btn btn-danger">Cancel</button>
        </form>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  data() {
    return {
      post: [],
      editPostForm: {
        post_slug: '',
        post_title: '',
        post_content: '',
        published: [],
        post_picture: '',
      },
    };
  },
  created() {
    // console.log(this.$route.params.slug);
    this.getPost(this.$route.params.slug);
  },
  methods: {
    getPost(postslugforsearch) {
      const path = `http://localhost:5000/posts/${postslugforsearch}/`;
      axios.get(path).then(
        (response) => {
          // console.log(response.data.post);
          this.post = response.data.post;
          this.post.forEach(element => {
            this.editPostForm.post_title = element.post_title;
            this.editPostForm.post_content = element.post_content;
            this.editPostForm.published = element.published;
            this.editPostForm.post_picture = element.post_picture;
            this.editPostForm.post_slug = element.post_slug;
          });
          console.log(this.post);
          console.log(this.editPostForm.published);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    initForm() {
      this.editPostForm.post_title = '';
      this.editPostForm.post_content = '';
      this.editPostForm.published = [];
      this.editPostForm.post_picture = 'path_to_a_image'; // change this soon
    },
    onReset(evt) {
      evt.preventDefault();
      this.initForm();
      router.push({ name: 'dashboard' });
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      let published = false;
      if (this.editPostForm.published[0]) published = true;
      const payload = {
        post_title: this.editPostForm.post_title,
        post_content: this.editPostForm.post_content,
        post_picture: this.editPostForm.post_picture,
        published,
      };
      this.updatePost(payload, this.editPostForm.post_slug);
      router.push({ name: 'dashboard' });
    },
    updatePost(payload, slug) {
      const path = `http://localhost:5000/posts/${slug}`;
      axios.put(path, payload)
        .then(() => {
          this.message = 'Post updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
};
</script>
