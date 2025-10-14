import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateOrgForm from "./CreateOrgForm";
import { Plus } from "lucide-react";

export default function CreateOrgButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <Plus /> Create Organization
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create your organization</SheetTitle>
          <SheetDescription>
            Fill up the information of your organization here. Click save when
            you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <CreateOrgForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
