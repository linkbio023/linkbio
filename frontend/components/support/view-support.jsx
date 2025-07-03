"use client";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormatter } from "@/lib/date/date-formatter";
import { useViewSupport } from "@/services/support-services";
import DescriptionItem from "@/components/shared/description-item";

export default function ViewSupport({ id }) {
  const { supportData, isLoading, isValidating } = useViewSupport(id);

  return (
    <Content
      title={`Support Request Details`}
      isValidating={isValidating}
      isLoading={isLoading}
      extra={<BackButton />}
    >
      <Card>
        <CardHeader>
          <CardTitle>{supportData?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mt-4">
            <div className="grid gap-2 md:grid-cols-3">
              <DescriptionItem
                label="Status"
                data={supportData.status == "open" ? "Open" : "Closed"}
              />
              <DescriptionItem
                label="Created At"
                data={dateFormatter(supportData.createdAt)}
              />
              <DescriptionItem
                label="Last Updated"
                data={dateFormatter(supportData.updatedAt)}
              />
            </div>
            <DescriptionItem label="Details" data={supportData.details} />
          </div>
        </CardContent>
      </Card>
    </Content>
  );
}
