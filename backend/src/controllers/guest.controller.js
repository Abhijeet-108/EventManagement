import Guest from "../models/guestlist.model.js";

const addGuest = async (req, res) => {
    try {
        const guest = await Guest.create({
        userId: req.user.id,
        ...req.body
        });

        res.json(guest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateGuest = async (req, res) => {
    try {
        const guest = await Guest.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );

        res.json(guest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteGuest = async (req, res) => {
    try {
        await Guest.findByIdAndDelete(req.params.id);
        res.json({ message: "Guest deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { addGuest, updateGuest, deleteGuest };