import ViewAdministrator from "@/components/administrator/view-administrator";

export default async function ViewAdministratorPage(props) {
  const params = await props.params;

  const {
    id
  } = params;

  return <ViewAdministrator id={id} />;
}
