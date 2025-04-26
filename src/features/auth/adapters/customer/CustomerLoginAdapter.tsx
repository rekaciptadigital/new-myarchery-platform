import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "../../components/LoginForm";

export function CustomerLoginAdapter() {
  return (
    <div className="max-w-md w-full">
      <div className="mb-4">
        <Link 
          href="/" 
          className="text-slate-600 hover:text-slate-800 flex items-center text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-1" />
          Kembali ke halaman utama
        </Link>
      </div>
      <LoginForm isCustomerLogin={true} />
    </div>
  );
}
