<template>
  <!-- <div class="q-pa-md row q-gutter-md justify-center"> -->


<q-page>
  <q-pull-to-refresh @refresh="refresh" class="q-pa-md row q-gutter-md justify-center">
    <q-card :key="item.ID"       
        v-for="item in Announcements"
        dark bordered class="bg-grey-9 col-12 my-card">
      <q-card-section>
        <div class="text-h6">{{ item.Subject }}</div>
        <div class="text-subtitle2">{{ item.DateAdded | formatDate }}</div>
      </q-card-section>
      <q-separator dark inset />
      <q-card-section>
        {{ item.Announcement }}
      </q-card-section>
    </q-card>

    <q-btn class="full-width q-mt-md" outline rounded color="primary" v-if="ShowLoadMore" label="Load More" @click="onClickLoadMore" />
  </q-pull-to-refresh>
</q-page>
  <!-- </div> -->
</template>

<script>
import ErrorDialog from '../components/ErrorDialog'


export default {
  data () {
    return {
      Announcements: [],
      LastID: 0,
      LatestID: 0,
      ShowLoadMore: true
    }
  },
  methods: {
    refresh (done) {
      this.$Loading.show("Processing.....");
      var _this = this;
      var postData = {
        LatestID: _this.LatestID
      };
      _this.Endpoints.GetLatestAnnouncements({
        data: postData,
        success: (response) => {
          if (response.data.Status === "Success") {
            response.data.Data.forEach(element => {
              _this.Announcements.unshift(element);
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
          done();
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
      _this.Endpoints.GetOlderAnnouncements({
        data: postData,
        success: (response) => {
          if (response.data.Status === "Success") {
            response.data.Data.forEach(element => {
              _this.Announcements.push(element);
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
    this.$Loading.show("Processing.....");
    var _this = this;
    var postData = {
      
    };
    _this.Endpoints.GetAnnouncements({
      data: postData,
      success: (response) => {
        if (response.data.Status === "Success") {
          _this.Announcements = response.data.Data;
          
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

<style lang="stylus" scoped>
.my-card
  margin-bottom 20px

</style>