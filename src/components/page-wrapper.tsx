export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col pt-6 items-center min-h-screen light:bg-foreground dark:bg-background overflow-auto">
      {children}
    </main>
  );
}
