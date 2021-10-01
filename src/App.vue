<template>
  <div id="app">
    <div id="nav">
      <el-menu 
        default-active="1"
        mode="horizontal"
        background-color="#001529"
        text-color="rgba(255, 255, 255, 0.65)"
        active-text-color="#fff">
        <el-menu-item index="1">
          <router-link to="/calculator">Cost Calculator</router-link>
        </el-menu-item>
        <el-menu-item 
          @click="openSettingsDialog"
          class="setting-button">
          <i class="el-icon-setting setting-icon"></i>
        </el-menu-item>
      </el-menu>
    </div>
    <el-card>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-card>
    <rate-options-modal
     :isVisible="settingDialogIsVisible"
     @closeDialog="settingDialogIsVisible = false"></rate-options-modal>
  </div>
</template>

<script>
import RateOptionsModal from './components/RateOptionsModal.vue'

export default {
  name: 'App',
  components: {
    RateOptionsModal
  },

  data: function() {
    return {
      settingDialogIsVisible: false
    }
  },

  methods: {
    openSettingsDialog() {
      this.settingDialogIsVisible = true;
    }
  }
}
</script>

<style>
.setting-icon {
  color: #fff !important;
}

body {
  margin: 0;
  font-family: sans-serif;
}

#nav ul{
  float: left;
  display: flex;
  justify-content: space-between;
  width: 100%
}

#nav a {
  text-decoration: none;
}
</style>
