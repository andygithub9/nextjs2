/** @type {import('next').NextConfig} */
module.exports = {
  // https://stackoverflow.com/questions/67478532/module-not-found-cant-resolve-fs-nextjs/67478653#67478653
  // 要引入 nodejs 的模塊必須加入下列配置
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    }

    return config
  },
}
