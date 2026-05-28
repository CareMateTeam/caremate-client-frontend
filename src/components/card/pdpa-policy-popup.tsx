// components/profile/pdpa-policy-popup.tsx

"use client";

import React, { useEffect, useState } from "react";

const pdpaSections = [
  {
    title: "1. วัตถุประสงค์ในการเก็บรวบรวมข้อมูลส่วนบุคคล",
    content:
      "CareMate เก็บรวบรวม ใช้ และประมวลผลข้อมูลส่วนบุคคลของผู้ใช้ เพื่อใช้ในการให้บริการดูแลผู้ป่วย ผู้สูงอายุ หรือผู้รับการดูแล รวมถึงการยืนยันตัวตน การจัดการบัญชีผู้ใช้ การจองบริการ การประสานงานกับผู้ดูแล การติดต่อสื่อสาร การดูแลความปลอดภัย และการปรับปรุงคุณภาพของบริการให้เหมาะสมกับความต้องการของผู้ใช้แต่ละราย",
  },
  {
    title: "2. ประเภทของข้อมูลที่เราอาจเก็บรวบรวม",
    content:
      "ข้อมูลที่อาจถูกเก็บรวบรวม ได้แก่ ชื่อ นามสกุล ชื่อเล่น เบอร์โทรศัพท์ อีเมล วันเกิด เพศ รูปโปรไฟล์ ข้อมูลบัญชี LINE ข้อมูลที่อยู่ ข้อมูลตำแหน่งละติจูดและลองจิจูด ข้อมูลสุขภาพที่ผู้ใช้กรอก เช่น กรุ๊ปเลือด ประวัติการแพ้ โรคประจำตัว ยาที่ใช้อยู่ หมายเหตุสำหรับการดูแล และข้อมูลผู้ติดต่อฉุกเฉิน ทั้งนี้ข้อมูลสุขภาพถือเป็นข้อมูลที่มีความอ่อนไหวและจะถูกใช้เท่าที่จำเป็นต่อการให้บริการเท่านั้น",
  },
  {
    title: "3. การใช้ข้อมูลตำแหน่งที่ตั้ง",
    content:
      "CareMate อาจใช้ข้อมูลตำแหน่งที่ตั้ง เช่น พิกัดละติจูดและลองจิจูด เพื่อช่วยให้ผู้ดูแลสามารถเดินทางไปยังสถานที่ดูแลได้อย่างถูกต้องและปลอดภัย ผู้ใช้สามารถเลือกตำแหน่งจากแผนที่หรืออนุญาตให้ระบบใช้ตำแหน่งปัจจุบันผ่านเบราว์เซอร์ได้ โดยการเข้าถึงตำแหน่งจะเกิดขึ้นเมื่อผู้ใช้ให้ความยินยอมเท่านั้น",
  },
  {
    title: "4. การใช้ข้อมูลสุขภาพ",
    content:
      "ข้อมูลสุขภาพที่ผู้ใช้ให้ไว้จะถูกใช้เพื่อช่วยให้ผู้ดูแลเข้าใจข้อควรระวังในการดูแล เช่น โรคประจำตัว ประวัติการแพ้ ยาที่ต้องรับประทาน หรือข้อจำกัดด้านการเคลื่อนไหว ข้อมูลดังกล่าวจะไม่ถูกนำไปใช้เพื่อวัตถุประสงค์อื่นที่ไม่เกี่ยวข้องกับการให้บริการดูแล เว้นแต่ได้รับความยินยอมจากผู้ใช้ หรือเป็นกรณีที่กฎหมายอนุญาต",
  },
  {
    title: "5. การเปิดเผยข้อมูลแก่บุคคลที่เกี่ยวข้อง",
    content:
      "CareMate อาจเปิดเผยข้อมูลบางส่วนให้แก่ผู้ดูแล พนักงาน ผู้ให้บริการระบบ หรือคู่ค้าทางเทคนิค เท่าที่จำเป็นต่อการให้บริการ เช่น ชื่อผู้รับการดูแล เบอร์โทรศัพท์ ที่อยู่สำหรับเข้ารับบริการ หมายเหตุการดูแล และข้อมูลสุขภาพที่เกี่ยวข้องกับความปลอดภัย ทั้งนี้บุคคลที่ได้รับข้อมูลจะต้องใช้ข้อมูลตามวัตถุประสงค์ที่กำหนดเท่านั้น",
  },
  {
    title: "6. การเก็บรักษาและระยะเวลาในการจัดเก็บข้อมูล",
    content:
      "CareMate จะเก็บรักษาข้อมูลส่วนบุคคลของผู้ใช้ตราบเท่าที่จำเป็นต่อการให้บริการ การปฏิบัติตามสัญญา การปฏิบัติตามกฎหมาย การตรวจสอบย้อนหลัง การป้องกันการทุจริต หรือการจัดการข้อร้องเรียน เมื่อหมดความจำเป็นแล้ว ข้อมูลจะถูกลบ ทำให้ไม่สามารถระบุตัวบุคคลได้ หรือจัดเก็บในรูปแบบที่ปลอดภัยตามความเหมาะสม",
  },
  {
    title: "7. สิทธิของเจ้าของข้อมูลส่วนบุคคล",
    content:
      "ผู้ใช้มีสิทธิขอเข้าถึงข้อมูลส่วนบุคคล ขอแก้ไขข้อมูลให้ถูกต้อง ขอให้ลบหรือทำลายข้อมูล ขอระงับการใช้ข้อมูล ขอคัดค้านการประมวลผล ขอถอนความยินยอม และขอรับสำเนาข้อมูลส่วนบุคคลได้ตามเงื่อนไขที่กฎหมายกำหนด โดยการใช้สิทธิบางอย่างอาจส่งผลต่อการให้บริการของ CareMate ได้",
  },
  {
    title: "8. การรักษาความปลอดภัยของข้อมูล",
    content:
      "CareMate ให้ความสำคัญกับการรักษาความปลอดภัยของข้อมูลส่วนบุคคล โดยมีมาตรการควบคุมการเข้าถึงข้อมูล การจำกัดสิทธิ์ของผู้เกี่ยวข้อง การป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต และการจัดการข้อมูลอย่างเหมาะสม อย่างไรก็ตาม ผู้ใช้ควรดูแลบัญชีของตนเอง เช่น ไม่เปิดเผยรหัสผ่านหรือข้อมูลเข้าสู่ระบบแก่บุคคลอื่น",
  },
  {
    title: "9. การถอนความยินยอม",
    content:
      "ผู้ใช้สามารถถอนความยินยอมในการเก็บ ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลได้ตามช่องทางที่ CareMate กำหนด อย่างไรก็ตาม การถอนความยินยอมอาจทำให้บางฟีเจอร์ไม่สามารถใช้งานได้ เช่น การจองบริการ การแจ้งข้อมูลให้ผู้ดูแล หรือการใช้ตำแหน่งเพื่อระบุสถานที่ดูแล",
  },
  {
    title: "10. การเปลี่ยนแปลงนโยบาย",
    content:
      "CareMate อาจปรับปรุงหรือเปลี่ยนแปลงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว เพื่อให้สอดคล้องกับการให้บริการ เทคโนโลยี หรือข้อกำหนดทางกฎหมาย หากมีการเปลี่ยนแปลงที่สำคัญ ระบบจะแจ้งให้ผู้ใช้ทราบผ่านช่องทางที่เหมาะสม",
  },
];

