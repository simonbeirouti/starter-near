import {Inter} from "next/font/google";
import "./globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import {ThemeProvider} from "@/providers/theme-provider";
// import {BitteProvider} from "@/providers/bitte-provider";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} w-screen h-screen overflow-hidden`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					{/* <BitteProvider>{children}</BitteProvider> */}
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
