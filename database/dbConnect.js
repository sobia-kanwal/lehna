import mongoose from "mongoose"

// Reuse a cached connection across serverless re-invocations
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI environment variable")
}

let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async () => {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    const connectOptions = {
      bufferCommands: false,
      // Fail fast if DB is unreachable to avoid serverless timeouts
      serverSelectionTimeoutMS: 10000, // 10s
      socketTimeoutMS: 20000,          // 20s
      maxPoolSize: 5,                  // small pool for serverless
    }
    cached.promise = mongoose.connect(MONGO_URI, connectOptions).then((m) => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
