// "use client";

// import React, { useState } from "react";
// import { useMediaQuery } from "usehooks-ts";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTrigger,
// } from "@/components/ui/drawer";

// export function ButtonMenu() {
//   const [open, setOpen] = useState(false);
//   const isDesktop = useMediaQuery("(min-width: 768px)");

//   const ButtonsGrid = () => (
//     <div className="grid grid-cols-2 gap-2">
//       {[...Array(6)].map((_, i) => (
//         <Button key={i} variant="outline" className="h-[calc(25vh-1rem)] w-full">
//           Button {i + 1}
//         </Button>
//       ))}
//     </div>
//   );

//   const DialogOrDrawer = isDesktop ? (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Show Buttons</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Button Grid</DialogTitle>
//           <DialogDescription>
//             Here&apos;s a grid of buttons for you to interact with.
//           </DialogDescription>
//         </DialogHeader>
//         <ButtonsGrid />
//       </DialogContent>
//     </Dialog>
//   ) : (
//     <Drawer open={open} onOpenChange={setOpen}>
//       <DrawerTrigger asChild>
//         <Button variant="outline">Show Buttons</Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader className="text-center">
//           <ButtonsGrid />
//           <DrawerDescription className="mt-4">
//             Here's a grid of buttons for you to interact with.
//           </DrawerDescription>
//         </DrawerHeader>
//         <DrawerFooter className="pt-2">
//           <DrawerClose asChild>
//             <Button variant="outline">Close</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );

//   return (
//     <div className="fixed bottom-4 left-0 right-0 flex justify-center md:inset-0 md:items-center">
//       {DialogOrDrawer}
//     </div>
//   );
// }

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {children}
    </div>
  );
}