export default function PdpaPolicyPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full rounded-lg border border-cyan-100 bg-cyan-50/90 p-4 text-left shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 active:scale-[0.99]"
      >
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-md bg-white text-2xl">
            🛡️
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-950">
              นโยบายคุ้มครองข้อมูลส่วนบุคคล
            </h3>
            <p className="mt-1 text-sm leading-5 text-slate-500">
                Policy และการใช้ข้อมูลของ CareMate
            </p>
          </div>

          <span className="text-xl text-slate-500">›</span>
        </div>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-slate-950/45 px-4 pb-4 pt-10 backdrop-blur-sm sm:items-center">
          <div className="flex max-h-[88vh] w-full max-w-md flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-600">
                    CareMate Privacy Notice
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-slate-950">
                    นโยบายคุ้มครองข้อมูลส่วนบุคคล
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    รายละเอียดเกี่ยวกับการเก็บ ใช้ เปิดเผย และดูแลข้อมูลส่วนบุคคลของผู้ใช้
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-100 text-xl font-bold text-slate-500 transition hover:bg-slate-200"
                  aria-label="Close PDPA popup"
                >
                  X
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              <div className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-800">
                เอกสารนี้จัดทำขึ้นเพื่ออธิบายแนวทางการดูแลข้อมูลส่วนบุคคลของผู้ใช้ในระบบ CareMate
                โดยเน้นความโปร่งใส ความปลอดภัย และการใช้ข้อมูลเท่าที่จำเป็นต่อการให้บริการ
              </div>

              {pdpaSections.map((section) => (
                <section key={section.title}>
                  <h3 className="text-sm font-extrabold text-slate-950">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {section.content}
                  </p>
                </section>
              ))}

              <section className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                <h3 className="text-sm font-extrabold text-amber-900">
                  หมายเหตุสำคัญ
                </h3>
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  หากผู้ใช้กรอกข้อมูลสุขภาพหรือข้อมูลผู้ติดต่อฉุกเฉิน
                  ควรตรวจสอบให้ถูกต้องและเป็นปัจจุบัน เพื่อให้ผู้ดูแลสามารถให้บริการได้อย่างปลอดภัยและเหมาะสม
                </p>
              </section>
            </div>

            <div className="border-t border-slate-100 p-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-12 w-full rounded-2xl bg-cyan-500 text-sm font-bold text-white shadow-md shadow-cyan-100 transition hover:bg-cyan-600 active:scale-[0.99]"
              >
                รับทราบ
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}