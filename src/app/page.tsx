import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuthStatus } from "@/lib/yoto/actions";
import Link from "next/link";

export default async function Home() {
  const { authenticated } = await getAuthStatus();

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Manage your Yoto custom playlists
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {authenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Connected to Yoto
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/api/auth/logout">Logout</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Connect your Yoto account to manage playlists.
              </p>
              <Button asChild>
                <Link href="/api/auth/login">Login with Yoto</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
