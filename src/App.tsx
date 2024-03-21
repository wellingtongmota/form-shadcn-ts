import { FormSendMessage } from "./components/FormSendMessage"
import { Toaster } from "@/components/ui/toaster"

export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Toaster />
      <div className="max-w-md w-full border rounded-md p-5 space-y-4">
        <h1 className="text-3xl font-bold antialiased">Enviar e-mail</h1>
        <FormSendMessage />
      </div>
    </div>
  )
}
