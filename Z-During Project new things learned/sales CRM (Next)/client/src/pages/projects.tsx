import { useState } from "react";
import {
  Plus,
  DollarSign,
  CheckCircle2,
  Circle,
  MoreVertical,
  Loader2,
  Trash2,
  Edit,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { NewProjectDialog } from "@/components/new-project-dialog";
import { NewChangeRequestDialog } from "@/components/new-change-request-dialog";
import { EditChangeRequestDialog } from "@/components/edit-change-request-dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUser } from "@/contexts/user-context";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type {
  Project,
  Milestone,
  Payment,
  Client,
  User as UserType,
  ChangeRequest,
} from "@shared/schema";
import { EditProjectDialog } from "@/components/edit-project-dialog";

export default function Projects() {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  const [newChangeRequestDialogOpen, setNewChangeRequestDialogOpen] =
    useState(false);
  const [deleteChangeRequestId, setDeleteChangeRequestId] = useState<
    string | null
  >(null);
  const [editingChangeRequest, setEditingChangeRequest] =
    useState<ChangeRequest | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  const { data: projects = [], isLoading: projectsLoading } = useQuery<
    Project[]
  >({
    queryKey: ["/api/projects"],
  });

  const { data: milestones = [] } = useQuery<Milestone[]>({
    queryKey: ["/api/milestones"],
  });

  const { data: payments = [] } = useQuery<Payment[]>({
    queryKey: ["/api/payments"],
  });

  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const { data: users = [] } = useQuery<UserType[]>({
    queryKey: ["/api/users"],
  });

  const { data: changeRequests = [] } = useQuery<ChangeRequest[]>({
    queryKey: ["/api/change-requests"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/change-requests/${id}`, {
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/change-requests"] });
      toast({
        title: "Success",
        description: "Change request status updated",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    },
  });

  const deleteChangeRequestMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/change-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/change-requests"] });
      setDeleteChangeRequestId(null);
      toast({
        title: "Success",
        description: "Change request deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete change request",
        variant: "destructive",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setDeleteProjectId(null);
      toast({
        title: "Success",
        description: "Project and all related data deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client?.companyName || "Unknown Client";
  };

  const getProjectMilestones = (projectId: string) => {
    return milestones.filter((m) => m.projectId === projectId);
  };

  const getProjectPayments = (projectId: string) => {
    return payments.filter((p) => p.projectId === projectId);
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const getTotalPaid = (projectId: string) => {
    const projectPayments = getProjectPayments(projectId);
    return projectPayments.reduce(
      (sum, payment) => sum + parseFloat(payment.amount),
      0
    );
  };

  const getProgressPercentage = (projectId: string) => {
    const projectMilestones = getProjectMilestones(projectId);
    if (projectMilestones.length === 0) return 0;
    const completed = projectMilestones.filter((m) => m.isCompleted).length;
    return (completed / projectMilestones.length) * 100;
  };

  const getProjectChangeRequests = (projectId: string) => {
    return changeRequests.filter((cr) => cr.projectId === projectId);
  };

  const getTotalChangeRequestHours = (projectId: string) => {
    const projectCRs = getProjectChangeRequests(projectId);
    const approvedCRs = projectCRs.filter((cr) => cr.status === "approved");
    return approvedCRs.reduce((sum, cr) => sum + parseFloat(cr.hours), 0);
  };

  const getTotalChangeRequestCost = (projectId: string) => {
    const projectCRs = getProjectChangeRequests(projectId);
    const approvedCRs = projectCRs.filter((cr) => cr.status === "approved");
    return approvedCRs.reduce((sum, cr) => sum + parseFloat(cr.cost || "0"), 0);
  };

  if (projectsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2
          className="h-8 w-8 animate-spin text-muted-foreground"
          data-testid="loader-projects"
        />
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    active: "bg-green-500/10 text-green-700 dark:text-green-400",
    completed: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    "on-hold": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Projects</h1>
          <p className="text-sm text-muted-foreground">
            {projects.length} total projects
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => setNewProjectDialogOpen(true)}
          data-testid="button-new-project"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Project Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {projects
                .reduce(
                  (sum, p) =>
                    sum + (p.totalValue ? parseFloat(p.totalValue) : 0),
                  0
                )
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Received
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {projects
                .reduce((sum, p) => sum + getTotalPaid(p.id), 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Circle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {projects
                .reduce((sum, p) => {
                  const totalValue = p.totalValue
                    ? parseFloat(p.totalValue)
                    : 0;
                  const crCost = getTotalChangeRequestCost(p.id);
                  const totalProjectCost = totalValue + crCost;
                  const totalPaid = getTotalPaid(p.id);
                  return sum + (totalProjectCost - totalPaid);
                }, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>CR Cost</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Balance</TableHead>
                {/* <TableHead>Progress</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => {
                const totalValue = project.totalValue
                  ? parseFloat(project.totalValue)
                  : 0;
                const crCost = getTotalChangeRequestCost(project.id);
                const totalProjectCost = totalValue + crCost;
                const totalPaid = getTotalPaid(project.id);
                const balance = totalProjectCost - totalPaid;
                const progress = getProgressPercentage(project.id);

                return (
                  <TableRow
                    key={project.id}
                    data-testid={`row-project-${project.id}`}
                  >
                    <TableCell className="font-medium">
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-medium hover:underline"
                        onClick={() => handleViewDetails(project)}
                        data-testid={`link-project-name-${project.id}`}
                      >
                        {project.name}
                      </Button>
                    </TableCell>
                    <TableCell>{getClientName(project.clientId)}</TableCell>
                    <TableCell>${totalValue.toLocaleString()}</TableCell>
                    <TableCell className="text-blue-600 dark:text-blue-400">
                      $
                      {getTotalChangeRequestCost(project.id).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}
                    </TableCell>
                    <TableCell className="text-green-600 dark:text-green-400">
                      ${totalPaid.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-orange-600 dark:text-orange-400">
                      ${balance.toLocaleString()}
                    </TableCell>
                    {/* <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={progress} className="h-2 w-20" />
                        <span className="text-xs text-muted-foreground">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </TableCell> */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusColors[project.status]}
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            data-testid={`button-actions-${project.id}`}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(project)}
                            data-testid={`button-view-details-${project.id}`}
                          >
                            View Details
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem>Edit Project</DropdownMenuItem> */}
                          <DropdownMenuItem
                            onClick={() => setEditingProject(project)}
                            data-testid={`button-edit-project-${project.id}`}
                          >
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteProjectId(project.id)}
                            className="text-red-600"
                            data-testid={`button-delete-project-${project.id}`}
                          >
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Project Details Dialog */}
      {selectedProject && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProject.name}</DialogTitle>
              <DialogDescription>
                {selectedProject.description ||
                  "Project details, milestones, and payments"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Financial Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Value:</span>
                      <span className="font-medium">
                        $
                        {(selectedProject.totalValue
                          ? parseFloat(selectedProject.totalValue)
                          : 0
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Approved CR Cost:
                      </span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        $
                        {getTotalChangeRequestCost(
                          selectedProject.id
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-2">
                      <span className="text-muted-foreground">
                        Total Project Cost:
                      </span>
                      <span className="font-bold">
                        $
                        {(
                          (selectedProject.totalValue
                            ? parseFloat(selectedProject.totalValue)
                            : 0) + getTotalChangeRequestCost(selectedProject.id)
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Total Received:
                      </span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        ${getTotalPaid(selectedProject.id).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-2">
                      <span className="text-muted-foreground">
                        Balance Due:
                      </span>
                      <span className="font-bold text-orange-600 dark:text-orange-400">
                        $
                        {(
                          (selectedProject.totalValue
                            ? parseFloat(selectedProject.totalValue)
                            : 0) +
                          getTotalChangeRequestCost(selectedProject.id) -
                          getTotalPaid(selectedProject.id)
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Milestones:</span>
                      <span className="font-medium">
                        {
                          getProjectMilestones(selectedProject.id).filter(
                            (m) => m.isCompleted
                          ).length
                        }
                        /{getProjectMilestones(selectedProject.id).length}
                      </span>
                    </div>
                    <Progress
                      value={getProgressPercentage(selectedProject.id)}
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        variant="outline"
                        className={statusColors[selectedProject.status]}
                      >
                        {selectedProject.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card> */}
              </div>

              {/* Project Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Project Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Initial Estimation:
                    </span>
                    <span className="font-medium">
                      {selectedProject.estimationHours
                        ? parseFloat(selectedProject.estimationHours).toFixed(1)
                        : "0.0"}{" "}
                      hours
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Change Requests:
                    </span>
                    <span className="font-medium">
                      {getTotalChangeRequestHours(selectedProject.id).toFixed(
                        1
                      )}{" "}
                      hours
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-muted-foreground">Total Hours:</span>
                    <span className="font-bold">
                      {(
                        (selectedProject.estimationHours
                          ? parseFloat(selectedProject.estimationHours)
                          : 0) + getTotalChangeRequestHours(selectedProject.id)
                      ).toFixed(1)}{" "}
                      hours
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              {selectedProject.documents &&
                selectedProject.documents.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Scope of Work Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedProject.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-md border"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {doc.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Uploaded{" "}
                                  {new Date(
                                    doc.uploadedAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Create a temporary link to download the file
                                const link = document.createElement("a");
                                link.href = doc.url;
                                link.download = doc.name;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* Change Requests */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
                  <CardTitle className="text-sm">Change Requests</CardTitle>
                  <Button
                    size="sm"
                    onClick={() => setNewChangeRequestDialogOpen(true)}
                    data-testid="button-new-change-request"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    New Change Request
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getProjectChangeRequests(selectedProject.id).length > 0 ? (
                      getProjectChangeRequests(selectedProject.id).map((cr) => (
                        <div
                          key={cr.id}
                          className="flex items-start justify-between p-3 rounded-md border"
                          data-testid={`change-request-item-${cr.id}`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <p className="font-medium truncate max-w-[200px]">
                                {cr.name}
                              </p>
                              <div className="flex items-center gap-2">
                                <Select
                                  value={cr.status}
                                  onValueChange={(status) =>
                                    updateStatusMutation.mutate({
                                      id: cr.id,
                                      status,
                                    })
                                  }
                                >
                                  <SelectTrigger
                                    className={`w-36 ${
                                      cr.status === "approved"
                                        ? "border-green-500 text-green-600 dark:text-green-400"
                                        : cr.status === "rejected"
                                        ? "border-red-500 text-red-600 dark:text-red-400"
                                        : "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                                    }`}
                                    data-testid={`input-status-${cr.id}`}
                                  >
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="approved">
                                      Approved
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                      Rejected
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                {currentUser &&
                                  (currentUser.role === "Admin" ||
                                    currentUser.role === "Sales Head") && (
                                    <>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() =>
                                          setEditingChangeRequest(cr)
                                        }
                                        data-testid={`button-edit-cr-${cr.id}`}
                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() =>
                                          setDeleteChangeRequestId(cr.id)
                                        }
                                        data-testid={`button-delete-cr-${cr.id}`}
                                        className="text-destructive hover:text-destructive"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
                              </div>
                            </div>
                            {cr.description && (
                              <p className="text-xs text-muted-foreground mb-1 truncate max-w-[300px]">
                                {cr.description}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {parseFloat(cr.hours).toFixed(1)} hours • $
                              {parseFloat(cr.cost || "0").toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              • Created:{" "}
                              {new Date(cr.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No change requests yet.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Others */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-medium">
                    {getClientName(selectedProject.clientId)}
                  </p>
                </div>
                {selectedProject.startDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">
                      {new Date(selectedProject.startDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {selectedProject.endDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">
                      {new Date(selectedProject.endDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Project Dialog */}
      <NewProjectDialog
        open={newProjectDialogOpen}
        onOpenChange={setNewProjectDialogOpen}
      />

      {/* Edit Project Dialog */}
      <EditProjectDialog
        open={!!editingProject}
        onOpenChange={(open) => !open && setEditingProject(null)}
        project={editingProject!}
      />
      {selectedProject && currentUser && (
        <NewChangeRequestDialog
          open={newChangeRequestDialogOpen}
          onOpenChange={setNewChangeRequestDialogOpen}
          projectId={selectedProject?.id || ""}
          currentUserId={currentUser?.id || ""}
        />
      )}
      {editingChangeRequest && (
        <EditChangeRequestDialog
          open={!!editingChangeRequest}
          onOpenChange={(open) => !open && setEditingChangeRequest(null)}
          changeRequest={{
            ...editingChangeRequest,
            hours: parseFloat(editingChangeRequest.hours) || 0,
            cost: parseFloat(editingChangeRequest.cost) || 0,
          }}
          projectId={selectedProject?.id || ""}
          currentUserId={currentUser?.id || ""}
        />
      )}

      {/* Delete Change Request */}
      <AlertDialog
        open={!!deleteChangeRequestId}
        onOpenChange={(open) => !open && setDeleteChangeRequestId(null)}
      >
        <AlertDialogContent data-testid="dialog-confirm-delete-cr">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Change Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this change request? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-cr">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteChangeRequestId &&
                deleteChangeRequestMutation.mutate(deleteChangeRequestId)
              }
              disabled={deleteChangeRequestMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete-cr"
            >
              {deleteChangeRequestMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete project */}
      <AlertDialog
        open={!!deleteProjectId}
        onOpenChange={(open) => !open && setDeleteProjectId(null)}
      >
        <AlertDialogContent data-testid="dialog-confirm-delete-project">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot
              be undone and will also delete all associated milestones,
              payments, and change requests.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-project">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteProjectId && deleteProjectMutation.mutate(deleteProjectId)
              }
              disabled={deleteProjectMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete-project"
            >
              {deleteProjectMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
