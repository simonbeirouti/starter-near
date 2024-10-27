"use client";

import {ChevronRight, type LucideIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavItem {
	title?: string;
	name?: string;
	image?: string;
	url: string;
	icon?: LucideIcon;
	isActive?: boolean;
	items?: NavItem[];
}

// interface NavSection {
// 	label: string;
// 	items: NavItem[];
// }

interface NavProps {
	sections: Record<string, NavItem[]>;
}

export function DynamicNav({sections}: NavProps) {
	return (
		<>
			{Object.entries(sections).map(([label, items]) => (
				<SidebarGroup key={label}>
					<SidebarGroupLabel>{label}</SidebarGroupLabel>
					<SidebarMenu className="gap-2">
						{items.map((item) => (
							<NavItemComponent
								key={item.title || item.name}
								item={item}
							/>
						))}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	);
}

function NavItemComponent({
	item,
}: {
	item: NavItem;
}) {
	const title = item.title || item.name || "";

	if (item.items && item.items.length > 0) {
		return (
			<Collapsible
				key={title}
				asChild
				defaultOpen={item.isActive}
				className="group/collapsible"
			>
				<SidebarMenuItem>
					<CollapsibleTrigger asChild>
						<SidebarMenuButton tooltip={title}>
							<Link
								className="flex items-center gap-2 w-full"
								href={item.url}
							>
								{item.icon && (
									<item.icon className="h-4 w-4 shrink-0" />
								)}
								<span className="truncate">{title}</span>
							</Link>
							<ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
						</SidebarMenuButton>
					</CollapsibleTrigger>
					<CollapsibleContent className="ml-1">
						<SidebarMenuSub>
							{item.items.map((subItem) => (
								<SidebarMenuSubItem
									className="pl-1"
									key={subItem.title || subItem.name}
								>
									<SidebarMenuSubButton asChild>
										<Link href={subItem.url}>
											<span>
												{subItem.title || subItem.name}
											</span>
										</Link>
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
							))}
						</SidebarMenuSub>
					</CollapsibleContent>
				</SidebarMenuItem>
			</Collapsible>
		);
	}

	return (
		<SidebarMenuItem key={title}>
			<SidebarMenuButton asChild tooltip={title}>
				<Link className="flex items-center" href={item.url}>
					{item.icon && <item.icon className="h-6 w-6 shrink-0" />}
					{item.image && (
						<div className="-ml-1 h-8 w-8 relative overflow-hidden rounded-full shrink-0">
							<Image
								src={item.image}
								alt={title}
								width={24}
								height={24}
								className="object-cover w-full h-full"
							/>
						</div>
					)}
					<span className="truncate">{title}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
