import { z } from 'zod'
 
export const SigninFormSchema = z.object({
  email: z.string().nonempty({message: 'E-mail é obrigatório.'}).email({ message: 'Formato de e-mail inválido.' }).trim(),
  password: z.string().nonempty({ message: 'Senha é obrigatória.' }).min(6, {message: "Senha precisa possui pelo menos 6 caracteres."}).trim(),
})
 
export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined