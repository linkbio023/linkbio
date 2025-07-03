import ViewSupport from "@/components/support/view-support";

export default async function SupportViewPage(props) {
  const params = await props.params;

  const {
    id
  } = params;

  return <ViewSupport id={id} />;
}
