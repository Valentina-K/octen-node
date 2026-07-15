import dotenv from "dotenv";

dotenv.config();

interface IConfig {
    PORT: string;
    MONGO_URI: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;
}

const config: IConfig = {
    // @ts-expect-error
    PORT: process.env.PORT,
    // @ts-expect-error
    MONGO_URI: process.env.MONGO_URI,
    // @ts-expect-error
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    // @ts-expect-error
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME,
};

export { config };
