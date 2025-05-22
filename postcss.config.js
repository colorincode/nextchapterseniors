
import autoprefixer from "npm:autoprefixer";
import postcssUtilities from "npm:postcss-utilities";

export default {
  plugins: [
    postcssUtilities({

      clearfix: true,
      center: true,
    }),
    autoprefixer({
      // Optional: override browserslist if needed
      overrideBrowserslist: ["last 2 versions", "> 1%"],
    }),
  ],
};