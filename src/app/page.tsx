import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to login page when accessing the root URL
  redirect('/login');
  
  // This part won't be rendered due to the redirect
  return null;
}
