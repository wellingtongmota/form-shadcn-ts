"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "./ui/textarea"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "./ui/use-toast"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome inválido" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z.string().min(2, { message: "Assunto inválido" }),
  message: z.string().min(2, { message: "Mensagem inválida" })
})

export function FormSendMessage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  })

  const { toast } = useToast()

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast({
      title: "Modifique o onSubmit para a sua aplicação",
      description: (
        <>
          Dados enviados:
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        </>
      )
    })
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input id="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input id="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Assunto</FormLabel>
                <FormControl>
                  <Input id="subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Insira a sua mensagem aqui..."
                  // className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap gap-2">
          <Button
            className="flex-grow basis-40"
            variant="outline"
            type="reset"
            onClick={() => form.reset()}
          >
            Limpar
          </Button>

          <Button
            type="submit"
            className="flex-grow basis-40"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Enviando
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
