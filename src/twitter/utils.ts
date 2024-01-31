import { TwitterMedia } from '../interfaces/TwitterMedia';

export function getDownloadUrl(media: TwitterMedia): string | undefined {
  if (media.type === 'photo') {
    if (!media.url) return undefined;
    const url = new URL(media.url);
    url.searchParams.set('name', 'large');
    return url.href;
  }

  if (media.type === 'video') {
    const variant = media.videoInfo?.variants
      ?.filter((i) => i.bitrate)
      ?.sort((a, b) => (a.bitrate || 0) - (b.bitrate || 0))
      ?.pop();
    return variant?.url;
  }
}
