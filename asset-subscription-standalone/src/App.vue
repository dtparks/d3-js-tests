<template>
  <div id="app">
    <ul class="nav-bar">
      <a><li class="nav-item" v-on:click="getAssetList">All Assets</li></a>
      <a><li class="nav-item" v-on:click="selectSubscribedAssetList">Subscribed Assets</li></a>
    </ul>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <h1 class="header-text">{{assetSearchName}}</h1>
    <h1 v-if="assets === undefined">No assets found!</h1>
    <ul class="asset-list" v-if="!subscribeSelected">
      <li class="asset-item" v-for="asset in assets" v-bind:key="asset.id">
        <h4 class="asset-title">{{ asset.assetTitle }}</h4>
        <p>Asset Id: {{ asset.id }}</p>
        <h4>File Type: .{{asset.suffix}}</h4>
        <h5>Dimensions: {{asset.width}} x {{asset.height}}</h5>
        <h5>Upload Date: {{ asset.uploadDate}} </h5>
        <h5>Last Updated: {{ asset.lastUpdatedTimeStr}} </h5>
        <button class="unsub-button" v-if="subscribedAssets.includes(asset.id)" @click="unsubscribeFromAsset(asset.id)">Unsubscribe</button>
        <button class="sub-button" v-else @click="subscribeToAsset(asset.id)">Subscribe</button>
      </li>
    </ul>
    <ul class="asset-list" v-if="subscribeSelected">
      <li class="asset-item" v-for="(subscribed, index) in subscribedAssets" v-bind:key="subscribed">
        <h4>{{ subscribed }}</h4>
        <button class="unsub-button" @click="unsubscribeFromAsset(subscribed, index)">Unsubscribe</button>
      </li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data: function() {
    return {
      message: "Test",
      assetSearchName: "List of Assets!",
      assets: [],
      subscribeSelected: false,
      username: 'gateb.admin',
      password: 'uobqqyYgJ9xn',
      subscribedAssets: [],
      testAssetEndpoint: "https://qaqualcomm.brandmakerinc.com/rest/mp/search?query=test",
      subscribedAssetEndpoint: "https://qaqualcomm.brandmakerinc.com/rest/mp/subscribers/assets", 
    }
  },
  mounted() {
    this.getInitialSusbcribedList();
    this.getAssetList();
  },
  methods: {
    getAssetList: function() {
      var self = this;
      this.subscribeSelected = false;
      this.assetSearchName = "List of BrandMaker Assets"
      axios.get(this.testAssetEndpoint, {
        auth: {
          username: this.username,
          password: this.password
        }
      }).then(function(response) {
        console.log(response.data.assets);
        self.assets = response.data.assets;
      }).catch(function(error) {
        console.log("Error on authentication");
      })
    },
    getInitialSusbcribedList: function() {
      var self = this;
      axios.get(this.subscribedAssetEndpoint, {
        auth: {
          username: this.username,
          password: this.password
        }
      }).then(function(response) {
        self.subscribedAssets = response.data;
      }).catch(function(error) {
        console.log("Error on authentication");
      })
    },
    selectSubscribedAssetList: function() {
      var self = this;
      this.subscribeSelected = true;
      this.assetSearchName = "List of Subscribed Assets!"
      axios.get(this.subscribedAssetEndpoint, {
        auth: {
          username: this.username,
          password: this.password
        }
      }).then(function(response) {
        console.log(response.data);
        self.subscribedAssets = response.data;
      }).catch(function(error) {
        console.log("Error on authentication");
      })
    },
    subscribeToAsset: function(id) {
      var self = this;
      let data = [id];
      console.log(id)
      axios.post(this.subscribedAssetEndpoint, data, {
        auth: {
          username: this.username,
          password: this.password
        }
      }).then(function(response) {
        console.log("Subscribed to asset");
        self.getAssetList();
        self.getInitialSusbcribedList();
      }).catch(function(error) {
        console.log("Error on authentication");
      })
    },
    unsubscribeFromAsset: function(id, index) {
      var self = this;
      let data = [id];
      axios.delete(this.subscribedAssetEndpoint, { data: data }, {
        auth: {
          username: this.username,
          password: this.password
        }
      }).then(function(response) {
        console.log("Unsubscribed to asset");
        self.getInitialSusbcribedList();
      }).catch(function(error) {
        console.log("Error on authentication");
      })
    }
  }
}
</script>

<style>

body {
  margin-top: 0;
  margin-right: 0;
  margin-left: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-bar {
  width: 100%;
  margin-top: 0;
  padding-top: 0;
  background: #fcfcfc;
  box-shadow: rgb(229, 229, 229) 0px -1px 0px 0px inset;
  padding-left: 0;
  display: flex;
  justify-content: center;
  list-style: none;
}

.nav-item {
  font-weight: 700;
  margin: 10px;
  cursor: pointer;
  font-size: 18px;
}

.nav-item .right {
  margin-right: auto;
}

.nav-item:hover {
  color: #42b983;
}

.header-text {
  color: #42b983;
  margin-top: 30px;
  margin-bottom: 15px;
}

.asset-list {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
}

.asset-item {
  padding: 20px;
  text-align: left;
  margin: 15px;
  height: 100%;
  width: 300px;
  background: #f9f9f9;
  box-shadow: rgb(229, 229, 229) 0px -1px 0px 0px inset;
  border: 1px solid #e0e0e0;
}

.asset-item:hover {
  background: #f4f4f4;
}

.asset-title {
  
}

.sub-button {
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  font-weight: bold;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
  cursor: pointer;
  margin: 1em 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-align: center;
}

.unsub-button {
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  font-weight: bold;
  color: #4fc08d;
  background-color: #fff;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
  cursor: pointer;
  margin: 1em 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-align: center;
}

.sub-button:hover {
  background-color: #5fce9c;
}

.unsub-button:hover {
  background-color: #f9f9f9;
}
</style>
