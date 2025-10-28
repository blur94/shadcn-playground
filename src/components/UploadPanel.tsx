"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  ChevronUp,
  ChevronDown,
  X,
  FileVideo,
  FileText,
  FileArchive,
  UploadCloud,
  CheckCircle2,
  FileImage,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Custom Circular Progress Component ---
interface CircularProgressProps {
  progress: number;
  className?: string;
}

// --- Main Upload Panel Component ---
type UploadStatus = "uploading" | "processing" | "complete";
type Upload = {
  id: number;
  name: string;
  progress: number;
  status: UploadStatus;
};

const initialUploads: Upload[] = [
  { id: 1, name: "final-presentation.mp4", progress: 0, status: "uploading" },
  { id: 2, name: "project-brief.pdf", progress: 0, status: "uploading" },
  { id: 3, name: "design-assets.zip", progress: 0, status: "uploading" },
  { id: 4, name: "user-feedback-video.mov", progress: 0, status: "uploading" },
  { id: 5, name: "meeting-notes.docx", progress: 0, status: "uploading" },
  { id: 6, name: "archived-files.rar", progress: 0, status: "uploading" },
  { id: 7, name: "onboarding-tutorial.mp4", progress: 0, status: "uploading" },
  { id: 8, name: "legal-document.pdf", progress: 0, status: "uploading" },
  { id: 9, name: "source-code.zip", progress: 0, status: "uploading" },
  { id: 10, name: "team-photo.jpg", progress: 0, status: "uploading" },
];

export function UploadPanel() {
  const [uploads, setUploads] = useState<Upload[]>(initialUploads);
  // State to manage the collapsible panel
  const [isOpen, setIsOpen] = useState(true);

  // Memoized value to check if all uploads are complete
  const allUploadsComplete = useMemo(
    () => uploads.every((file) => file.status === "complete"),
    [uploads]
  );

  // Simulation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setUploads((prevUploads) => {
        // If all uploads are already complete, stop the interval
        if (prevUploads.every((file) => file.status === "complete")) {
          clearInterval(interval);
          return prevUploads;
        }

        const updatedUploads = prevUploads.map((file) => {
          if (file.status === "complete") return file;

          if (file.status === "uploading") {
            const diff = Math.random() * 20;
            const newProgress = Math.min(file.progress + diff, 100);
            if (newProgress === 100) {
              return {
                ...file,
                progress: 100,
                status: "processing" as UploadStatus,
              };
            }
            return { ...file, progress: newProgress };
          }

          if (file.status === "processing") {
            if (Math.random() > 0.9) {
              // Short processing time simulation
              return { ...file, status: "complete" as UploadStatus };
            }
          }
          return file;
        });

        return updatedUploads;
      });
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const getStatusMessage = () => {
    if (allUploadsComplete) return "All uploads complete!";
    if (uploads.some((f) => f.status === "processing"))
      return "Analyzing content...";
    if (uploads.some((f) => f.status === "uploading"))
      return "Uploading files...";
    return "";
  };

  const handleDismiss = () => {
    setUploads([]);
  };

  if (uploads.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-20 w-[435px] z-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <Card className="shadow-2xl rounded-none rounded-t-xl pb-1">
          <CardHeader className="py-0 px-4 border-red-500">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {allUploadsComplete ? "Upload Complete" : "Uploading"}
              </CardTitle>
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    {/* Shows up or down chevron based on state */}
                    {isOpen ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronUp className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleDismiss}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CollapsibleContent className="mt-0 pt-0 border-amber-500">
            <Separator className="mt-0 pt-0" />
            <CardContent className="pt-4 pb-0 px-4">
              <p className="text-sm text-muted-foreground mb-4">
                {getStatusMessage()}
              </p>
              <ScrollArea className="h-[200px] pr-3">
                <div className="space-y-4">
                  {uploads.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        {getFileIcon(file.name)}
                        <span className="text-sm font-medium truncate">
                          {file.name}
                        </span>
                      </div>
                      <div className="shrink-0">
                        {file.status === "uploading" && (
                          <CircularProgress progress={file.progress} />
                        )}
                        {file.status === "processing" && (
                          <Spinner className="h-6 w-6 text-red-500" />
                        )}
                        {file.status === "complete" && (
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  className,
}) => {
  const radius = 10; // Adjusted for 24px size
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    // Changed width and height to 24, viewBox to "0 0 24 24"
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={cn("transform -rotate-90", className)}
    >
      <circle
        className="text-slate-200 dark:text-slate-700"
        strokeWidth="2.5" // Adjusted stroke width
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="12" // Adjusted center
        cy="12" // Adjusted center
      />
      <circle
        className="text-red-500"
        strokeWidth="2.5" // Adjusted stroke width
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="12" // Adjusted center
        cy="12" // Adjusted center
      />
    </svg>
  );
};

// --- Helper to get file type icon ---
const getFileIcon = (fileName: string) => {
  if (/\.(mp4|mov|avi)$/i.test(fileName)) {
    return <FileVideo className="h-8 w-8 text-red-400" />;
  }
  if (/\.(pdf|docx|txt)$/i.test(fileName)) {
    return <FileText className="h-8 w-8 text-blue-400" />;
  }
  if (/\.(zip|rar|7z)$/i.test(fileName)) {
    return <FileArchive className="h-8 w-8 text-yellow-400" />;
  }
  if (/\.(jpg|jpeg|png|gif|svg)$/i.test(fileName)) {
    return <FileImage className="h-8 w-8 text-green-400" />;
  }
  return <UploadCloud className="h-8 w-8 text-slate-400" />;
};
