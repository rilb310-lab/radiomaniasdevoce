import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '../../db/index.js'
import { giveawaySignups } from '../../db/schema.js'

const SignupSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
})

export const joinGiveawayList = createServerFn({ method: 'POST' })
  .inputValidator(SignupSchema)
  .handler(async ({ data }) => {
    try {
      await db
        .insert(giveawaySignups)
        .values({ name: data.name, email: data.email })
        .onConflictDoNothing({ target: giveawaySignups.email })
      return { success: true as const }
    } catch (error) {
      console.error('Failed to save giveaway signup:', error)
      return { success: false as const, message: 'Não foi possível registrar seu cadastro. Tente novamente.' }
    }
  })
