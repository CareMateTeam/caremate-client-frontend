"use client";

import React, { useMemo, useState } from "react";

type ChatMessage = {
  id: string;
  sender: "me" | "caregiver" | "system";
  text: string;
  time: string;
};

type ChatRoom = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen: string;
  unread: number;
};

const chatRoom: ChatRoom = {
  id: "room-1",
  name: "คุณมะลิ",
  role: "Caregiver ผู้สูงอายุ",
  avatar: "ม",
  status: "online",
  lastSeen: "กำลังออนไลน์",
  unread: 2,
};

const initialMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "system",
    text: "เริ่มต้นการสนทนากับผู้ดูแล CareMate",
    time: "วันนี้",
  },
  {
    id: "msg-2",
    sender: "caregiver",
    text: "สวัสดีค่ะคุณ Gabel วันนี้ต้องการให้ช่วยดูแลเรื่องอะไรเป็นพิเศษไหมคะ",
    time: "09:30",
  },
  {
    id: "msg-3",
    sender: "me",
    text: "อยากให้ช่วยดูแลคุณพ่อช่วงบ่ายครับ พอดีท่านเดินไม่ค่อยสะดวก",
    time: "09:32",
  },
  {
    id: "msg-4",
    sender: "caregiver",
    text: "ได้เลยค่ะ เดี๋ยวขอทราบอาการเบื้องต้นเพิ่มเติมนิดนึงนะคะ มีโรคประจำตัวหรือยาที่ต้องทานตามเวลาไหมคะ",
    time: "09:33",
  },
  {
    id: "msg-5",
    sender: "me",
    text: "มีเบาหวานครับ ต้องเตือนทานยาหลังอาหาร",
    time: "09:34",
  },
  {
    id: "msg-6",
    sender: "caregiver",
    text: "รับทราบค่ะ เดี๋ยวหนูจะช่วยเตือนเรื่องยา ดูแลการเดิน และรายงานอัปเดตให้เป็นระยะนะคะ",
    time: "09:35",
  },
];

const quickReplies = [
  "ขออัปเดตอาการหน่อยครับ",
  "กำลังเดินทางไปนะครับ",
  "ช่วยเตือนทานยาด้วยครับ",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [message, setMessage] = useState("");

  const lastMessage = useMemo(() => {
    const normalMessages = messages.filter((item) => item.sender !== "system");
    return normalMessages[normalMessages.length - 1];
  }, [messages]);

  const handleSend = (text?: string) => {
    const value = (text ?? message).trim();

    if (!value) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text: value,
      time: "ตอนนี้",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    window.setTimeout(() => {
      const reply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: "caregiver",
        text: "รับทราบค่ะ เดี๋ยวหนูช่วยดูแลและอัปเดตให้เรื่อย ๆ นะคะ",
        time: "ตอนนี้",
      };

      setMessages((prev) => [...prev, reply]);
    }, 700);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4">
      <section className="rounded-[2rem] border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 text-xl font-extrabold text-white shadow-md shadow-cyan-100">
              {chatRoom.avatar}
            </div>

            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-400" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="truncate text-xl font-extrabold text-slate-950">
                  แชทกับ {chatRoom.name}
                </h1>
                <p className="mt-1 truncate text-sm text-slate-500">
                  {chatRoom.role}
                </p>
              </div>

              <button
                type="button"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-lg text-cyan-700"
              >
                ☎️
              </button>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-600">
                {chatRoom.lastSeen}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">การจองล่าสุด</h2>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
            Confirmed
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoCard label="วันที่" value="27 พ.ค. 2026" />
          <InfoCard label="เวลา" value="12:00 - 16:00" />
          <InfoCard label="บริการ" value="ดูแลที่บ้าน" />
          <InfoCard label="สถานะ" value="รอเริ่มงาน" />
        </div>
      </section>

      <section className="flex min-h-[460px] flex-col rounded-[2rem] border border-white/80 bg-white/80 shadow-sm backdrop-blur">
        <div className="border-b border-slate-100 px-4 py-3">
          <p className="text-sm font-bold text-slate-950">ข้อความ</p>
          <p className="mt-1 truncate text-xs text-slate-500">
            ล่าสุด: {lastMessage?.text}
          </p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((item) => {
            if (item.sender === "system") {
              return (
                <div key={item.id} className="flex justify-center">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                    {item.text}
                  </span>
                </div>
              );
            }

            const isMe = item.sender === "me";

            return (
              <div
                key={item.id}
                className={["flex", isMe ? "justify-end" : "justify-start"].join(
                  " "
                )}
              >
                <div
                  className={[
                    "max-w-[78%] rounded-3xl px-4 py-3 shadow-sm",
                    isMe
                      ? "rounded-br-md bg-cyan-500 text-white"
                      : "rounded-bl-md bg-slate-100 text-slate-800",
                  ].join(" ")}
                >
                  <p className="text-sm leading-6">{item.text}</p>
                  <p
                    className={[
                      "mt-1 text-right text-[11px]",
                      isMe ? "text-cyan-50" : "text-slate-400",
                    ].join(" ")}
                  >
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-slate-100 p-3">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {quickReplies.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSend(item)}
                className="shrink-0 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-100"
              >
                {item}
              </button>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="พิมพ์ข้อความ..."
              className="h-12 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
            />

            <button
              type="submit"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-500 text-lg text-white shadow-md shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.98]"
            >
              ➤
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-3 py-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}