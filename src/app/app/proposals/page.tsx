"use client";

import { DataGrid } from "@/components/data-grid";
// import PageWrapper from "@/components/page-wrapper";
// import type { Metadata } from "next";
import { useState } from "react";

// export const metadata: Metadata = {
// 	title: "Bitte Starter with Next.js",
// 	description: "Simple Login with Next.js 14",
// };

interface Proposal {
	title: string;
	description: string;
	tags: string[];
	image?: string;
}

export default function ProposalsPage() {
	const [proposals, setProposals] = useState<Proposal[]>([
		{ 
			title: "Proposal 1", 
			description: "Description for Proposal 1", 
			tags: ["finance", "governance"],
			// image: "https://example.com/image1.jpg"
		},
		{ 
			title: "Proposal 2", 
			description: "Description for Proposal 2", 
			tags: ["community", "events"],
			// image: "https://example.com/image2.jpg"
		},
		{ 
			title: "Proposal 3", 
			description: "Description for Proposal 3", 
			tags: ["finance", "development"],
			// image: "https://example.com/image3.jpg"
		},
		{ 
			title: "Proposal 4", 
			description: "Description for Proposal 4", 
			tags: ["governance", "community"],
			// image: "https://example.com/image4.jpg"
		},
	]);

	const handleAddProposal = () => {
		setProposals([
			...proposals,
			{
				title: `Proposal ${proposals.length + 1}`,
				description: `Description for Proposal ${proposals.length + 1}`,
				tags: ["new", "unclassified"],
			},
		]);
	};

	const allTags = Array.from(new Set(proposals.flatMap(proposal => proposal.tags)));

	return (
		<>
			<DataGrid
				items={proposals}
				onAddItem={handleAddProposal}
				addButtonText="Add Proposal"
				tags={allTags}
			/>
		</>
	);
}
