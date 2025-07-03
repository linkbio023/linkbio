import PublicView from "@/components/biolink/public-view";

export default async function BioLinkViewPage(props) {
  const params = await props.params;
  return <PublicView username={params?.username} />;
}
