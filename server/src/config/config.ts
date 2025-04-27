import dotenv from "dotenv"

dotenv.config()

const getEnv = (key: string, fallback?: string) => {
    const value = process.env[key]
    if(value === undefined || value === ""){
        if(fallback !== undefined){
            return fallback
        }
        throw new Error(`Environment variable ${key} is not set`)
    }
    return value
}

export const config = {
    port: parseInt(getEnv("PORT", "5000")),
    jwtSecret: getEnv("JWT_SECRET", "supersecretjwtkey"),
    db: {
        host: getEnv("DB_HOST", "localhost"),
        port: parseInt(getEnv("DB_PORT", "27017")),
        user: getEnv("DB_USER", "root"),
        password: getEnv("DB_PASSWORD", "root"),
        name: getEnv("DB_NAME", "taskmaster"),
        database: getEnv("DB_DATABASE", "taskmaster")
    },
    mongodb: {
        uri: getEnv("MONGODB_URI", "mongodb://localhost:27017/taskmaster")
    }
}