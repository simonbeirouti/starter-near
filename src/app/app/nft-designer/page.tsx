"use client";

import {useState, useCallback} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import { NFTPreview } from "@/components/nft-preview";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { LayerPositionSelect } from "@/components/layer-position-select";

export default function NFTDesignerPage() {
	const [layerFolders, setLayerFolders] = useState<Array<{id: string; name: string; images: File[]; order: number}>>([]);

	const handleDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		const items = Array.from(e.dataTransfer.items);
		
		const processEntry = async (entry: FileSystemEntry) => {
			if (entry.isDirectory) {
				const dirReader = (entry as FileSystemDirectoryEntry).createReader();
				const entries = await new Promise<FileSystemEntry[]>((resolve) => {
					dirReader.readEntries((entries) => resolve(entries));
				});

				const imageFiles: File[] = [];
				for (const fileEntry of entries) {
					if (fileEntry.isFile) {
						const file = await new Promise<File>((resolve) => {
							(fileEntry as FileSystemFileEntry).file((file) => resolve(file));
						});
						if (file.type.startsWith('image/')) {
							imageFiles.push(file);
						}
					}
				}

				if (imageFiles.length > 0) {
					// Extract order from folder name (e.g. "1_Background" -> 0)
					const orderMatch = entry.name.match(/^(\d+)_/);
					const order = orderMatch ? parseInt(orderMatch[1]) - 1 : layerFolders.length;
					
					setLayerFolders(prev => [...prev, {
						id: crypto.randomUUID(),
						name: entry.name,
						images: imageFiles,
						order: order
					}]);
				}
			}
		};

		items.forEach(item => {
			const entry = item.webkitGetAsEntry();
			if (entry) {
				processEntry(entry);
			}
		});
	}, [layerFolders.length]);

	const handleOrderChange = (folderId: string, newOrder: string) => {
		if (newOrder === "delete") {
			setLayerFolders(prev => {
				const folderToDelete = prev.find(f => f.id === folderId);
				if (!folderToDelete) return prev;
				
				return prev
					.filter(f => f.id !== folderId)
					.map(folder => {
						if (folder.order > folderToDelete.order) {
							return {...folder, order: folder.order - 1};
						}
						return folder;
					})
					.sort((a, b) => a.order - b.order);
			});
			return;
		}

		const numOrder = parseInt(newOrder);
		setLayerFolders(prev => {
			const updatedFolders = [...prev];
			const currentFolder = updatedFolders.find(f => f.id === folderId);
			if (!currentFolder) return prev;

			const oldOrder = currentFolder.order;
			
			// Update all folders between old and new position
			updatedFolders.forEach(folder => {
				if (folder.id === folderId) {
					folder.order = numOrder;
				} else if (
					(oldOrder < numOrder && folder.order > oldOrder && folder.order <= numOrder) ||
					(oldOrder > numOrder && folder.order < oldOrder && folder.order >= numOrder)
				) {
					folder.order += oldOrder < numOrder ? -1 : 1;
				}
			});

			return updatedFolders.sort((a, b) => a.order - b.order);
		});
	};

	const FolderItem = ({folder, index}: {folder: typeof layerFolders[0], index: number}) => {
		return (
			<div className="bg-background dark:bg-background transform transition-all duration-300 ease-in-out p-2 rounded-md">
				<div className="flex flex-row justify-between items-center mb-4">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{folder.name}</h3>
						<div className="flex items-center gap-4">
							<LayerPositionSelect
								totalLayers={layerFolders.length}
								folderIndex={index}
								onOrderChange={(newOrder) => handleOrderChange(folder.id, newOrder)}
							/>
							<Button
								onClick={() => handleOrderChange(folder.id, "delete")}
								className="text-black dark:text-white bg-destructive/40 dark:bg-destructive/40 hover:bg-destructive dark:hover:bg-destructive px-2"
							>
								<Trash2Icon className="w-5 h-5" />
							</Button>
						</div>
				</div>
				<ScrollArea className="w-full">
					<div className="flex gap-4">
						{folder.images.map((image, imageIndex) => (
							<Card key={imageIndex} className="flex-shrink-0 w-[150px] bg-gray-100 dark:bg-gray-800">
								<CardContent className="p-2">
									<Image
                    src={URL.createObjectURL(image)}
                    width={150}
                    height={150}
										alt={`${folder.name} ${imageIndex + 1}`}
										className="w-full h-auto object-contain"
									/>
								</CardContent>
							</Card>
						))}
					</div>
          <ScrollBar orientation="horizontal" />
          <h1 className="mt-4 text-md text-gray-500 dark:text-gray-400">{folder.images.length} images</h1>
				</ScrollArea>
			</div>
		);
	};

	return (
		<div className="min-h-screen">
			<ScrollArea className="h-[calc(100vh-4rem)]">
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div 
							className="bg-white dark:bg-gray-800 min-h-[200px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-center"
							onDragOver={(e) => e.preventDefault()}
							onDrop={handleDrop}
						>
							<p className="text-gray-500 dark:text-gray-400">Drag and drop image folders here</p>
						</div>
						{layerFolders.map((folder, index) => (
							<FolderItem key={folder.id} folder={folder} index={index} />
						))}
					</div>
					{layerFolders.length > 0 && (
						<div className="pb-8">
							<NFTPreview layerFolders={layerFolders} />
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
}
