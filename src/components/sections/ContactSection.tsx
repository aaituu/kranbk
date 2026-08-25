"use client";

import { useState } from "react";
import { MapPin, Phone, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { COMPANY } from "@/lib/company";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // На сервере заявка сохраняется через API; на статическом хостинге
      // просто открываем WhatsApp с заполненным сообщением.
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => null);
      const text = encodeURIComponent(
        `Заявка с сайта\nИмя: ${formData.name}\nТелефон: ${formData.phone}` +
          (formData.email ? `\nE-mail: ${formData.email}` : "") +
          (formData.message ? `\nСообщение: ${formData.message}` : ""),
      );
      window.open(`${COMPANY.whatsappHref}?text=${text}`, "_blank");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const field =
    "mt-1.5 rounded-xl border-brand-line bg-white text-brand-forest placeholder:text-brand-muted/60 focus-visible:ring-brand-green";

  return (
    <section id="contact" className="px-3 pt-16 md:px-4 md:pt-24">
      <div className="mx-auto max-w-[1280px] px-1 md:px-10">
        <span className="eyebrow">Контакты</span>
        <h2 className="mb-7 mt-2 text-[26px] font-semibold text-brand-forest md:text-[30px]">
          Оставить заявку или получить консультацию
        </h2>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-brand-line bg-brand-paper px-7 py-8 md:px-9">
            {isSubmitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-mint">
                  <CheckCircle2 className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-brand-forest">
                  Спасибо за обращение!
                </h3>
                <p className="mt-2 text-brand-muted">
                  Мы свяжемся с вами в ближайшее время.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-7 rounded-full bg-brand-green px-7 font-semibold text-white hover:bg-brand-green"
                >
                  Отправить ещё
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-brand-forest">
                      Имя *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Как к вам обращаться"
                      className={field}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-brand-forest">
                      Телефон *
                    </Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+7 ___ ___ __ __"
                      className={field}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-brand-forest">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="mail@company.kz"
                    className={field}
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-brand-forest">
                    Сообщение
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Марка крана, сроки аренды или задача по металлу"
                    className={field}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-brand-red py-6 text-[15px] font-bold text-white hover:bg-brand-red/90"
                >
                  {isSubmitting ? "Отправляем…" : "Отправить заявку"}
                </Button>
                <p className="text-center text-[12.5px] text-brand-muted">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных
                  данных.
                </p>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl bg-brand-green px-8 py-8">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-3 text-[21px] font-bold text-white"
              >
                <Phone className="h-5 w-5 text-white" />
                {COMPANY.phone}
              </a>
              {COMPANY.extraPhones.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  className="mt-3 flex items-center gap-3 text-[15px] text-white/80"
                >
                  <Phone className="h-4.5 w-4.5 text-white" />
                  {p.label}
                </a>
              ))}
              <a
                href={COMPANY.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center gap-3 text-[15px] text-white/80"
              >
                <MessageCircle className="h-4.5 w-4.5 text-white" />
                WhatsApp · {COMPANY.phone}
              </a>
              <div className="mt-3 flex items-start gap-3 text-[15px] text-white/80">
                <MapPin className="mt-0.5 h-4.5 w-4.5 flex-none text-white" />
                {COMPANY.address}
              </div>
            </div>

            <div className="flex-1 rounded-3xl border border-brand-line bg-brand-mint px-8 py-7">
              <div className="text-[15.5px] font-semibold text-brand-forest">
                Работаем по всей Республике Казахстан
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-brand-muted">
                Краны и запчасти — в наличии и под заказ. Сотрудничаем со
                строительными компаниями и застройщиками, база — г. Астана.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
