"use client";
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { toast } from "sonner";

export default function NotificationsProvider() {
  useEffect(() => {
    const socketFactory = () =>
      new SockJS(`${process.env.NEXT_PUBLIC_WS_BASE}/ws`);
    const client = new Client({
      webSocketFactory: socketFactory,
      reconnectDelay: 5000,
      debug: (str) => console.log("🟢 STOMP:", str),
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        client.subscribe("/user/queue/notify", (message) => {
          const data = JSON.parse(message.body);
          console.log("📩 Notification:", data);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      },
    });

    client.activate();

    // ✅ synchronous cleanup
    return () => {
      console.log("🔴 Disconnecting...");
      client.deactivate();
    };
  }, []);

  return null;
}
