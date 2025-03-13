import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/Components/NavBar";
import { Tajawal } from "next/font/google";
import ThemeProvider from "@/Components/ThemeProvider";
import AnimatedWaves from "@/Components/Ui/Waves";
import "./globals.css"

// import { cookies } from "next/headers";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "500", "700", "800", "900"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  // const localee = (await cookies()).get("NEXT_LOCALE")?.value

  return (
    <html
      className={tajawal.className}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <body key={locale} className="dark:bg-zinc-900 bg-background overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider />
          {/* {localee} */}
          <NavBar />
          <div className="container mx-auto">{children}</div>
          <AnimatedWaves />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
