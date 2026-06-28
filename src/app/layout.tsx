import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata = {
  title: "Yoto Mage",
  description: "Yoto playlist manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
