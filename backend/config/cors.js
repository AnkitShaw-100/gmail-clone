// Enable CORS for frontend-backend connection
import cors from "cors";

export default cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true,
});
