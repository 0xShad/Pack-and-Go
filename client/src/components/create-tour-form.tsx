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

type CreateTourFormProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function CreateTourForm({ className, ...props }: CreateTourFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [participants, setParticipants] = useState<number>();
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<number>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateTour = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.error(error);
      toast.error("Failed to create the tour.");
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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="TourTitle">Title</Label>
                <Input
                  id="TourTitle"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="TourDescription">Description</Label>
                <Textarea
                  id="TourDescription"
                  placeholder="Type your tour description here."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="TourLocation">Location</Label>
                  <Input
                    id="TourLocation"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="TourParticipants">Max. Participants</Label>
                  <Input
                    id="TourParticipants"
                    type="number"
                    step="1"
                    required
                    value={participants}
                    onChange={(e) => setParticipants(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="TourPrice">Price</Label>
                <Input
                  id="TourPrice"
                  type="number"
                  step="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
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
                <Button type="submit" className="w-full cursor-pointer">
                  Create Tour
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
