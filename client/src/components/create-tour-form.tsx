import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import React from "react";
import axios from "axios";
import { useAuth } from "@/context/auth.context";

type CreateTourFormProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

interface TourData {
  title: string;
  description: string;
  participants: number;
  location: string;
  price: number;
  image: string;
  date: string;
}

export function CreateTourForm({ className, ...props }: CreateTourFormProps) {
  const { token } = useAuth();

  const [formData, setFormData] = useState<TourData>({
    title: "",
    description: "",
    location: "",
    price: 0,
    participants: 1,
    image: "",
    date: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "participants" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        image: base64Image,
      }));
      setPreview(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tour/create-tour`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Tour created successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        price: 0,
        participants: 1,
        image: "",
        date: "",
      });
      setPreview(null);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating the tour."
      );
      console.error(error);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 overflow-auto", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>
            Fill in information about your tour.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="TourTitle">Title</Label>
                <Input
                  id="TourTitle"
                  type="text"
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="TourDescription">Description</Label>
                <Textarea
                  id="TourDescription"
                  placeholder="Type your tour description here."
                  value={formData.description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="TourLocation">Location</Label>
                  <Input
                    id="TourLocation"
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="TourParticipants">Max. Participants</Label>
                  <Input
                    id="TourParticipants"
                    type="number"
                    name="participants"
                    step="1"
                    required
                    value={formData.participants}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="TourPrice">Price</Label>
                  <Input
                    id="TourPrice"
                    type="number"
                    name="price"
                    step="1"
                    required
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="TourDate">Date</Label>
                  <Input
                    id="TourDate"
                    type="date"
                    required
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="TourPhotos">Photos</Label>
                <Input
                  id="TourPhotos"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-3">
                {preview && (
                  <img
                    src={preview}
                    alt="Selected"
                    className="mt-2 rounded-md object-cover w-full h-[100px] border"
                  />
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Tour"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
