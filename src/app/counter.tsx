"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { listFiles } from "./actions";

export function Counter() {
  const [counter, setCounter] = useState(0);
  const [files, setFiles] = useState<string[]>([]);

  const handleListFiles = async () => {
    const result = await listFiles(".");
    setFiles(result);
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <p className="text-4xl font-light text-center tabular-nums">{counter}</p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={() => setCounter((c) => c - 1)}>
            -1
          </Button>
          <Button onClick={() => setCounter((c) => c + 1)}>+1</Button>
        </div>
      </section>

      <section className="space-y-3 border-t border-border pt-6">
        <Button variant="secondary" onClick={handleListFiles} className="w-full">
          List files in project root
        </Button>
        {files.length > 0 && (
          <ul className="text-sm text-muted-foreground space-y-1">
            {files.map((f) => (
              <li key={f} className="font-mono">{f}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
