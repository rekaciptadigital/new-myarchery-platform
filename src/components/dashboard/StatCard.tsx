interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: "default" | "success" | "primary";
}

const variantStyles = {
  default: "text-blue-600",
  success: "text-green-600",
  primary: "text-blue-600",
};

export function StatCard({ title, value, subtitle, variant = "default" }: Readonly<StatCardProps>) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <h3 className="font-semibold text-slate-700 mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${variantStyles[variant]} mb-1`}>
        {value}
      </p>
      {subtitle && (
        <p className="text-slate-500 text-sm">{subtitle}</p>
      )}
    </div>
  );
}
