// Ambient declarations for side-effect asset imports (e.g. `import "./globals.css"`).
// Next handles these at bundle time; this silences the TS(2882) editor error.
declare module "*.css";
declare module "*.scss";
