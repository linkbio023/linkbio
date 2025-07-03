import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export default function TableComponent({ dataSource, columns, isLoading }) {
  // dataSource is an array of objects where each object represents a row in the table
  // columns is an array of objects where each object represents a column in the table
  // isLoading is a boolean that indicates if the table is loading data

  // If isLoading is true, return a loading spinner in table body
  function TableBodyLoading() {
    return (
      <TableRow>
        <TableCell colSpan={columns.length}>
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  // if (!dataSource || !columns) return null;

  // If dataSource is empty, return a message in table body
  function TableBodyEmpty() {
    return (
      <TableRow>
        <TableCell colSpan={columns?.length}>No data found.</TableCell>
      </TableRow>
    );
  }

  return (
    <div className="grid relative w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns?.map((column, index) => (
              <TableHead key={index}>{column?.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <TableBodyLoading />}
          {!isLoading && dataSource?.length === 0 && <TableBodyEmpty />}
          {!isLoading &&
            dataSource?.map((data, index) => (
              <TableRow key={index}>
                {columns?.map((column, index) => (
                  <TableCell key={index}>{data[column?.dataIndex]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
