// const backendURL = "http://localhost:5000"; // Update with your backend URL and port number

const getUserForAssigning = async () => {
  try {
    const response = await fetch("http://localhost:5000");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getUserForAssigning };
