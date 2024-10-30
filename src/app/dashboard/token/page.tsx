"use client";

import {useState, ComponentProps} from "react";
import {cn} from "@/lib/utils";
import {useMediaQuery} from "usehooks-ts";
import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {ImageIcon} from "lucide-react";

interface Token {
	image: string;
	quantity: number;
	price: number;
	ticker: string;
}

const tokenData: Token[] = [
	{image: "/bcc.jpg", quantity: 10, price: 100, ticker: "BCC"},
	{image: "/bcc.jpg", quantity: 5, price: 50, ticker: "BCC"},
	{image: "/bcc.jpg", quantity: 20, price: 200, ticker: "BCC"},
];

export default function TokenPage() {
	return (
		<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<DrawerDialog />
			{tokenData.map((token, index) => (
				<TokenCard key={index} token={token} />
			))}
		</main>
	);
}

function TokenCard({token}: {token: Token}) {
	return (
		<Card className="relative h-48 flex flex-col justify-center items-center overflow-hidden border-2 border-border transition-all duration-300 ease-in-out bg-card hover:bg-card/80 dark:bg-card/80 dark:hover:bg-card/60 hover:-translate-y-1 group">
			{token.image && (
				<Image
					src={token.image}
					alt={token.ticker}
					width={250}
					height={250}
					className="absolute object-cover w-full h-full inset-0 z-0"
				/>
			)}
			<div
				className={`absolute inset-0 z-10 ${
					token.image
						? "bg-black bg-opacity-50 dark:bg-opacity-70"
						: ""
				}`}
			></div>
			<CardContent className="relative z-20 flex flex-col items-center justify-center p-6">
				<div
					className={`text-lg font-medium mb-2 transform transition-all duration-300 ease-in-out opacity-30 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 ${
						token.image ? "text-white" : "text-foreground"
					}`}
				>
					{token.ticker}
				</div>
			</CardContent>
		</Card>
	);
}

function DrawerDialog() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const Container = isDesktop ? Dialog : Drawer;
	const Trigger = isDesktop ? DialogTrigger : DrawerTrigger;
	const Close = isDesktop ? DialogClose : DrawerClose;
	const Content = isDesktop ? DialogContent : DrawerContent;
	const Header = isDesktop ? DialogHeader : DrawerHeader;
	const Footer = isDesktop ? DialogFooter : DrawerFooter;
	const Title = isDesktop ? DialogTitle : DrawerTitle;
	const Description = isDesktop ? DialogDescription : DrawerDescription;

	return (
		<Container open={open} onOpenChange={setOpen}>
			<Trigger asChild>
				<TokenPreview onClick={() => setOpen(!open)} />
			</Trigger>
			<Content className={cn("sm:max-w-[425px]", !isDesktop && "px-4")}>
				<Header className="text-left">
					<Title>Create Token</Title>
					<Description>
						Create your new token here. Click create when you&apos;re done.
					</Description>
				</Header>
				<TokenForm />
				<Footer>
					<Close asChild>
						<Button className="w-full" variant="outline">
							Cancel
						</Button>
					</Close>
				</Footer>
			</Content>
		</Container>
	);
}

function TokenPreview({onClick}: {onClick: () => void}) {
	return (
		<div
			className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
			onClick={onClick}
		>
			<div className="flex flex-col items-center gap-2">
				<ImageIcon className="w-12 h-12 text-gray-400" />
				<p className="text-sm text-gray-400">
					Click or drag image here
				</p>
			</div>
		</div>
	);
}

function TokenForm({className}: ComponentProps<"form">) {
	const [image, setImage] = useState<File | null>(null);
	const [name, setName] = useState("");
	const [ticker, setTicker] = useState("");
	const [quantity, setQuantity] = useState("");

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith("image/")) {
			setImage(file);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	return (
		<form className={cn("grid items-start gap-4", className)}>
			<div className="flex flex-col items-center gap-4">
				<div
					className="w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
					onClick={() =>
						document.getElementById("image-upload")?.click()
					}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
				>
					{image ? (
						<Image
							src={URL.createObjectURL(image)}
							alt="Token preview"
							width={192}
							height={192}
							className="rounded-lg object-cover"
						/>
					) : (
						<div className="flex flex-col items-center gap-2">
							<ImageIcon className="w-12 h-12 text-gray-400" />
							<p className="text-sm text-gray-400">
								Click or drag image here
							</p>
						</div>
					)}
				</div>
				<Input
					id="image-upload"
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleImageChange}
				/>
			</div>

			<div className="space-y-4">
				<div>
					<Input
						placeholder="Token Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div>
					<Input
						placeholder="Token Ticker (e.g. BTC)"
						value={ticker}
						onChange={(e) =>
							setTicker(e.target.value.toUpperCase())
						}
						maxLength={5}
					/>
				</div>

				<div>
					<Input
						type="number"
						placeholder="Total Supply"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
						min="0"
					/>
				</div>

				<Button className="w-full">Create Token</Button>
			</div>
		</form>
	);
}
