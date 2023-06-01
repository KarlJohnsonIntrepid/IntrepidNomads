// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//   output: "export",
//   // Optional: Add a trailing slash to all paths `/about` -> `/about/`
//   // trailingSlash: true,
//   // Optional: Change the output directory `out` -> `dist`
//   // distDir: 'dist',
//   typescript: {
//     // !! WARN !!
//     // Dangerously allow production builds to successfully complete even if
//     // your project has type errors.
//     // !! WARN !!
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig;

const withExportImages = require("next-export-optimize-images");

module.exports = withExportImages(
  // write your next.js configuration values.
  {
    output: "export",
    // Optional: Add a trailing slash to all paths `/about` -> `/about/`
    // trailingSlash: true,
    // Optional: Change the output directory `out` -> `dist`
    // distDir: 'dist',
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    // images: {
    //   unoptimized: true,
    // },
  }
);
