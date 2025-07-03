import TableComponent from "@/components/shared/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TableChart({
  title,
  description,
  dataSource,
  columns,
  isLoading,
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-scroll">
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
