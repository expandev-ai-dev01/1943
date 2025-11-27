import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/core/components/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/core/components/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/core/components/form';
import { Input } from '@/core/components/input';
import { Textarea } from '@/core/components/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { Checkbox } from '@/core/components/checkbox';
import { RadioGroup, RadioGroupItem } from '@/core/components/radio-group';
import { contactSchema } from '../../validations/contact';
import { carService } from '../../services/carService';
import type { ContactFormInput, ContactFormOutput } from '../../types/forms';

interface CarContactFormProps {
  carId: string;
  carName: string;
}

function CarContactForm({ carId, carName }: CarContactFormProps) {
  const form = useForm<ContactFormInput, any, ContactFormOutput>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      carId: carId,
      name: '',
      email: '',
      phone: '',
      preference: 'WhatsApp',
      bestTime: 'Qualquer horário',
      subject: 'Informações gerais',
      message: `Olá, tenho interesse no veículo ${carName}. Gostaria de mais informações.`,
      financing: false,
      termsAccepted: false,
      newsletter: false,
      captcha: 'mock-token', // Mocking captcha for development
    },
  });

  const subject = form.watch('subject');

  useEffect(() => {
    if (subject === 'Financiamento') {
      form.setValue('financing', true);
    }
  }, [subject, form]);

  const onSubmit = async (data: ContactFormOutput) => {
    try {
      // Ensure captcha is present
      const payload = { ...data, captcha: data.captcha || 'mock-token' };
      await carService.sendContact(payload);
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      form.reset({
        carId: carId,
        name: '',
        email: '',
        phone: '',
        preference: 'WhatsApp',
        bestTime: 'Qualquer horário',
        subject: 'Informações gerais',
        message: `Olá, tenho interesse no veículo ${carName}. Gostaria de mais informações.`,
        financing: false,
        termsAccepted: false,
        newsletter: false,
        captcha: 'mock-token',
      });
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tenho Interesse</CardTitle>
        <CardDescription>
          Preencha o formulário para receber contato de um consultor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="preference"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Preferência de Contato</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="WhatsApp" />
                        </FormControl>
                        <FormLabel className="font-normal">WhatsApp</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Telefone" />
                        </FormControl>
                        <FormLabel className="font-normal">Telefone</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="E-mail" />
                        </FormControl>
                        <FormLabel className="font-normal">E-mail</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assunto</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Informações gerais">Informações gerais</SelectItem>
                        <SelectItem value="Agendamento de test drive">
                          Agendamento de test drive
                        </SelectItem>
                        <SelectItem value="Negociação de preço">Negociação de preço</SelectItem>
                        <SelectItem value="Financiamento">Financiamento</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bestTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Melhor Horário</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Manhã">Manhã</SelectItem>
                        <SelectItem value="Tarde">Tarde</SelectItem>
                        <SelectItem value="Noite">Noite</SelectItem>
                        <SelectItem value="Qualquer horário">Qualquer horário</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>{field.value.length}/1000 caracteres</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="financing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Tenho interesse em financiamento</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newsletter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Quero receber novidades e ofertas</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Li e aceito a{' '}
                        <a
                          href="#"
                          className="text-primary underline"
                          onClick={(e) => e.preventDefault()}
                        >
                          política de privacidade
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { CarContactForm };
