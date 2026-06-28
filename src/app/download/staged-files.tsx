"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteStagedFile, renameStagedFile } from "@/app/actions";

interface StagedFile {
  name: string;
  size: number;
  modified: number;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function StagedFiles({ initialFiles }: { initialFiles: StagedFile[] }) {
  const router = useRouter();
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  if (initialFiles.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No staged MP3 files yet. Download a video to get started.
      </p>
    );
  }

  async function handleDelete(name: string) {
    const result = await deleteStagedFile(name);
    if (result.success) {
      router.refresh();
    }
  }

  function startRename(name: string) {
    setRenaming(name);
    setRenameValue(name.replace(/\.mp3$/, ""));
  }

  async function handleRename(e: React.FormEvent) {
    e.preventDefault();
    if (!renaming || !renameValue.trim()) return;
    const result = await renameStagedFile(renaming, renameValue.trim());
    if (result.success) {
      setRenaming(null);
      router.refresh();
    }
  }

  function cancelRename() {
    setRenaming(null);
  }

  return (
    <ul className="divide-y divide-border">
      {initialFiles.map((file) => (
        <li key={file.name} className="py-3 first:pt-0 last:pb-0">
          {renaming === file.name ? (
            <form onSubmit={handleRename} className="flex items-center gap-2">
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                className="flex-1 h-8 px-2 border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") cancelRename();
                }}
              />
              <span className="text-sm text-muted-foreground">.mp3</span>
              <Button type="submit" size="sm" disabled={!renameValue.trim()}>
                Save
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={cancelRename}>
                Cancel
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium truncate">{file.name}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">
                  {formatSize(file.size)}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      ···
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => startRename(file.name)}>
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(file.name)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
