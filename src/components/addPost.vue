<template>
  <div class="container">
        <form v-on:submit.prevent="onSubmit" @reset="onReset">
          <h1 class="h3 mb-3 font-weight-normal">Create New Post</h1>
          <div class="form-group">
            <label for="post_title">Post Title:</label>
            <input v-model="addPostForm.post_title"
              class="form-control" name="post_title" placeholder="Enter Title">
          </div>
          <div class="form-group">
            <input type="checkbox" id="form-checks" value="true" v-model="addPostForm.published">
            <label for="published"> Published?</label>
          </div>
          <div class="form-group">
            <label for="post_picture">Post Picture</label>
            <input v-model="addPostForm.post_picture"
              class="form-control" name="post_picture" placeholder="Path to a picture">
          </div>
          <div class="form-group">
            <label for="post_content">Post Editor</label>
            <textarea v-model="addPostForm.post_content"
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
                                 :source="addPostForm.post_content">
            </vue-simple-markdown>
          </div>
          <button type="submit" class="btn btn-primary">Create Post</button>
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
      addPostForm: {
        post_title: '',
        post_content: '',
        published: [],
        post_picture: '',
        author_id: 1,
      },
    };
  },
  methods: {
    initForm() {
      this.addPostForm.post_title = '';
      this.addPostForm.post_content = '';
      this.addPostForm.published = [];
      this.addPostForm.author_id = 1; // change this soon
      this.addPostForm.post_picture = 'path_to_a_image'; // change this soon
    },
    onReset(evt) {
      evt.preventDefault();
      this.initForm();
      router.push({ name: 'dashboard' });
    },
    addPost(payload) {
      const path = 'http://localhost:5000/posts/';
      axios.post(path, payload)
        .then(() => {
          this.message = 'Post Added!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      let published = false;
      if (this.addPostForm.published[0]) published = true;
      const payload = {
        post_title: this.addPostForm.post_title,
        post_content: this.addPostForm.post_content,
        published, // property shorthand
        author_id: this.addPostForm.author_id,
        post_picture: this.addPostForm.post_picture,
      };
      this.initForm();
      this.addPost(payload);
      router.push({ name: 'dashboard' });
    },
  },
};
</script>
