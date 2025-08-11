export default function getApiUrl() {
  const url = {
    development: "https://lehna.vercel.app",
    production: "https://lehna.vercel.app",
  }

  const env = process.env.NODE_ENV || "development"
  console.log(env, ": ", url[env]);
  return url[env]
}
