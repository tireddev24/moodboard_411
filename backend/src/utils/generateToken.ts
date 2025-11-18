import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_EXPIRY = "15m"; // Access token lasts 15 minutes
const REFRESH_EXPIRY_DAYS = 7; // Refresh token lasts 7 days

export type TokenPayload = {userId: string; iat?: number; exp?: number};

export async function generateTokens(userId: string) {
	const accessToken = jwt.sign({userId}, JWT_SECRET, {
		expiresIn: ACCESS_EXPIRY,
	});

	const refreshToken = jwt.sign({userId}, JWT_SECRET, {
		expiresIn: `${REFRESH_EXPIRY_DAYS}d`,
	});

	// Store refresh token in DB
	const expiresAt = new Date(
		Date.now() + REFRESH_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
	);
	await prisma.refreshToken.create({
		data: {userId, token: refreshToken, expiresAt},
	});

	return {accessToken, refreshToken};
}

export async function generateNew(userId: string) {
	const newAccess = jwt.sign({userId}, JWT_SECRET, {
		expiresIn: ACCESS_EXPIRY,
	});

	return newAccess;
}

export function verifyToken(token: string): TokenPayload {
	return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
