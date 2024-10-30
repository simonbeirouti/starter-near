import {Overview} from "@/components/overview";
import {RecentSales} from "@/components/recent-sales";
import type {Metadata} from "next";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Bitte Starter with Next.js",
	description: "Simple Login with Next.js 14",
};

export default function AccountPage() {
	return (
		<main className="flex flex-col">
			<Data />
		</main>
	);
}

function Data() {
	return (
		<div className="grid gap-4 md:grid-cols-4 lg:grid-cols-8">
			<Card className="col-span-4">
				<CardHeader>
					<CardTitle>Overview</CardTitle>
				</CardHeader>
				<CardContent className="pl-2">
					<Overview />
				</CardContent>
			</Card>
			<Card className="col-span-4">
				<CardHeader>
					<CardTitle>Recent Sales</CardTitle>
					<CardDescription>
						You made 265 sales this month.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RecentSales />
				</CardContent>
			</Card>
		</div>
	);
}
