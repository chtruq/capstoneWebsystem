import { useState, useEffect } from "react";
import { signalRService } from "../../service/signalRService";
export const useSignalR = (token: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const connectToSignalR = async () => {
      try {
        await signalRService.startConnection(token);
        setIsConnected(true);
        setError(null);
      } catch (err) {
        setIsConnected(false);
        setError(
          err instanceof Error ? err.message : "Failed to connect to SignalR"
        );
      }
    };
    if (token) {
      connectToSignalR();
    }
    return () => {
      signalRService.stopConnection();
    };
  }, [token]);
  return { isConnected, error };
};
