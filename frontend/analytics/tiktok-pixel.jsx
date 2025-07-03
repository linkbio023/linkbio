import Script from "next/script";

export default function TiktokPixelIntegration() {
  return (
    <Script id="tiktok-pixel" strategy="afterInteractive">
      {`
            !function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"${process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID}"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)}(window,document,"script","https://s3.amazonaws.com/uet-tag/1.0.1/bundle.min.js","uetq");
        `}
    </Script>
  );
}
