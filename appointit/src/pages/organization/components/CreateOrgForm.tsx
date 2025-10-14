import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { useContext, useState } from "react";
import { Button } from "../../../components/ui/button";
import { useCreateOrganization } from "@/hooks/useCreateOrganization";
import type { Organization } from "@/types/types";
import { Loader } from "../../../components/ui/loader";
import { AuthContext } from "@/providers/AuthProvider";

export default function CreateOrgForm() {
  const { user } = useContext(AuthContext);
  console.log("User:", user);
  const { createOrganization, isPending } = useCreateOrganization();
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const [data, setData] = useState({
    user_id: 0,
    name: "",
    description: "",
    email: "",
    contact_number: "",
    address: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    try {
      await createOrganization({ ...data, user_id: user?.id } as Organization);
    } catch (error: any) {
      if (error && typeof error === "object" && !Array.isArray(error)) {
        setErrors(error);
      } else {
        setErrors({ general: [error?.message || "Something went wrong"] });
      }
      console.log("Error creating org: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pb-4">
        <Label className="pb-2" htmlFor="name">
          Name
        </Label>
        {errors?.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name[0]}</p>
        )}
        <Input
          type="text"
          id="name"
          placeholder="John Doe"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className={errors?.name ? "border-red-500" : ""}
          required
        />
      </div>
      <div className="pb-4">
        <Label className="pb-2" htmlFor="email">
          Email
        </Label>
        {errors?.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email[0]}</p>
        )}
        <Input
          type="email"
          id="email"
          placeholder="jd@example.com"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className={errors?.email ? "border-red-500" : ""}
          required
        />
      </div>
      <div className="pb-4">
        <Label className="pb-2" htmlFor="contact-no">
          Contact #
        </Label>
        <Input
          type="text"
          id="contact_number"
          placeholder="0912-3XX-XXXX"
          value={data.contact_number}
          onChange={(e) => setData({ ...data, contact_number: e.target.value })}
        />
      </div>
      <div className="pb-4">
        <Label className="pb-2" htmlFor="address">
          Address
        </Label>
        <Input
          type="text"
          id="address"
          placeholder="The address of your organization"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
      </div>
      <div className="pb-4">
        <Label className="pb-2" htmlFor="description">
          Description (optional)
        </Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder="Describe your organization"
        />
      </div>

      <Button type="submit" className="w-full mt-4 cursor-pointer">
        {isPending ? <Loader /> : "Submit"}
      </Button>
    </form>
  );
}
