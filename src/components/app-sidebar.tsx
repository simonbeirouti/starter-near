"use client";

import * as React from "react";
import {
	Bitcoin,
	ReceiptText,
	Contact,
	Key,
	BookOpenText,
	Factory,
	Image,
	BadgeDollarSign,
} from "lucide-react";

import {NavUser} from "@/components/nav-user";
import {DashboardHeader} from "@/components/dashboard-header";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import {DynamicNav} from "@/components/dynamic-nav";

export const getNavData = () => ({
	Platform: [
		{
			title: "Proposals",
			url: "/proposals",
			icon: BookOpenText,
		},
		{
			title: "Members",
			url: "/members",
			icon: Contact,
		},
		{
			title: "Contracts",
			url: "/contracts",
			icon: ReceiptText,
		},
		{
			title: "DAO Factory",
			url: "/dao-factory",
			icon: Factory,
		},
		{
			title: "NFT Designer",
			url: "/nft-designer",
			icon: Image,
		},
		{
			title: "Auction",
			url: "/auction",
			icon: BadgeDollarSign,
		},
		{
			title: "Token",
			url: "/token",
			icon: Bitcoin,
		},
		{
			title: "Keys",
			url: "/keys",
			icon: Key,
			// isActive: pathname.startsWith('/keys'),
			// items: [
			// 	{
			// 		title: "General",
			// 		url: "/keys/general",
			// 	},
			// 	{
			// 		title: "Team",
			// 		url: "/keys/team",
			// 	},
			// 	{
			// 		title: "Billing",
			// 		url: "/keys/billing",
			// 	},
			// 	{
			// 		title: "Limits",
			// 		url: "/keys/limits",
			// 	},
			// ],
		},
	],
	Projects: [
		{
			name: "Bitconnect $BCC",
			url: "/projects/bitconnect",
			image: "/bcc.jpg",
		},
		{
			name: "Cubed $CUBED",
			url: "/projects/cubed",
			image: "/cubed.png",
		},
		{
			name: "Meme Broker $MBROKER",
			url: "/projects/meme-broker",
			image: "/memebroker.png",
		},
	],
});

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
	const navData = getNavData();

	return (
		<Sidebar variant="inset" className="ml-1" collapsible="icon" {...props}>
			<SidebarHeader>
				<DashboardHeader />
			</SidebarHeader>
			<SidebarContent>
				<DynamicNav sections={navData} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
