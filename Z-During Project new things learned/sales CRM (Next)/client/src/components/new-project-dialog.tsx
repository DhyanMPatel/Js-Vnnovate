import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/user-context";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Client } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DocumentUpload } from "@/components/document-upload";

const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  clientId: z.string().min(1, "Client is required"),
  totalValue: z.string().min(1, "Total value is required"),
  estimationHours: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  documents: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
        uploadedAt: z.string(),
      })
    )
    .optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProjectDialog({
  open,
  onOpenChange,
}: NewProjectDialogProps) {
  const { toast } = useToast();
  const { currentUser } = useUser();

  const {
    data: clients = [],
    isLoading: clientsLoading,
    error: clientsError,
  } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/clients");
      return response.json(); // Parse the JSON response
    },
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      clientId: "",
      totalValue: "",
      estimationHours: "",
      startDate: "",
      endDate: "",
      description: "",
      documents: [],
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      clientId: string;
      totalValue: string;
      estimationHours?: string;
      startDate: string;
      endDate?: string;
      description?: string;
      documents?: { name: string; url: string; uploadedAt: string }[];
      assignedTo: string;
    }) => {
      return await apiRequest("POST", "/api/projects", data);
    },
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Project created",
        description: `${
          response.data?.name || "Project"
        } has been added to your projects.`,
      });
      form.reset();
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.message || "Failed to create project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    if (!currentUser) return;

    createProjectMutation.mutate({
      name: data.name,
      clientId: data.clientId,
      totalValue: data.totalValue,
      estimationHours: data.estimationHours || undefined,
      startDate: new Date(data.startDate).toISOString(),
      endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
      description: data.description || undefined,
      documents: data.documents || [],
      assignedTo: currentUser.id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new project for a client. Track milestones and payments.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Cloud Migration Project"
                      {...field}
                      data-testid="input-project-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={clientsLoading}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="select-client">
                        <SelectValue
                          placeholder={
                            clientsLoading
                              ? "Loading clients..."
                              : "Select client"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clientsLoading ? (
                        <div className="flex items-center justify-center p-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) : clients.length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          No clients yet. Convert leads to create clients.
                        </div>
                      ) : (
                        clients.map((client) => (
                          <SelectItem
                            key={client.id}
                            value={client.id}
                            data-testid={`option-client-${client.id}`}
                          >
                            {client.companyName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="totalValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Value ($) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="150000"
                        {...field}
                        data-testid="input-total-value"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimationHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimation Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.5"
                        placeholder="500"
                        {...field}
                        data-testid="input-estimation-hours"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        data-testid="input-start-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        data-testid="input-end-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <DocumentUpload
                    value={field.value}
                    onChange={field.onChange}
                    label="Upload SCOPE OF WORK document"
                    placeholder="Click to upload SCOPE OF WORK document or drag and drop"
                    accept=".pdf,.doc,.docx"
                    maxFiles={3}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add project details..."
                      className="min-h-24"
                      {...field}
                      data-testid="input-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createProjectMutation.isPending}
                data-testid="button-create-project"
              >
                {createProjectMutation.isPending
                  ? "Creating..."
                  : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
