"use client";
import TableComponent from "@/components/shared/table";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { applicationUrls } from "@/constants/application-urls";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PaginationComponent from "@/components/shared/pagination-link";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import { UserSearch } from "lucide-react";
import { useSearchParams } from "next/navigation";
import AssignAdministrator from "@/components/administrator/assign-administrator";
import {
  useAdministratorCount,
  useAdministratorList,
} from "@/services/administrator-services";
import { administatorRoleName } from "@/lib/administator-role-name";

const faqQuestionsAndAnswers = [
  {
    question: "What are the administritive privileges of admin?",
    answer:
      "Admins have full access to all features and settings within the application. They can create, edit, and delete biolinks, manage users, and perform other administrative tasks.",
  },
  {
    question: "What are the administritive privileges of moderator?",
    answer:
      "Moderators have access to manage biolinks, users, and perform other administrative tasks. They can create, edit, and delete biolinks, manage users, and perform other administrative tasks.",
  },
  {
    question: "What are the administritive privileges of user?",
    answer:
      "Users have limited access to the application. They can create biolinks and manage their own account. Users can only view and share biolinks, and perform other administrative tasks.",
  },
  {
    question: "How can I change the role of an administrator?",
    answer:
      "To change the role of an administrator, go to the administrator details page and select the new role from the dropdown menu. The new role will be assigned to the administrator.",
  },
  {
    question: "How can I assign a new administrator?",
    answer:
      "To assign a new administrator, go to the administrator list page and enter the email address of the user. Then assign a role for the user. The user will be assigned as a new administrator with the selected role.",
  },
  {
    question: "How can I remove an admin or moderator?",
    answer:
      "Simply assign him as a user. It'll revoke all the administritive privileges from the user",
  },
];

function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqQuestionsAndAnswers.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            {faq?.question}
          </AccordionTrigger>
          <AccordionContent>{faq?.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function ActionButtons({ id }) {
  return (
    <div className="flex justify-end">
      <NavigateButton
        text={`Details`}
        path={`${applicationUrls.dashboard.manage.administrator.view}${id}`}
        icon={<UserSearch className="h-4 w-4" />}
      />
    </div>
  );
}

export default function AdministratorList() {
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams);
  const page = search.get("page") || 1;
  const params = `?page=${page}`;

  const { administratorList, isLoading, isValidating } =
    useAdministratorList(params);

  const { administratorCount, isLoading: administratorCountLoading } =
    useAdministratorCount();

  const columns = [
    { title: <div className="text-left">Name</div>, dataIndex: "name" },
    { title: <div className="text-center">Role</div>, dataIndex: "role" },
    { title: <div className="text-right">Action</div>, dataIndex: "action" },
  ];

  const dataSource = administratorList?.administratorList?.map(
    (administrator) => ({
      name: administrator.name,
      role: (
        <div className="text-center">
          {administatorRoleName(administrator.role)}
        </div>
      ),
      action: <ActionButtons id={administrator?.id} />,
    })
  );

  return (
    <Content
      title={"Administrator List"}
      extra={<BackButton />}
      isValidating={isValidating}
    >
      <div className="grid gap-4">
        {/* Administrator List */}
        <Card>
          <CardHeader className="flex flex-row gap-2 justify-between items-start">
            <div className="grid gap-2">
              <CardTitle>Administrator List</CardTitle>
              <CardDescription>View all administrators</CardDescription>
            </div>
            {/* Assign New Administrator */}
            <AssignAdministrator />
          </CardHeader>
          <CardContent>
            <TableComponent
              columns={columns}
              dataSource={dataSource}
              isLoading={isLoading}
            />
          </CardContent>
          <CardFooter>
            <PaginationComponent totalContent={administratorCount.count} />
          </CardFooter>
        </Card>
        {/* FAQ about the role provolages */}
        <Card>
          <CardHeader>
            <CardTitle>{`FAQ`}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <p className="text-sm">
                Some of the most frequently asked questions about administrator.
              </p>
              {/* FAQ Data */}
              <FAQ />
            </div>
          </CardContent>
        </Card>
      </div>
    </Content>
  );
}
