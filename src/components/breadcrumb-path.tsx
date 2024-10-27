"use client";

import { usePathname } from 'next/navigation';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getNavData } from "@/components/app-sidebar";
interface NavItem {
	name?: string;
	title?: string;
	url: string;
	isActive?: boolean;
	items?: NavItem[];
}

type NavData = {
	[key: string]: NavItem[];
}

export default function BreadcrumbPath() {
	const pathname = usePathname();
	const navData: NavData = getNavData();

	const flattenedNavData = Object.values(navData).flat();
	const currentRoute = flattenedNavData.find(item => item.url === pathname) || 
		flattenedNavData.find(item => item.items?.some(subItem => subItem.url === pathname));

	const currentSubRoute = currentRoute?.items?.find(item => item.url === pathname);

	return (
		<Breadcrumb className='flex justify-between'>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
				</BreadcrumbItem>
				{currentRoute && (
                    <>
                        <BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href={currentRoute.url}>
								{currentRoute.title || currentRoute.name}
							</BreadcrumbLink>
						</BreadcrumbItem>
						{currentSubRoute && (
							<>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>{currentSubRoute.title || currentSubRoute.name}</BreadcrumbPage>
								</BreadcrumbItem>
							</>
						)}
					</>
				)}
            </BreadcrumbList>
		</Breadcrumb>
	);
}
