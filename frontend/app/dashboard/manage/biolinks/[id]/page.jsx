import BiolinkDetails from "@/components/biolink/administrator/biolink-details";

export default async function BioLinkDetailsPage(props) {
  const params = await props.params;

  const {
    id
  } = params;

  return <BiolinkDetails id={id} />;
}
