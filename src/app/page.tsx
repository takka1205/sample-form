"use client";

import { Toaster } from "@/components/ui/toaster";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormPost = async (title: string, email: string) => {
  const res = await fetch(`http://localhost:3000/api/post`, {
    method: "POST",
    body: JSON.stringify({ title, email }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
};

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();
  interface ChangeState {
    title: string;
    email: string;
  }
  const [Change, setChange] = useState<ChangeState>({
    title: "",
    email: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChange(prevChange => ({
      ...prevChange,
      [name]: value,
    }));
    console.log(Change.email);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Change.title !== "" && Change.email !== "") {
      FormPost(Change.title, Change.email);
      toast({
        description: "投稿完了しました",
      });
      router.push("/complate");
    } else {
      toast({
        description: "入力してください",
      });
    }
  };
  return (
    <main>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input type="text" name="title" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <button className="p-2 bg-gray-500">Submit</button>
      </form>
    </main>
  );
}
