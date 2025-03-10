/**
 * 首页-广告区域-小程序
 */
export type BannerItem = {
  id: string
  imgUrl: string
  /** 图片跳转URL */
  hrefUrl: string
  /** 跳转类型 */
  type: number
}

/**
 * 首页-前台分类-小程序
 */
export type CategoryItem = {
  id: 'string'
  name: 'string'
  icon: 'string'
}

/**
 * 首页-热门推荐-小程序
 */
export type HotItem = {
  id: string
  alt: string
  pictures: string[]
  target: string
  title: string
  type: string
}
