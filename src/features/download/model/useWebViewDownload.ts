import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { RESIZE_HANDLER_SCRIPT } from '@/shared/constants';

export function useWebViewDownload(uploadedImage: string | ArrayBuffer | null, backgroundImage: string) {
    const webViewDownload = async (): Promise<void> => {
        const zip = new JSZip();
        const webview = document.querySelector('#rendingPage') as HTMLElement;

        if (webview) {
            const clone = webview.cloneNode(true) as HTMLElement;

            const image = clone.querySelector('#rending') as HTMLImageElement;
            if (image) {
                image.src = uploadedImage ? uploadedImage.toString() : './promotionPage.jpeg';
            }

            // CSS 스타일을 포함하는 부분
            const styles = Array.from(document.styleSheets)
                .map((styleSheet: CSSStyleSheet) => {
                    try {
                        const rules = Array.from(styleSheet.cssRules)
                            .map((rule: CSSRule) => rule.cssText)
                            .join('\n');
                        return rules;
                    } catch (e) {
                        console.warn('Could not read CSS rules from stylesheet:', styleSheet);
                        return '';
                    }
                })
                .join('\n');

            const newInnerHTML = clone.innerHTML;

            const htmlTemplate = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
                <title>web view</title>
                <style>
                  ${styles}
                </style>
              </head>
              <body>
                ${newInnerHTML}
                <script src="./resizeHandler.js"></script>
              </body>
            </html>`;

            zip.file('webview.html', htmlTemplate);
            zip.file('resizeHandler.js', RESIZE_HANDLER_SCRIPT);

            const imageSrc = uploadedImage ? uploadedImage.toString() : backgroundImage;
            fetch(imageSrc)
                .then((response) => response.blob())
                .then((blob) => {
                    zip.file('promotionPage.jpeg', blob, { binary: true });
                    return zip.generateAsync({ type: 'blob' });
                })
                .then((content) => {
                    saveAs(content, 'webview.zip');
                });
        }
    };

    return { webViewDownload };
}
