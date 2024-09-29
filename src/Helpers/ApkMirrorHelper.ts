import axios from 'axios';
import { exec } from 'child_process';
import { CookieJar } from 'tough-cookie';
const { wrapper } = require('axios-cookiejar-support');
export class ApkMirrorHelper {

    public jar = new CookieJar();
    private axiosClient = wrapper(axios.create({
        withCredentials: true,
        // jar: this.jar,
    }));

    constructor() {
    }

    private readonly USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0';

    /**
     * Helper function to make HTTP requests.
     * @param {string} url - The URL to request.
     * @returns {Promise<string>} - A promise that resolves with the response data.
     */
    private async sendGetRequest(url: string): Promise<string> {
        const response = await this.axiosClient.get(url, {
            headers: {
                'User-Agent': this.USER_AGENT,
            }
        });
        return response.data as string;
    }

    /**
     * Extracts href attributes from the provided HTML data.
     * @param {string} html - The HTML data to parse.
     * @returns {string[]} - An array of href attribute values.
     */
    private extractHrefs(html: string): string[] {
        const hrefRegex = /href="([^"]*)"/g;
        const matches = new Set<string>();
        let match;
        while ((match = hrefRegex.exec(html)) !== null) {
            matches.add(match[1]);
        }
        return Array.from(matches);
    }

    /**
     * Function to run wget command.
     * @param {string} url - The URL of the file to download.
     * @param {string} output - The output file name.
     * @returns {Promise<void>} - A promise that resolves when the download completes.
     */
    private async runWget(url: string, output: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const command = `wget -nv -O ${output} --header="User-Agent: ${this.USER_AGENT}" ${url}`;
            console.log(`Running command: ${command}`);
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`An error occurred while running the command: ${error.message}`);
                    reject(error);
                    return;
                }
                if (stderr) {
                    console.error(`Command stderr: ${stderr}`);
                    reject(new Error(stderr));
                    return;
                }
                console.log(`Command stdout: ${stdout}`);
                resolve();
            });
        });
    }

    /**
     * Downloads the specified version of YouTube APK.
     * @param {string} version - The version of YouTube to download.
     * @returns {Promise<void>} - A promise that resolves when the download completes.
     */
    public async downloadYouTubeApk(version: string): Promise<void> {
        console.log('Starting the download process for YouTube APK...');
        console.log(`Selected version: '${version}'`);

        const baseApk = 'com.google.android.youtube.apk';
        const versionWithDash = version.replace(/\./g, '-');
        const pageUrl = `https://www.apkmirror.com/apk/google-inc/youtube/youtube-${versionWithDash}-release/youtube-${versionWithDash}-android-apk-download/`;
        const downloadEndpointContains = `/apk/google-inc/youtube/youtube-${versionWithDash}-release/youtube-${versionWithDash}-android-apk-download/download/`;

        try {
            let data = await this.sendGetRequest(pageUrl);
            let hrefs = this.extractHrefs(data);
            let downloadUrl = hrefs.find(href => href.includes(downloadEndpointContains));
            if (!downloadUrl) {
                throw new Error(`Unable to find the download URL for version ${version}`);
            }
            downloadUrl = `https://www.apkmirror.com${downloadUrl}`;
            data = await this.sendGetRequest(downloadUrl);
            hrefs = this.extractHrefs(data);
            downloadUrl = hrefs.find(href => href.includes("/wp-content/themes/APKMirror/download.php"));
            if (!downloadUrl) {
                throw new Error(`Unable to find the final download URL for version ${version}`);
            }
            downloadUrl = `https://www.apkmirror.com${downloadUrl}`;
            await this.runWget(downloadUrl, baseApk);
            console.log(`Successfully downloaded YouTube version: ${version}`);
            console.log(`Download link: (${downloadUrl})`);
        } catch (error) {
            console.error(`An error occurred during the download process: ${(error as Error).message}`);
        }
    }
}