

export default function AboutContentPage() {
    const [language, setLanguage] = useState("en");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    const t =
    language === "es"
      ? es.aboutAdmin
      : language === "ja"
      ? ja.aboutAdmin
      : en.aboutAdmin;


    const handleDeleteClick = (id: number) => {
        setItemToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/about?id=${itemToDelete}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (data?.success) {
                toast.success(t?.toast?.success?.contentDeleted || "About content deleted successfully");
                setContent(null);
                setEditing(false);
                resetForm();
            } else {
                toast.error(t?.toast?.error?.deleteFailed || "Failed to delete content");
            }
        } catch (error) {
            console.error("Error deleting content:", error);
            toast.error(t?.toast?.error?.deleteError || "An error occurred while deleting");
        } finally {
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
            setLoading(false);
        }
    };

    return (
        {
            /* Alert Modal */
        }
        < AlertModal
            isOpen = { isDeleteModalOpen }
            onClose = {() => {
                setIsDeleteModalOpen(false);
                setItemToDelete(null);
            }
            }
            forAlert = {{
                type: "Confirmation",
                messageTitle: t?.modalPopup?.deleteConfirmationTitle || "Confirm Deletion",
                message:
                    t?.modalPopup?.deleteConfirmationMessage ||
                    "Are you sure you want to delete this case study? This action cannot be undone.",
                confirmText: t?.modalPopup?.delete || "Delete",
                cancelText: t?.modalPopup?.cancel || "Cancel",
                onConfirm: confirmDelete,
            }}
            size = "md"
        />;

);
}
