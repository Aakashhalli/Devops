import FORM from "../model/contact.js";

const saveForm = async (req, res) => {
  const { name, phone, email, description } = req.body;
  console.log("/api/contact/form");

  if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
    return res.status(400).json({ error: "Invalid name provided." });
  }
  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number provided." });
  }
  if (
    !email ||
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
  ) {
    return res.status(400).json({ error: "Invalid email address provided." });
  }

  try {
    const newForm = new FORM({
      name,
      phone,
      email,
      description,
    });

    await newForm.save();

    return res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error while submitting the form:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default saveForm;
