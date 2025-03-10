<script setup lang="ts">
import CustomNavBar from './components/CustomNavBar.vue'
import { getHomeBannerAPI } from '@/services/home'
import type { BannerItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <CustomNavBar />
  <XtxSwiper :list="bannerList" />
</template>

<style lang="scss">
//
</style>
