import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const DialogDiv = ({ row, imageUrl, selectedDialog, setSelectedDialog }) => {
  return (
    <>
      {/* Provide Pop up on Image click */}
      <span className="flex items-center">
        <span className="w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
          {!imageUrl.includes("dummyImage.jpg") ? (
            <button
              className="shadow-lg hover:shadow-sm w-10 h-10 rounded-full "
              onClick={() => {
                return setSelectedDialog(row.row.original.id);
              }}
            >
              <img
                src={imageUrl}
                alt=""
                className="object-cover w-full h-full rounded-full "
              />
            </button>
          ) : (
            <div className="rounded-full shadow-lg">
              <img
                src={imageUrl}
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          )}
          <Dialog
            className=""
            open={selectedDialog === row.row.original.id}
            onClose={() => setSelectedDialog(null)}
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "800px",
                },
              },
            }}
          >
            <DialogTitle>{row.row.original.name}</DialogTitle>
            <DialogContent className="grid grid-cols-2 gap-4 ">
              {row.cell.value.map((imgUrl) => (
                <div className="">
                  <img
                    src={`http://localhost:3000/uploads/${imgUrl}`}
                    alt=""
                    className="object-cover w-full rounded-[10px] shadow-lg overflow-hidden"
                  />
                </div>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedDialog(null)} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </span>
      </span>
    </>
  );
};

export default DialogDiv;
