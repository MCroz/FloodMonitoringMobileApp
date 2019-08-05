<template>
  <q-layout view="lHh LpR lFf">

    <q-header elevated class="text-grey-8" style="background-color: white;">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="left = !left" /> -->
          <q-avatar @click="left = !left">
            <img :src="userImage">
          </q-avatar>
        <q-toolbar-title>
          {{ currentPageName }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay behavior="mobile" bordered>

        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                My Profile
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple @click="onClickLogout">
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Logout
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="/statics/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img :src="userImage">
            </q-avatar>
            <div class="text-weight-bold">{{ currentUserFullName }}</div>
            <div>{{ currentUsername }}</div>
          </div>
        </q-img>


    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-grey-8 q-pa-md" style="background-color: white;">
        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          align="justify"
          class="text-purple"
          :breakpoint="0"
        >
          <q-tab :ripple="false" name="movies" icon="fas fa-cloud-sun-rain"/>
          <q-tab :ripple="false" name="mails" icon="fas fa-bullhorn" @click="onClickAnnouncement" />
          <q-tab :ripple="false" name="alarms" icon="fas fa-poll-h" @click="onClickFeeds"/>
        </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: true,
      userImage: '',
      tab: 'mails'
    }
  },
  methods: {
    onClickLogout() {
      this.$store.commit("setCurrentUser", null);
      this.$router.push('/');
    },
    onClickAnnouncement() {
      this.$router.push('/main');
    },
    onClickFeeds() {
      this.$router.push('/main/feeds');
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
    },
    currentPageName () {
      var curPath = this.$route.path;
      if (curPath == "/main" || curPath == "/main/") {
        return "Announcements";
      }
      if (curPath == "/main/feeds") {
        return "Feeds";
      }
      return curPath;
    }
  },
  beforeMount() {
    if (this.$store.getters.currentUser == null) {
        this.$router.push('/');
    }
    var image = this.$store.getters.currentUser.Image;
    var serverUrl = this.$store.getters.serverUrl;
    image = image == "" ? serverUrl + "images/profile.jpg" : serverUrl + "images/" + image;
    this.userImage = image;
  },
  mounted() {
    if (this.$store.getters.currentUser == null) {
      this.$router.push('/');
    }
    var image = this.$store.getters.currentUser.Image;
    var serverUrl = this.$store.getters.serverUrl;
    image = image == "" ? serverUrl + "images/profile.jpg" : serverUrl + "images/" + image;
    this.userImage = image;
  }
}
</script>