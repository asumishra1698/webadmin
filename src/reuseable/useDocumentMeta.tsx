import { useEffect } from "react";

interface DocumentMetaProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
}

export function useDocumentMeta({ title, description, canonicalUrl }: DocumentMetaProps): void {
  useEffect(() => {
    const defaultTitle = document.title;
    document.title = title;

    let metaDescription = document.querySelector("meta[name='description']") as HTMLMetaElement | null;
    if (!metaDescription && description) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    if (metaDescription && description) {
      metaDescription.setAttribute("content", description);
    }

    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonicalLink && canonicalUrl) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    if (canonicalLink && canonicalUrl) {
      canonicalLink.setAttribute("href", canonicalUrl);
    }

    return () => {
      document.title = defaultTitle;
      if (metaDescription && description) {
        metaDescription.setAttribute("content", "");
      }
    };
  }, [title, description, canonicalUrl]);
}