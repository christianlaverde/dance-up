export default async function APIRequest( req, url, formData ) {
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  try {
    const response = await fetch(`${API_ENDPOINT}${url}`, {
      method: req,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    });

    console.log(formData)

    if (!response.ok) {
      throw new Error("Failed to add class");
    }

    alert("Class added successfully!");
  } catch (error) {
    console.error(error);
    alert("An error occurred while adding the class.");
  }
}
