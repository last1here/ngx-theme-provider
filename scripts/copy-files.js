const fs = require("fs");

fs.copyFile("README.md", "dist/ngx-theme-provider/README.md", (err) => {
  if (err) throw err;
  console.log("README.md was copied to dist/ngx-theme-provider/README.md");
});
