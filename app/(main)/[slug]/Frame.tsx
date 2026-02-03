"use client";

import { Ref, useEffect, useRef, useState } from "react";
import { Browser } from "./Browser";

const PARENT_ORIGIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://next-16-recipes.vercel.app";

export function Frame({ initialSrc }: { initialSrc: string }) {
  const [reset, setReset] = useState(0);
  const [src, setSrc] = useState(initialSrc);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // 1) Verify the sender origin
      if (event.origin !== PARENT_ORIGIN) return;

      // 2) Verify payload shape/type
      const data = event.data;
      if (!data || data.type !== "iframe:location-change") return;

      setSrc(event.data.url);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex grow">
      <Browser url={src} onRefresh={() => setReset((c) => c + 1)}>
        <IFrame initialSrc={src} ref={iframeRef} key={reset} />
      </Browser>
    </div>
  );
}

function IFrame({
  initialSrc,
  ref,
}: {
  initialSrc: string;
  ref: Ref<HTMLIFrameElement>;
}) {
  const [_src] = useState(initialSrc);

  return <iframe ref={ref} src={_src} className="m-0 h-full w-full" />;
}
