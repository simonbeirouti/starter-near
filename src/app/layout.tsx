"use client";

import {Inter} from "next/font/google";
import "./globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import {ThemeProvider} from "@/providers/theme-provider";

import {BitteWalletContextProvider} from "@mintbase-js/react";

const inter = Inter({subsets: ["latin"]});

const BitteWalletSetup = {
	contractAddress:
		process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
		"hellovirtualworld.mintspace2.testnet",
	network: process.env.NEXT_PUBLIC_NETWORK || "testnet",
	callbackUrl:
		process.env.NEXT_PUBLIC_CALLBACK_URL ||
		(typeof window !== "undefined" ? window.location.origin : ""),
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<BitteWalletContextProvider {...BitteWalletSetup} onlyBitteWallet>
			<html lang="en">
				<body className={`${inter.className} w-screen h-screen overflow-hidden`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</BitteWalletContextProvider>
	);
}
