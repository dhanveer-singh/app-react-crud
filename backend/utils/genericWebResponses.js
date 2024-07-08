export default function genericResponse(status, message, output) {
  try {
    return {
      Result_Status: status,
      Result_Message: message,
      Result_Output: output,
    };
  } catch (error) {
    console.error("Error in genericResponse", error);
  }
}
