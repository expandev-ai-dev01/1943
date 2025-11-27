import { z } from 'zod';

const preferenceOptions = ['Telefone', 'E-mail', 'WhatsApp'] as const;
const bestTimeOptions = ['Manhã', 'Tarde', 'Noite', 'Qualquer horário'] as const;
const subjectOptions = [
  'Informações gerais',
  'Agendamento de test drive',
  'Negociação de preço',
  'Financiamento',
  'Outro',
] as const;

export const contactSchema = z.object({
  carId: z.string(),
  name: z
    .string('Nome é obrigatório')
    .min(3, 'Deve conter no mínimo 3 caracteres')
    .max(100, 'Deve conter no máximo 100 caracteres')
    .refine((val) => val.trim().split(/\s+/).length >= 2, 'Deve conter nome e sobrenome'),
  email: z
    .string('E-mail é obrigatório')
    .email('E-mail inválido')
    .max(100, 'Deve conter no máximo 100 caracteres'),
  phone: z.string('Telefone é obrigatório').min(10, 'Deve conter no mínimo 10 dígitos'),
  preference: z.enum(preferenceOptions, 'Selecione uma preferência de contato'),
  bestTime: z.enum(bestTimeOptions).default('Qualquer horário'),
  subject: z.enum(subjectOptions, 'Selecione o assunto'),
  message: z
    .string('Mensagem é obrigatória')
    .min(10, 'Mínimo de 10 caracteres')
    .max(1000, 'Máximo de 1000 caracteres'),
  financing: z.boolean().default(false),
  termsAccepted: z
    .boolean('Termos obrigatórios')
    .refine((val) => val === true, 'Você deve aceitar os termos de privacidade'),
  newsletter: z.boolean().default(false),
  captcha: z.string().optional(),
});
