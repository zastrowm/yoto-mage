import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Counter } from "./counter";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Yoto Mage</CardTitle>
          <CardDescription>Yoto playlist manager</CardDescription>
        </CardHeader>
        <CardContent>
          <Counter />
        </CardContent>
      </Card>
    </main>
  );
}
