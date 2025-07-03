import Content from "@/components/dashboard/content";
import MediaLibrary from "@/components/media/media-library";
import BackButton from "@/components/shared/buttons/back-button";

export default function MediaPage() {
  return (
    <Content title="Media" extra={<BackButton />}>
      <MediaLibrary />
    </Content>
  );
}
