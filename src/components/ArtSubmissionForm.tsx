import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

const formSchema = z.object({
  artistName: z.string().min(2, "Name must be at least 2 characters"),
  walletAddress: z.string().min(32, "Please enter a valid Solana wallet address"),
  description: z.string().min(10, "Please provide a brief description of your artwork"),
  image: z.instanceof(File).optional(),
});

export const ArtSubmissionForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: "",
      walletAddress: "",
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitting art:", values);
    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual submission logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      
      toast({
        title: "Submission Successful!",
        description: "Your artwork has been submitted for the contest. Share your unique link to get votes!",
      });
      
      form.reset();
      setPreviewUrl(null);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your artwork. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="artistName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist Name</FormLabel>
              <FormControl>
                <Input placeholder="Your artist name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solana Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="Your Solana wallet address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artwork Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your artwork..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Upload Artwork</FormLabel>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="artwork-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/5"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Artwork preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB)</p>
                </div>
              )}
              <input
                id="artwork-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Artwork"}
        </Button>
      </form>
    </Form>
  );
};