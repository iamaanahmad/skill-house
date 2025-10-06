"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { APP_URL } from "@/lib/appwrite/config";

interface QrCodeDialogProps {
  skillId: string;
  skillName: string;
  children: React.ReactNode;
}

export function QrCodeDialog({
  skillId,
  skillName,
  children,
}: QrCodeDialogProps) {
  // Use the configured APP_URL for verification links
  const verificationUrl = `${APP_URL}/verify/${skillId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    verificationUrl
  )}&qzone=1&color=A050D3&bgcolor=F2E7F7`;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>Verify: {skillName}</DialogTitle>
          <DialogDescription>
            Scan this QR code to verify this credential.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4">
          <Image
            src={qrCodeUrl}
            alt={`QR Code for ${skillName}`}
            width={250}
            height={250}
            className="rounded-lg border-4 border-primary"
            data-ai-hint="qr code"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
