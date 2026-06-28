import { checkYtDlp, listStagedFiles } from "@/app/actions";
import { DownloadForm } from "./download-form";
import { StagedFiles } from "./staged-files";
import { YtDlpMissing } from "./ytdlp-missing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DownloadPage() {
  const ytDlpStatus = await checkYtDlp();
  const stagedFiles = await listStagedFiles();

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Download Audio</CardTitle>
          <CardDescription>
            Download MP3 audio from a YouTube video URL
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ytDlpStatus.available ? <DownloadForm /> : <YtDlpMissing />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staged MP3s</CardTitle>
          <CardDescription>
            Downloaded files waiting to be added to a playlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StagedFiles initialFiles={stagedFiles} />
        </CardContent>
      </Card>
    </div>
  );
}
