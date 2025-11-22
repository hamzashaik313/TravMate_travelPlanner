"use client";

import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

/**
 * Connects to Spring /ws and listens for join-request notifications
 * for the owner: topic = /topic/trip/{ownerEmailLower}
 */
export function useTripNotifications(userEmail?: string) {
  useEffect(() => {
    if (!userEmail) return;

    const stomp = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws") as any,
      reconnectDelay: 5000,
      onConnect: () => {
        const topic = `/topic/trip/${userEmail.toLowerCase()}`;
        stomp.subscribe(topic, (msg: IMessage) => {
          try {
            const data = JSON.parse(msg.body) as {
              requestId: number;
              tripTitle: string;
              senderEmail: string;
            };

            // keep it simple: alert + let owner open the Requests panel
            alert(
              `New join request for "${data.tripTitle}" from ${data.senderEmail}`
            );
          } catch (e) {
            console.error("WS parse error", e);
          }
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error", frame);
      },
    });

    stomp.activate();
    return () => {
      stomp.deactivate().catch(() => {});
    };
  }, [userEmail]);
}
