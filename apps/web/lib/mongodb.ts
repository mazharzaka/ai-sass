import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// Guarantee to typescript that cached is not undefined
const nonNullCached = cached!

export async function dbConnect() {
  if (nonNullCached.conn) {
    return nonNullCached.conn
  }

  if (!nonNullCached.promise) {
    const opts = {
      bufferCommands: false,
    }

    nonNullCached.promise = mongoose.connect(MONGODB_URI!, opts).then((m) => {
      return m
    })
  }

  try {
    nonNullCached.conn = await nonNullCached.promise
  } catch (e) {
    nonNullCached.promise = null
    throw e
  }

  return nonNullCached.conn
}
