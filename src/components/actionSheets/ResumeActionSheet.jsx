import React, { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EllipsisVertical, Loader2, Save, Trash2 } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// ✅ Validation Schema
const updateResumeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    templateId: z.enum(["classic", "modern", "minimal"], {
        required_error: "Please select a template",
    }),
    accentColor: z.string().min(1, "Please select a color"),
    content: z.string().optional(),
});

export function ResumeActionSheet({ resumeId }) {
    const resume = useQuery(api.resume.get, { id: resumeId });
    const updateResume = useMutation(api.resume.updateResume);
    const deleteResume = useMutation(api.resume.deleteResume);
    const accentColors = useQuery(api.color.getColors);
    console.log(accentColors)
    const [isLoading, setIsLoading] = useState(false);

    // Initialize form
    const form = useForm({
        resolver: zodResolver(updateResumeSchema),
        defaultValues: {
            title: "",
            templateId: "",
            accentColor: "",
        },
    });

    // Populate form when resume is loaded
    useEffect(() => {
        if (resume) {
            form.reset({
                title: resume.title || "",
                templateId: resume.templateId || "",
                accentColor: resume.accentColor || "",
                content: resume.content || "",
            });
        }
    }, [resume, form]);

    // Handle update
    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            await updateResume({
                id: resumeId,
                ...values,

            });
            toast.success("Resume updated successfully!");
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update resume");
            setIsLoading(false);
        }
    };

    // Handle delete
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this resume?")) return;
        try {
            await deleteResume({ id: resumeId });
            toast.success("Resume deleted successfully");
        } catch (err) {
            toast.error("Failed to delete resume");
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 hidden rounded-full cursor-pointer group-hover:flex"
                >
                    <EllipsisVertical />
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[400px] sm:w-[450px] p-6 space-y-6 overflow-y-auto">
                {!resume ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Loader2 className="animate-spin mb-2" />
                        <p>Loading resume...</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <SheetHeader>
                            <SheetTitle className="text-lg font-semibold">
                                Editing: <span className="text-primary">{resume.title}</span>
                            </SheetTitle>
                            <SheetDescription>
                                Update or delete this resume’s details below.
                            </SheetDescription>
                        </SheetHeader>

                        {/* Editable Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4 flex flex-col justify-between h-full">
                                <div>
                                    {/* Title */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter resume title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex items-center gap-5">
                                        {/* Template */}
                                        <FormField
                                            control={form.control}
                                            name="templateId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Template</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="cursor-pointer">
                                                                <SelectValue placeholder="Select template" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="classic">Classic</SelectItem>
                                                            <SelectItem value="modern">Modern</SelectItem>
                                                            <SelectItem value="minimal">Minimal</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Accent Color */}
                                        <FormField
                                            control={form.control}
                                            name="accentColor"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Accent Color</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={resume.accentColor}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="cursor-pointer">
                                                                <SelectValue placeholder="color" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {accentColors?.map((color) => (
                                                                <SelectItem
                                                                    key={color._id}
                                                                    value={color.color}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div
                                                                            className="w-4 h-4 rounded-full"
                                                                            style={{
                                                                                backgroundColor: color.color,
                                                                            }}
                                                                        />
                                                                        {color.label}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>



                                </div>
                                {/* Footer Buttons */}
                                <div className="pt-4 border-t flex gap-3">
                                    <Button
                                        type="submit"
                                        className="flex-1 cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        className="flex-1 cursor-pointer"
                                        onClick={handleDelete}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
