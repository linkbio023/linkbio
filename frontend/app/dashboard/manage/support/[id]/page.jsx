import AdminViewSupport from "@/components/support/admin/view-support";

export default async function AdminSupportViewPage(props) {
  const params = await props.params;

  const {
    id
  } = params;

  return <AdminViewSupport id={id} />;
}
