import AuthForm from "@/components/AuthForm";
import PaymentForm from "@/components/PaymentForm";
import { Fullscreen } from "lucide-react";

function Page() {
  return (
    <div className="relative h-screen w-screen bg-black/100">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/login-image.jpg')" }}
      ></div>
      <div className="relative flex h-full items-center justify-center">
        <AuthForm />
      </div>
      {/* <div className="relative flex h-full items-center justify-center">
        <PaymentForm />
      </div> */}
    </div>
  );
}

export default Page;
