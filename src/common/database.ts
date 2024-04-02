import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'

export const generateRandomId = (length: number = 15): string => {
	return generateId(length)
}

export const generateHashedPassword = async (password: string): Promise<string> => {
	return await new Argon2id().hash(password)
}
