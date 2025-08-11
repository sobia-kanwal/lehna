export default function getApiUrl() {
  const url = {
    development: "http://localhost:3000",
    production: "https://lehna.vercel.app",
  }

  const env = process.env.NODE_ENV || "development"
  console.log(env, ": ", url[env]);
  return url[env]
}
