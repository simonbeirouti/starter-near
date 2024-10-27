"use client";

import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Badge} from "@/components/ui/badge";
import {Plus, Search, SortAsc, SortDesc} from "lucide-react";
import {useState, useMemo} from "react";
import Image from "next/image";
import {Table} from "./ui/table";

interface DataItem {
	title: string;
	description: string;
	tags: string[];
	image?: string;
}

interface DataGridProps {
	items: DataItem[];
	onAddItem: () => void;
	addButtonText: string;
	tags: string[];
}

const tagColors = [
	"bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
	"bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200",
	"bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
	"bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
	"bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200",
	"bg-pink-200 text-pink-800 dark:bg-pink-800 dark:text-pink-200",
	"bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200",
	"bg-teal-200 text-teal-800 dark:bg-teal-800 dark:text-teal-200",
];

export function DataGrid({
	items,
	onAddItem,
	addButtonText,
	tags,
}: DataGridProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	const getTagColor = (tag: string) => {
		const index = tags.indexOf(tag) % tagColors.length;
		return tagColors[index];
	};

	const filteredAndSortedItems = useMemo(() => {
		return items
			.filter(
				(item) =>
					(item.title
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
						item.description
							.toLowerCase()
							.includes(searchTerm.toLowerCase())) &&
					(!selectedTag || item.tags.includes(selectedTag))
			)
			.sort((a, b) => {
				if (sortOrder === "asc") {
					return a.title.localeCompare(b.title);
				} else {
					return b.title.localeCompare(a.title);
				}
			});
	}, [items, searchTerm, sortOrder, selectedTag]);

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
				<div className="relative w-full">
					<Input
						type="text"
						placeholder="Search..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10 bg-background text-foreground"
					/>
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
				</div>
				<div className="flex items-center gap-4 w-full">
					<Select
						value={sortOrder}
						onValueChange={(value: "asc" | "desc") =>
							setSortOrder(value)
						}
					>
						<SelectTrigger className="flex-1 bg-background text-foreground">
							<SelectValue placeholder="Sort order" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="asc">
								<div className="flex items-center">
									<SortAsc className="mr-2 h-4 w-4" />
									Ascending
								</div>
							</SelectItem>
							<SelectItem value="desc">
								<div className="flex items-center">
									<SortDesc className="mr-2 h-4 w-4" />
									Descending
								</div>
							</SelectItem>
						</SelectContent>
					</Select>
					<Select
						value={selectedTag || "all"}
						onValueChange={(value) =>
							setSelectedTag(value === "all" ? null : value)
						}
					>
						<SelectTrigger className="flex-1 bg-background text-foreground">
							<SelectValue placeholder="Filter by tag" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All tags</SelectItem>
							{tags.map((tag) => (
								<SelectItem key={tag} value={tag}>
									{tag}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button
						onClick={onAddItem}
						className="bg-primary text-primary-foreground hover:bg-primary/90"
					>
						<Plus className="mr-2 h-4 w-4" />
						{addButtonText}
					</Button>
				</div>
			</div>
			<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{filteredAndSortedItems.map((item, index) => (
					<Card
						key={index}
						className="relative flex flex-col justify-center items-center h-48 overflow-hidden border-2 border-border transition-all duration-300 ease-in-out bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card/60 hover:-translate-y-1"
					>
						{item.image && (
							<Image
								src={item.image}
								alt={item.title}
								layout="fill"
								objectFit="cover"
								className="absolute inset-0 z-0"
							/>
						)}
						<div
							className={`absolute inset-0 z-10 ${
								item.image
									? "bg-black bg-opacity-50 dark:bg-opacity-70"
									: ""
							}`}
						></div>
						<CardContent className="relative z-20 flex flex-col items-center justify-center p-6">
							<div
								className={`text-lg font-medium mb-2 ${
									item.image
										? "text-white"
										: "text-foreground"
								}`}
							>
								{item.title}
							</div>
							<p
								className={`text-sm text-center mb-2 ${
									item.image
										? "text-gray-200"
										: "text-muted-foreground"
								}`}
							>
								{item.description}
							</p>
							<div className="flex flex-wrap gap-2 justify-center">
								{item.tags.map((tag, tagIndex) => (
									<Badge
										key={tagIndex}
										className={`${getTagColor(
											tag
										)} font-semibold ${
											item.image ? "bg-opacity-80" : ""
										}`}
									>
										{tag}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				))}
				{filteredAndSortedItems.length === 0 && (
					<div className="flex flex-col justify-center items-center h-48 overflow-hidden border-2 border-border transition-all duration-300 ease-in-out bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card/60 hover:-translate-y-1">
						<CardContent className="flex flex-col items-center justify-center p-6">
							<div className="text-lg font-medium text-foreground mb-2">
								No items found
							</div>
						</CardContent>
					</div>
				)}
			</div>
		</div>
	);
}
