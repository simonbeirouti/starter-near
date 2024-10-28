"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {SearchLayout} from "@/components/search-layout";
import {useSearch} from "@/store/use-search";

interface Proposal {
	title: string;
	description: string;
	tags: string[];
	likes: number;
	image?: string;
}

const proposals: Proposal[] = [
	{
		title: "Proposal 1",
		description:
			"Description for Proposal 1 - This is an extended description to increase length and provide more details about the proposal.",
		tags: ["finance", "governance"],
		likes: 156,
		// image: "https://example.com/image1.jpg"
	},
	{
		title: "Proposal 2",
		description:
			"Description for Proposal 2 - This is an extended description to increase length and provide more details about the proposal.",
		tags: ["community", "events"],
		likes: 89,
		// image: "https://example.com/image2.jpg"
	},
	{
		title: "Proposal 3",
		description:
			"Description for Proposal 3 - This is an extended description to increase length and provide more details about the proposal.",
		tags: ["finance", "development"],
		likes: 234,
		// image: "https://example.com/image3.jpg"
	},
	{
		title: "Proposal 4",
		description:
			"Description for Proposal 4 - This is an extended description to increase length and provide more details about the proposal.",
		tags: ["governance", "community"],
		likes: 67,
		// image: "https://example.com/image4.jpg"
	},
];

export default function ProposalsPage() {
	const [filteredProposals, setFilteredProposals] =
		useState<Proposal[]>(proposals);
	const {reset} = useSearch();

	useEffect(() => {
		return () => reset();
	}, [reset]);

	return (
		<SearchLayout
			data={proposals}
			onDataFiltered={setFilteredProposals}
			tags={Array.from(
				new Set(proposals.flatMap((proposal) => proposal.tags))
			)}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredProposals.map((proposal, index) => (
					<ProposalCard key={index} proposal={proposal} />
				))}
			</div>
		</SearchLayout>
	);
}

export function ProposalCard({proposal}: {proposal: Proposal}) {
	return (
		<Card className="flex flex-col overflow-hidden border bg-card text-card-foreground shadow">
			<div className="p-6">
				<div className="flex flex-col space-y-1.5">
					<div className="flex justify-between items-center">
						<h3 className="font-semibold leading-none tracking-tight text-xl">
							{proposal.title}
						</h3>
						<div className="flex items-center gap-1 text-sm text-muted-foreground">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-red-500"
							>
								<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
							</svg>
							{proposal.likes}
						</div>
					</div>
					<p className="text-sm w-4/5 text-muted-foreground">
						{proposal.description}
					</p>
				</div>
			</div>
			<div className="flex items-center justify-between p-6 pt-0">
				<div className="flex flex-wrap gap-2">
					{proposal.tags.map((tag: string, tagIndex: number) => (
						<Badge
							key={tagIndex}
							variant="secondary"
							className="bg-secondary/50"
						>
							{tag}
						</Badge>
					))}
				</div>
				<Button variant="outline" size="sm">
					View Details
				</Button>
			</div>
		</Card>
	);
}
