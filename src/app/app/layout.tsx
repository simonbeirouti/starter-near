import {AppSidebar} from "@/components/app-sidebar";
import BreadcrumbPath from "@/components/breadcrumb-path";
import {ModeToggle} from "@/components/mode-toggle";
import {Separator} from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import {BitteProvider} from "@/providers/bitte-provider";
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<BitteProvider>
			<div className="w-screen h-screen overflow-hidden">
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>
						<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-full overflow-hidden">
							<div className="flex items-center justify-between w-full px-4 gap-2">
								<div className="flex items-center gap-2 min-w-0">
									<SidebarTrigger className="-ml-1 flex-shrink-0" />
									<Separator
										orientation="vertical"
										className="mr-2 h-4 flex-shrink-0"
									/>
									<BreadcrumbPath />
								</div>
								<ModeToggle />
							</div>
						</header>
						<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
							{children}
						</div>
					</SidebarInset>
				</SidebarProvider>
			</div>
		</BitteProvider>
	);
}
