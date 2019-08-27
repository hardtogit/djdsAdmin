
// ref: https://umijs.org/config/
export default {
  publicPath: '/dist/',
  treeShaking: true,
  define: {
    "process.env.UMI_ENV": process.env.UMI_ENV
  },
  history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'autumn',
      dll: true,
      locale: {
        enable: true,
        default: 'zh-CN',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
          /fields\.(t|j)sx?$/,
          /server\.(t|j)sx?$/
        ],
      },
    }],
  ],
}
