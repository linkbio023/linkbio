import ViewUser from "@/components/users/view-user";

export default async function UserDetailsPage(props) {
  const params = await props.params;

  const {
    id
  } = params;

  return <ViewUser id={id} />;
}
