import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {BoxIcon} from "lucide-react";
import Link from "next/link";
import {NearWalletConnector} from "@/components/wallet-connector";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="flex h-14 items-center justify-between container mx-auto px-4">
					<div className="flex items-center gap-2">
						<BoxIcon className="w-6 h-6" />
						<span className="font-bold">DeFi App</span>
					</div>
					<div className="flex items-center gap-4">
						<Link href="/about">
							<Button variant="ghost">About</Button>
						</Link>
						<Link href="/contact">
							<Button variant="ghost">Contact</Button>
						</Link>
						<NearWalletConnector />
					</div>
				</div>
			</header>

			<main className="flex-1">
				<section className="py-20 md:py-32 flex justify-center items-center px-4">
					<div className="container flex flex-col items-center text-center gap-4">
						<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
							The Future of{" "}
							<span className="text-primary">
								Decentralized Finance
							</span>
						</h1>
						<p className="text-xl text-muted-foreground max-w-[600px] md:text-2xl">
							Trade, earn and grow your crypto assets in a secure
							decentralized environment
						</p>
						<div className="flex gap-4 mt-6">
							<Link href="/dashboard">
								<Button size="lg">Get Started</Button>
							</Link>
							<Button size="lg" variant="outline">
								Learn More
							</Button>
						</div>
					</div>
				</section>

				<section className="py-20 bg-muted/50 flex justify-center items-center px-4">
					<div className="container">
						<div className="grid gap-8 md:grid-cols-3">
							<Card>
								<CardContent className="pt-6">
									<h3 className="text-2xl font-bold mb-2">
										Trade
									</h3>
									<p className="text-muted-foreground">
										Swap tokens instantly with deep
										liquidity and minimal slippage
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<h3 className="text-2xl font-bold mb-2">
										Earn
									</h3>
									<p className="text-muted-foreground">
										Provide liquidity and earn rewards
										through yield farming
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<h3 className="text-2xl font-bold mb-2">
										Stake
									</h3>
									<p className="text-muted-foreground">
										Stake your tokens to earn passive income
										and governance rights
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
			</main>

			<footer className="border-t py-6">
				<div className="container mx-auto flex justify-between items-center px-4">
					<span className="text-sm text-muted-foreground">
						© 2024 DeFi App. All rights reserved.
					</span>
					<div className="flex gap-4">
						<Link
							href="#"
							className="text-sm text-muted-foreground hover:text-primary"
						>
							Terms
						</Link>
						<Link
							href="#"
							className="text-sm text-muted-foreground hover:text-primary"
						>
							Privacy
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
