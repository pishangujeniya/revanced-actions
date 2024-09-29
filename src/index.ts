import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ApkMirrorHelper } from './Helpers/ApkMirrorHelper';
import { APKMirrorDownloader } from "apkmirror-downloader";

console.log("ReVanced Actions");

async function main() {
    // Configure yargs
    const argv = await yargs(hideBin(process.argv))
        .option('config', {
            alias: 'c',
            type: 'string',
            description: 'Config JSON File path'
        })
        .help()
        .argv;

    // Use the parsed arguments
    console.log(`Using, ${argv.config}!`);

    // YouTube Version 19.16.39
    await new ApkMirrorHelper().downloadYouTubeApk('19.16.39');

    await APKMirrorDownloader.download({ org: "google-inc", repo: "youtube" });
}

main().catch(err => console.error(err));