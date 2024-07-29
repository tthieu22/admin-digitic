module.exports = {
  // ... other configurations
  module: {
    rules: [
      // ... other rules
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          // Paths to modules to ignore source map warnings
          /node_modules\/react-widgets\//,
        ],
      },
    ],
  },
  // This suppresses all source map warnings
  ignoreWarnings: [/Failed to parse source map/],
};
