# ReVanced Actions 🚀

Welcome to **ReVanced Actions**! This project automates the process of patching APKs using GitHub Actions. Every time the action runner is triggered, it produces a shiny new APK and creates a draft release in the repository with the assets. 🎉

## How It Works 🛠️

1. **Trigger the Action**: Whenever you push to the repository or manually trigger the workflow, the GitHub Action runner kicks into gear.
2. **Patch the APK**: The action patches the APK with the specified options from [`revanced-options.json`](revanced-options.json).
3. **Create a Draft Release**: The patched APK is then uploaded as an asset in a draft release in your repository.

## Configuration ⚙️

### revanced-options.json

This file contains the patch options for your APKs. Here's a snippet:

```json
[
    {
        "patchName": "Custom package name",
        "options": [
            {
                "key": "PackageNameYouTube",
                "value": "yt.rv.renamed"
            },
            {
                "key": "PackageNameYouTubeMusic",
                "value": "ytm.rv.renamed"
            }
        ]
    },
    {
        "patchName": "Settings for YouTube",
        "options": [
            {
                "key": "RVXSettingsMenuName",
                "value": "ReVanced Settings"
            }
        ]
    }
]
```

## GitHub Workflow

The workflow file is located at `.github/workflows/youtube.yaml`. It handles the entire process of patching and releasing the APK.

## Usage 🚀

1. **Fork the Repository**: `git clone https://github.com/yourusername/revanced-actions.git`
2. **Configure Your Patches**: Edit the `revanced-options.json` file to specify your patch options.
3. **Push Your Changes**: `git add . && git commit -m "Configured patches" && git push`
4. **Trigger the Action**: The GitHub Action will run automatically and create a draft release with your patched APK.

# Disclaimer ⚠️
> Disclaimer: The repository owners are not responsible for any damages or issues that arise from using this software. Use it at your own risk. We provide no warranties, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

# License 📜
This project is licensed under the MIT License. See the LICENSE file for details.

---

Happy patching! 🎉 If you have any questions or run into issues, feel free to open an issue or reach out to the community. We're here to help! 😊