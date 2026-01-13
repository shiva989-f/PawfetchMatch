export const createPost = async (req, res) => {
  try {
    console.log(req);
    res.status(200).send("Hello");
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};
