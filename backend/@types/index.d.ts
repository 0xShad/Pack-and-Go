declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            JWT_SECRET: string
            JWT_ExpiresIn: string
            DB_URI: string
        }
    }
}

export {}