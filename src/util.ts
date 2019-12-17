import path from "path";

export function patchConfigurationDirectoryVariable() {
  if (!process.env.NODE_CONFIG_DIR) {
    process.env.NODE_CONFIG_DIR = path.join(__dirname, "..", "config");
  }
}
