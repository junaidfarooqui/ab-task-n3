export function extractTextFromRichText(richTextNode: any, limit?: number): string {
    let result = '';
    let charCount = 0;
    const hasLimit = typeof limit === 'number';

    function traverse(node: any) {
        if (node.nodeType === 'text') {
            if (hasLimit) {
                const remainingChars = limit - charCount;
                if (remainingChars <= 0) {
                    return;
                }

                const textToAdd = node.value.slice(0, remainingChars);
                result += textToAdd;
                charCount += textToAdd.length;
            } else {
                result += node.value;
            }
        } else if (node.content) {
            for (let i = 0; i < node.content.length; i++) {
                if (hasLimit && charCount >= limit) {
                    break;
                }
                traverse(node.content[i]);
            }
        }
    }

    traverse(richTextNode);
    return result;
}

export function getImageUrl(article: any, assets: any) {
    const imageId = article.fields.featuredImage.sys.id;
    const asset = assets.find((asset: any) => asset.sys.id === imageId);
    return asset ? asset.fields.file.url : '';
}