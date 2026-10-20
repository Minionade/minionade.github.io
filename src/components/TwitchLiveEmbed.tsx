import { useEffect, useState } from 'react';

const LIVE_STATUS_URL = 'https://decapi.me/twitch/uptime/minionade';

export function TwitchLiveEmbed({ isDarkMode }: { isDarkMode: boolean }) {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: number | undefined;

    const checkLiveStatus = async () => {
      try {
        const response = await fetch(LIVE_STATUS_URL, { cache: 'no-store' });
        if (!response.ok) throw new Error('Unable to check Twitch status');
        const status = (await response.text()).trim();
        if (isMounted) setIsLive(Boolean(status) && !/offline|not streaming|not live|error|unknown/i.test(status));
      } catch {
        if (isMounted) setIsLive(false);
      } finally {
        if (isMounted) timeoutId = window.setTimeout(checkLiveStatus, 60_000);
      }
    };

    void checkLiveStatus();
    return () => {
      isMounted = false;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!isLive) return null;

  return (
    <section className="landing-twitch-embed" aria-labelledby="twitch-live-heading">
      <h3 id="twitch-live-heading" className="mb-3 text-xl font-medium">
        Live on Twitch
      </h3>
      <div className={`aspect-video w-full overflow-hidden rounded-xl border ${isDarkMode ? 'border-slate-700' : 'border-stone-300'}`}>
        <iframe
          src="https://player.twitch.tv/?channel=minionade&parent=minionade.github.io&autoplay=true&muted=true"
          title="Minionade live on Twitch"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
