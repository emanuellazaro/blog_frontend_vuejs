<template>
  <div class="container">
    <table class="table col-md-6 mx-auto">
      <tbody>
        <tr>
          <td>Wellcome</td>
          <td>{{name}}</td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-sm-10">
        <h1>Posts</h1>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-on:click="add_Post">Add Post</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Content:</th>
              <th scope="col">Published?:</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post) in posts" v-bind:key="post.post_ID" v-bind:post_title="post.post_title">
              <td>{{ post.post_title }}</td>
              <td>{{ post.post_content }}</td>
              <td>
                <span v-if="post.published">Yes</span>
                <span v-else>No</span></td>
              <td>
                <button type="button"
                        class="btn btn-warning btn-sm"
                        v-b-modal.post-update-modal
                        @click="editPost(post)">Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <h1>Drafts</h1>
        <hr><br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Content:</th>
              <th scope="col">Published?:</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(draft) in drafts"
                v-bind:key="draft.post_ID"
                v-bind:post_title="draft.post_title">
              <td>{{ draft.post_title }}</td>
              <td>{{ draft.post_content }}</td>
              <td>
                <span v-if="draft.published">Yes</span>
                <span v-else>No</span></td>
              <td>
                <button type="button"
                        class="btn btn-warning btn-sm"
                        v-b-modal.post-update-modal
                        @click="editPost(draft)">Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- edit post modal -->
    <b-modal ref="editPostModal"
         id="post-update-modal"
         title="Update"
         hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
        <b-form-group id="form-title-edit-group"
                    label="Title:"
                    label-for="form-title-edit-input">
            <b-form-input id="form-title-edit-input"
                          type="text"
                          v-model="editForm.post_title"
                          required
                          placeholder="Enter title">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-content-edit-group"
                      label="Content:"
                      label-for="form-content-edit-textarea">
            <b-form-textarea id="form-content-edit-textarea"
                          type="text"
                          v-model="editForm.post_content"
                          :rows="6"
                          required
                          placeholder="Enter Content">
            </b-form-textarea>
        </b-form-group>
        <b-form-group id="form-published-edit-group">
          <b-form-checkbox-group v-model="editForm.published" id="form-checks">
            <b-form-checkbox value="true">Published?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
        <b-button type="reset" variant="danger">Cancel</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Alert from './Alert.vue';
import router from '../router';


export default {
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      posts: [],
      drafts: [],
      name: decoded.identity.name,
      author_id: decoded.identity.author_id,
      email: decoded.identity.email,
      addPostForm: {
        post_title: '',
        post_content: '',
        published: [],
        author_id: 1, // change this soon
        post_picture: 'path_to_a_image', // change this soon
      },
      editForm: {
        post_title: '',
        post_slug: '',
        post_content: '',
        published: [],
        author_id: 1, // change this soon
        post_picture: 'path_to_a_image', // change this soon
      },
      options: {
        lineNumbers: true,
        styleActiveLine: true,
        styleSelectedText: true,
        lineWrapping: true,
        indentWithTabs: true,
        tabSize: 2,
        indentUnit: 2,
      },
      message: '',
      showMessage: false,
    };
  },
  components: {
    alert: Alert,
  },
  created() {
    this.getPosts();
    this.getDrafts();
  },
  methods: {
    add_Post() {
      router.push({ name: 'addpost' });
    },
    editPost(post) {
      this.editForm = post;
      router.push({ name: 'editpost', params: { slug: post.post_slug } });
    },
    getPosts() {
      const path = 'http://localhost:5000/posts/';
      axios.get(path).then(
        (response) => {
          // console.log(response.data);
          this.posts = response.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getDrafts() {
      const path = 'http://localhost:5000/drafts/';
      axios.get(path).then(
        (response) => {
          // console.log(response.data);
          this.drafts = response.data;
        }).catch((error) => {
        // eslint-disable-next-line
          console.error(error);
      });
    },
    addPost(payload) {
      const path = 'http://localhost:5000/posts/';
      axios.post(path, payload)
        .then(() => {
          this.getPosts();
          this.getDrafts();
          this.message = 'Post Added!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getPosts();
          this.getDrafts();
        });
    },
    initForm() {
      this.addPostForm.post_title = '';
      this.addPostForm.post_content = '';
      this.addPostForm.published = [];
      this.addPostForm.author_id = 1; // change this soon
      this.addPostForm.post_picture = 'path_to_a_image'; // change this soon
      this.editForm.post_title = '';
      this.editForm.post_content = '';
      this.editForm.post_slug = '';
      this.editForm.published = [];
      this.editForm.author_id = 1; // change this soon
      this.editForm.post_picture = 'path_to_a_image'; // change this soon
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addPostModal.hide();
      let published = false;
      if (this.addPostForm.published[0]) published = true;
      const payload = {
        post_title: this.addPostForm.post_title,
        post_content: this.addPostForm.post_content,
        published, // property shorthand
        author_id: this.addPostForm.author_id,
        post_picture: this.addPostForm.post_picture,
      };
      this.addPost(payload);
      this.initForm();
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editPostModal.hide();
      let published = false;
      if (this.editForm.published[0]) published = true;
      const payload = {
        post_title: this.editForm.post_title,
        post_content: this.editForm.post_content,
        published,
      };
      this.updatePost(payload, this.editForm.post_slug);
    },
    updatePost(payload, slug) {
      const path = `http://localhost:5000/posts/${slug}`;
      axios.put(path, payload)
        .then(() => {
          this.getPosts();
          this.getDrafts();
          this.message = 'Post updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getPosts();
          this.getDrafts();
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addPostModal.hide();
      this.initForm();
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editPostModal.hide();
      this.initForm();
      this.getPosts(); // why?
      this.getDrafts(); // why?
    },
    removePost(postslug) {
      const path = `http://localhost:5000/posts/${postslug}`;
      axios.delete(path)
        .then(() => {
          this.getPosts();
          this.getDrafts();
          this.message = 'Post removed!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getPosts();
          this.getDrafts();
        });
    },
    onDeletePost(post) {
      this.removePost(post.post_slug);
    },
  },
};
</script>
