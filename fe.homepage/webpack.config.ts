import { Configuration } from 'webpack';
import * as webpack from 'webpack';
import path from 'path-browserify';  // Import trực tiếp các module
import buffer from 'buffer/';
import * as os from "os-browserify";
import * as crypto from "crypto-browserify";
import * as util from 'util';
import * as stream from "stream-browserify";

const config: Configuration = {
  resolve: {
    fallback: {
      "path": path as any,
      "os": os,
      "crypto": crypto,
      "util": util,
      "stream": stream,
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',  // Nếu cần dùng các API của Node.js khác
    }),
  ],
};

export default config;
