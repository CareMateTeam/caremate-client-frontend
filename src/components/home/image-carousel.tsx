"use client";

import { useEffect, useMemo, useState } from "react";

type HomeCarouselItem = {
  src: string;
  title: string;
  description: string;
  tag: string;
};

const carouselItems: HomeCarouselItem[] = [
  {
    src: "/home/image-1.webp",
    title: "ดูแลคนสำคัญได้ง่ายขึ้น",
    description:
      "CareMate ช่วยจัดการข้อมูลสุขภาพ สมาชิกในครอบครัว และการขอรับบริการดูแลไว้ในที่เดียว",
    tag: "Family Care",
  },
  {
    src: "/home/image-2.webp",
    title: "บริการดูแลที่เข้าถึงได้",
    description:
      "เลือกบริการที่เหมาะกับผู้สูงอายุ ผู้ป่วย หรือสมาชิกที่ต้องการความช่วยเหลือในชีวิตประจำวัน",
    tag: "Home Service",
  },
  {
    src: "/home/image-3.jpg",
    title: "ข้อมูลพร้อม ดูแลปลอดภัยกว่า",
    description:
      "บันทึกข้อมูลที่อยู่ สุขภาพ ยาที่ใช้ และผู้ติดต่อฉุกเฉิน เพื่อช่วยให้การดูแลมีประสิทธิภาพมากขึ้น",
    tag: "Health Profile",
  },
];

export default function HomeImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = carouselItems[activeIndex];

  const nextIndex = useMemo(() => {
    return activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
  }, [activeIndex]);

  const previousIndex = useMemo(() => {
    return activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
  }, [activeIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1,
      );
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-md border border-white bg-white shadow-2xl shadow-cyan-100">
      <div className="relative h-[260px] w-full overflow-hidden">
        {carouselItems.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={item.src}
              className={[
                "absolute inset-0 transition-all duration-700 ease-out",
                isActive
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-105 opacity-0",
              ].join(" ")}
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          );
        })}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="mb-3 inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] backdrop-blur">
            {activeItem.tag}
          </div>

          <h2 className="text-2xl font-black leading-tight">
            {activeItem.title}
          </h2>

          <p className="mt-2 max-w-xs text-sm leading-6 text-white/85">
            {activeItem.description}
          </p>
        </div>
        {/* 
        <button
          type="button"
          onClick={() => setActiveIndex(previousIndex)}
          className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-lg font-black text-slate-800 shadow-lg backdrop-blur active:scale-95"
          aria-label="Previous image"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={() => setActiveIndex(nextIndex)}
          className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-lg font-black text-slate-800 shadow-lg backdrop-blur active:scale-95"
          aria-label="Next image"
        >
          ›
        </button> */}
      </div>

      {/* <div className="flex items-center justify-between gap-4 bg-white px-5 py-1">
        <div className="flex gap-2">
          {carouselItems.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={[
                "h-2.5 rounded-full transition-all",
                activeIndex === index
                  ? "w-8 bg-cyan-500"
                  : "w-2.5 bg-slate-200",
              ].join(" ")}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <p className="text-xs font-black text-slate-400">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(carouselItems.length).padStart(2, "0")}
        </p>
      </div> */}
    </section>
  );
}
