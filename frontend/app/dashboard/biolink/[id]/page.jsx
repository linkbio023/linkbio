import BioLinkUpdate from "@/components/biolink/user/biolink-update";

export default async function BiolinkUpdatePage(props) {
  const params = await props.params;

  const {
    id
  } = params;

  return <BioLinkUpdate id={id} />;
}
