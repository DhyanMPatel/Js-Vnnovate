async function handleFileUpload(req, res) {
    try {
        const {message, file} = req.body;
        
        res.json({ message: "File uploaded successfully", data: { message, file } });
    } catch (error) {
        res.status(400).json({ message: "Invalid data", error: error.message });
    }
}