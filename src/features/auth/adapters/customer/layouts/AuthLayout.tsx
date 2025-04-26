import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  benefits: string[];
  accentColor: "green" | "blue" | "purple";
};

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  benefits, 
  accentColor 
}: Readonly<AuthLayoutProps>) {
  const colorMap = {
    green: {
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
      highlight: "text-yellow-300",
      checkBg: "bg-green-400",
      text: "text-green-50",
      textHighlight: "text-green-100"
    },
    blue: {
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      highlight: "text-blue-300",
      checkBg: "bg-blue-400",
      text: "text-blue-50",
      textHighlight: "text-blue-100"
    },
    purple: {
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      highlight: "text-purple-300",
      checkBg: "bg-purple-400",
      text: "text-purple-50",
      textHighlight: "text-purple-100"
    }
  };

  const colors = colorMap[accentColor];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow grid md:grid-cols-2 items-stretch w-full">
        {/* Left column with login form */}
        <div className="flex items-center justify-center bg-white p-8 md:p-12 order-2 md:order-1">
          {children}
        </div>
        
        {/* Right column with colored background */}
        <div className={`${colors.gradient} text-white p-8 md:p-12 flex items-center justify-center order-1 md:order-2`}>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {title.split(" ").map((word, i, arr) => 
                i === arr.length - 1 ? 
                  <span key={`title-word-${word}-${i}`} className={colors.highlight}>{word} </span> : 
                  <span key={`title-word-${word}-${i}`}>{word} </span>
              )}
            </h1>
            <p className={`text-lg ${colors.textHighlight} mb-8`}>
              {subtitle}
            </p>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={`benefit-${benefit}`} className="flex items-center">
                  <div className={`${colors.checkBg} p-2 rounded-full mr-3`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={colors.text}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
