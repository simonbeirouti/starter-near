"use client";

import {useState, useEffect} from "react";
// import type { Metadata } from "next";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import Image from "next/image";

// export const metadata: Metadata = {
//   title: "NFT Designer",
//   description: "Design your NFT by combining layers",
// };

export default function NFTDesignerPage() {
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
	const [layerFolders, setLayerFolders] = useState<
		Array<{name: string; images: string[]}>
	>([]);

	useEffect(() => {
		fetch("/api/nft-layers")
			.then((res) => res.json())
			.then((data) => setLayerFolders(data))
			.catch(console.error);
	}, []);

	const handleSelectLayer = (imagePath: string) => {
		setSelectedLayers((prev) => {
			const newLayers = [...prev];
			newLayers[currentStep] = imagePath;
			return newLayers;
		});
	};

	const handleNext = () => {
		if (currentStep < layerFolders.length - 1) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	return (
		<div className="  space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">
					Step {currentStep + 1}: Choose{" "}
					{layerFolders[currentStep]?.name}
				</h1>
				<div className="space-x-2">
					<Button
						onClick={handleBack}
						disabled={currentStep === 0}
						variant="outline"
					>
						Back
					</Button>
					<Button
						onClick={handleNext}
						disabled={
							currentStep === layerFolders.length - 1 ||
							!selectedLayers[currentStep]
						}
					>
						Next
					</Button>
				</div>
			</div>

			<div className="container flex flex-col gap-10">
				<ScrollArea className="w-full">
					<div className="flex gap-4 pb-4">
						{layerFolders[currentStep]?.images.map(
							(imagePath, index) => (
								<Card
									key={index}
									className={`cursor-pointer transition-all flex-shrink-0 w-[200px] ${
										selectedLayers[currentStep] ===
										imagePath
											? "ring-1 ring-primary m-1"
											: ""
									}`}
									onClick={() => handleSelectLayer(imagePath)}
								>
									<CardContent className="p-2">
										<Image
											src={imagePath}
											alt={`Option ${index + 1}`}
											width={200}
											height={200}
											className="w-full h-auto object-contain"
										/>
									</CardContent>
								</Card>
							)
						)}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>

				<div className="relative w-[500px] h-[500px] mx-auto">
					{selectedLayers.map(
						(layer, index) =>
							layer && (
								<Image
									key={index}
									src={layer}
									alt={`Layer ${index + 1}`}
									width={500}
									height={500}
									className="absolute top-0 left-0 w-full h-full object-contain"
								/>
							)
					)}
				</div>
			</div>
		</div>
	);
}
