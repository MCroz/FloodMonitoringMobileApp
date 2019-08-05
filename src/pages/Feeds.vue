<template>
<q-page>
  <q-pull-to-refresh @refresh="refresh" class="q-pa-md row q-gutter-md justify-center">

    <q-card :key="item.ID" v-for="item in Feeds" class="my-card" style="margin-bottom: 20px;">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="item.Image == '' ? $store.getters.serverUrl + 'images/profile.jpg' : item.Image == null ? $store.getters.serverUrl + 'images/profile.jpg' : $store.getters.serverUrl + 'images/' + image">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.FirstName + ' ' + item.MiddleName + ' ' + item.LastName}}</q-item-label>
          <q-item-label caption>{{item.DateTime | formatDate}}</q-item-label>
        </q-item-section>

        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Remove Card</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Send Feedback</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Share</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-item>

      <q-separator dark inset />

      <q-img v-if="item.PostImage == null ? false : true" :src="$store.getters.serverUrl + 'images/' + item.PostImage" ratio="1"></q-img>
      <q-card-section>
        {{ item.Message }}
      </q-card-section>

      <q-card-actions>
        <q-btn @click="onClickShowComments(item.ID)" icon="far fa-comments" flat class="full-width q-mt-md" :label="'Comments' + (item.CommentCount > 0 ? ' (' + item.CommentCount + ')' : '')">
        </q-btn>
      </q-card-actions>
    </q-card>


    <q-btn class="full-width q-mt-md" outline rounded color="primary" v-if="ShowLoadMore" label="Load More" @click="onClickLoadMore" />
  </q-pull-to-refresh>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="accent" @click="addPostDialog = true" />
  </q-page-sticky>

  <q-dialog
    v-model="addPostDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="background-color: white;" class="text-grey-8">
      <q-bar style="height: 50px;" class="bg-primary text-white">
        <q-btn dense flat icon="fas fa-arrow-left" v-close-popup>
          <q-tooltip content-class="text-primary">Close</q-tooltip>
        </q-btn>
        <q-space></q-space>
        <q-btn @click="onClickPost" style="color: white;" icon-right="send" label="POST" :disable="PostMessage == ''" />
      </q-bar>

      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="userImage">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ currentUserFullName }}</q-item-label>
          <q-item-label caption>{{currentUsername}}</q-item-label>
        </q-item-section>

      </q-item>

      <q-card-section>
        <q-input
          v-model="PostMessage"
          borderless
          autogrow
          hint="Message"
        />
      </q-card-section>
      <q-card-section>
        <FloodUploader 
            
            v-on:onFinishUpload="onUpload"
            @onFileRemoved="onFileRemoved"
            @isUploading="isUploading"
        >
            
        </FloodUploader>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="viewPostCommentsDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >

  <q-layout view="Lhh lpR fff" container class="bg-white">


    <q-card style="background-color: white;" class="text-grey-8">
      <q-bar style="height: 50px;" class="bg-primary text-white">
        <q-btn dense flat icon="fas fa-arrow-left" v-close-popup>
          <q-tooltip content-class="text-primary">Close</q-tooltip>
        </q-btn>
        <q-space></q-space>
      </q-bar>


      <q-card-section>
        <q-card :key="item.ID" v-for="item in Comments" class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="item.Image == '' ? $store.getters.serverUrl + 'images/profile.jpg' : item.Image == null ? $store.getters.serverUrl + 'images/profile.jpg' : $store.getters.serverUrl + 'images/' + image">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.FirstName + ' ' + item.MiddleName + ' ' + item.LastName}}</q-item-label>
              <q-item-label caption>{{item.DateTime | formatDate}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator dark inset />

          <q-card-section>
            {{ item.Message }}
          </q-card-section>

        </q-card>
      </q-card-section>

    </q-card>


    <q-footer>
      <q-toolbar class="bg-grey-3 text-black row">
        <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
        <q-input autogrow rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="CommentMessage" placeholder="Type a message" />
        <q-btn round flat icon="send" />
      </q-toolbar>
    </q-footer>
  </q-layout>



  </q-dialog>

</q-page>
</template>


<script>
import ErrorDialog from '../components/ErrorDialog'
import FloodUploader from '../components/FloodUploader'

export default {
  components: {
    FloodUploader
  },
  data () {
    return {
      Feeds: [],
      LastID: 0,
      LatestID: 0,
      ShowLoadMore: true,
      addPostDialog: false,
      PostMessage: '',
      userImage: '',
      stillUploading: false,
      PostImage: '',
      viewPostCommentsDialog: false,
      Comments: [],
      CommentMessage: ''
    }
  },
  computed: {
    currentUserFullName () {
      let curUser = this.$store.getters.currentUser;
      if (curUser === null) {
        return "";
      }
      return curUser.FirstName + " " + curUser.MiddleName + " " + curUser.LastName;
    },
    currentUsername () {
      let curUser = this.$store.getters.currentUser;
      if (curUser === null) {
        return "";
      }
      return curUser.Username;
    }
  },
  methods: {
    onClickShowComments(id) {
      this.$Loading.show();
      var _this = this;
      var postData = {
        FeedID: id
      };
      _this.Endpoints.GetComments({
        data: postData,
        success: (response) => {
          if (response.data.Status === "Success") {
            _this.Comments = response.data.Data;
            this.viewPostCommentsDialog = true;
          } else {
            _this.$q.dialog({
              component: ErrorDialog,
              root: _this.$root,
              message: response.data.Message,
              title: "Error"
            })
          }
          _this.$Loading.hide();
        },
        error: () => {
          _this.$q.dialog({
            component: ErrorDialog,
            root: _this.$root,
            message: "An Error Occurred Please Try Again.",
            title: "Error"
          })
          _this.$Loading.hide();
        }
      });
      
    },
    onClickPost () {
      var _this = this;
      this.$Loading.show();
      var postData = {
        Image: _this.PostImage,
        Message: _this.PostMessage,
        UserID: _this.$store.getters.currentUser.ID
      }
      _this.Endpoints.AddPost({
        data: postData,
        success: (response) => {
          if (response.data.Status === "Success") {
            //Show Message
            this.$q.notify({
              color: 'purple',
              textColor : 'white',
              message : 'Your Post is Subject for Approval',
              position : 'top',
              actions: [{ 
                label: 'Dismiss', 
                color: 'yellow', 
                handler: () => {

                } 
              }],
              timeout: 3000
            });
            _this.onFileRemoved();
            _this.PostMessage = '';

          } else {
            _this.$q.dialog({
              component: ErrorDialog,
              root: _this.$root,
              message: response.data.Message,
              title: "Error"
            })
          }
          _this.$Loading.hide();
        },
        error: () => {
          _this.$q.dialog({
            component: ErrorDialog,
            root: _this.$root,
            message: "An Error Occurred Please Try Again.",
            title: "Error"
          })
          _this.$Loading.hide();
        }
      });
    },
    isUploading(val) {
        this.stillUploading = val
    },
    onUpload(imgLink) {
        this.PostImage = imgLink
    },
    onFileRemoved () {
        this.PostImage = ""
    },
    refresh (done) {
      this.$Loading.show("Processing.....");
      var _this = this;
      var postData = {
        LatestID: _this.LatestID
      };
      _this.Endpoints.GetLatestFeeds({
        data: postData,
        success: (response) => {
          if (response.data.Status === "Success") {
            response.data.Data.forEach(element => {
              _this.Feeds.unshift(element);
            });
            if (response.data.Data.length > 0) {
              _this.LatestID = response.data.Data[response.data.Data.length - 1].ID;
              // _this.LastID = response.data.Data[response.data.Data.length - 1].ID;
            }
            done();
          } else {
            _this.$q.dialog({
              component: ErrorDialog,
              root: _this.$root,
              message: response.data.Message,
              title: "Error"
            })
          }
          _this.$Loading.hide();
        },
        error: () => {
          _this.$q.dialog({
            component: ErrorDialog,
            root: _this.$root,
            message: "An Error Occurred Please Try Again.",
            title: "Error"
          })
          _this.$Loading.hide();
        }
      });
    },
    onClickLoadMore () {
      this.$Loading.show("Processing.....");
      var _this = this;
      var postData = {
        LastID: _this.LastID
      };
      _this.Endpoints.GetOlderFeeds({
        data: postData,
        success: (response) => {
          if (response.data.Status === "Success") {
            response.data.Data.forEach(element => {
              _this.Feeds.push(element);
            });
            if (response.data.Data.length > 0) {
              _this.LastID = response.data.Data[response.data.Data.length - 1].ID;
            } else {
              _this.ShowLoadMore = false;
            }
          } else {
            _this.$q.dialog({
              component: ErrorDialog,
              root: _this.$root,
              message: response.data.Message,
              title: "Error"
            })
          }
          _this.$Loading.hide();
        },
        error: () => {
          _this.$q.dialog({
            component: ErrorDialog,
            root: _this.$root,
            message: "An Error Occurred Please Try Again.",
            title: "Error"
          })
          _this.$Loading.hide();
        }
      });
    }
  },
  mounted() {
    var image = this.$store.getters.currentUser.Image;
    var serverUrl = this.$store.getters.serverUrl;
    image = image == "" ? serverUrl + "images/profile.jpg" : serverUrl + "images/" + image;
    this.userImage = image;

    this.$Loading.show("Processing.....");
    var _this = this;
    var postData = {
      
    };
    _this.Endpoints.GetFeeds({
      data: postData,
      success: (response) => {
        if (response.data.Status === "Success") {
          _this.Feeds = response.data.Data;
          
          if (response.data.Data.length > 0) {
            _this.LatestID = response.data.Data[0].ID;
            _this.LastID = response.data.Data[response.data.Data.length - 1].ID;
          } else {
            //Hide button
            _this.ShowLoadMore = false;
          }
        } else {
          _this.$q.dialog({
            component: ErrorDialog,
            root: _this.$root,
            message: response.data.Message,
            title: "Error"
          })
        }
        _this.$Loading.hide();
      },
      error: () => {
        _this.$q.dialog({
          component: ErrorDialog,
          root: _this.$root,
          message: "An Error Occurred Please Try Again.",
          title: "Error"
        })
        _this.$Loading.hide();
      }
    });
  }
}
</script>


<style lang="stylus">
.WAL
  width 100%
  height 100%
  padding-top 20px
  padding-bottom 20px
  &:before
    content ''
    height 127px
    position fixed
    top 0
    width 100%
    background-color #009688
  &__layout
    margin 0 auto
    z-index 4000
    height 100%
    width 90%
    max-width 950px
    border-radius 5px
  &__field.q-field--outlined .q-field__control:before
    border none
  .q-drawer--standard
    .WAL__drawer-close
      display none

.my-card
  min-width calc(100vw - 50px)  
</style>