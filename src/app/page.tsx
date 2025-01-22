"use client";
import { InvoiceForm } from "@/components/invoice/form/InvoiceForm";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const debouncedValue = useDebounce(text);
  useEffect(() => {
    if (debouncedValue) {
      console.log(debouncedValue);
    }
  }, [debouncedValue]);
  const [debouncedText, setDebouncedText] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  useEffect(() => {
    if (debouncedText) {
      console.log("debounce text", debouncedText);
    }
  }, [debouncedText]);

  return (
    <div className="m-8">
      <div>
        <h2>Debounce</h2>
        <div>
          <input placeholder="text" onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
      <InvoiceForm />
    </div>
  );
}
