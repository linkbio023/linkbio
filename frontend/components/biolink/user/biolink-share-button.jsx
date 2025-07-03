"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Linkedin, Link, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export function BiolinkShareButton() {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 mx-2">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Share this page</h4>
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" size="icon" asChild disabled={!url}>
              <a
                href={
                  url
                    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        url
                      )}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="h-4 w-4">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>X</title>
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </div>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild disabled={!url}>
              <a
                href={
                  url
                    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        url
                      )}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="h-4 w-4">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Facebook</title>
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                  </svg>
                </div>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild disabled={!url}>
              <a
                href={
                  url
                    ? `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        url
                      )}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              disabled={!url}
            >
              <Link className="h-4 w-4" />
            </Button>
          </div>
          {copied && <p className="text-sm text-green-600">Link copied!</p>}
        </div>
      </PopoverContent>
    </Popover>
  );
}
