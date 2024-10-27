"use client";

import {Inter} from "next/font/google";
import "./globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import {ThemeProvider} from "@/providers/theme-provider";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} w-screen h-screen overflow-hidden`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
