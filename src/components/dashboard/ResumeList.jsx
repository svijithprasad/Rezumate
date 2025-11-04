import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Plus, Upload, FileText, Loader2, EllipsisVertical } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { useUser } from "@clerk/clerk-react";
import { Skeleton } from "../ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ResumeActionSheet } from "../actionSheets/ResumeActionSheet";
import { useNavigate } from "react-router-dom";

const createResumeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    templateId: z.enum(["classic", "modern", "minimal"], {
        required_error: "Please select a template",
    }),
    accentColor: z.string().min(1, "Please select a color"),
});

function ResumeList() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { user } = useUser();

    const accentColors = useQuery(api.color.getColors);
    const userResumes = useQuery(
        api.resume.getResumesByUserId,
        user?.id ? { userId: user.id } : "skip" 
    );


    const createResume = useMutation(api.resume.create);

    const form = useForm({
        resolver: zodResolver(createResumeSchema),
        defaultValues: {
            title: "",
            templateId: "",
            accentColor: "",
        },
    });

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            await createResume({
                title: values.title,
                templateId: values.templateId,
                accentColor: values.accentColor,
                lastEdited: Date.now(),
                createdAt: Date.now(),
            });

            form.reset();
            setIsOpen(false);
            toast.success("Resume created successfully!");
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to create resume");
            setIsLoading(false)
        }
    };

    return (
        <div className="flex flex-col gap-6 px-20">
            {/* Header Row */}
            <div className="flex items-center gap-4 justify-between flex-wrap">
                <p className="text-2xl font-semibold">Resume&apos;s</p>
                <div className="flex items-center gap-5">
                    {/* Create Resume Button */}
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex cursor-pointer items-center gap-2">
                                <Plus size={16} />
                                Create Resume
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create a Resume</DialogTitle>
                            </DialogHeader>

                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4 py-3"
                                >
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

                                    {/* Template + Color */}
                                    <div className="flex items-center gap-5">
                                        {/* Template Select */}
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

                                        {/* Accent Color Select */}
                                        <FormField
                                            control={form.control}
                                            name="accentColor"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Accent Color</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="cursor-pointer">
                                                                <SelectValue placeholder="Select color" />
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
                                                                            style={{ backgroundColor: color.color }}
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

                                    <Button type="submit" className="w-full cursor-pointer">
                                        {isLoading ? (<Loader2 className="animate-spin repeat-infinite" />) : (<>
                                            <Plus size={16} />
                                            Create Resume
                                        </>)}
                                    </Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>

                    {/* Import Resume Button */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Upload size={16} />
                                Import Resume
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Import a Resume</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-3">
                                <p className="text-sm text-muted-foreground">
                                    Upload a resume file (PDF or DOCX). We’ll extract its content.
                                </p>
                                <Input type="file" accept=".pdf,.docx" />
                                <Button className="w-full">Upload</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>

            <Separator className="my-2" />

            {/* ------------------- User Resumes ------------------- */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {/* Loading Skeletons */}
                {userResumes === undefined && (
                    <>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Card key={i} className="p-2">
                                <CardContent className="flex flex-col justify-between h-full p-3">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <Skeleton className="w-4 h-4 rounded" />
                                            <Skeleton className="w-12 h-3 rounded" />
                                        </div>
                                        <Skeleton className="w-32 h-4 mt-3 rounded" />
                                        <Skeleton className="w-24 h-3 mt-2 rounded" />
                                    </div>
                                    <Skeleton className="w-full h-1.5 rounded mt-3" />
                                </CardContent>
                            </Card>
                        ))}
                    </>
                )}

                {/* Empty State */}
                {userResumes?.length === 0 && (
                    <p className="text-muted-foreground text-sm col-span-full text-center">
                        No resumes yet.
                    </p>
                )}

                {/* Resume Cards */}
                {userResumes?.map((resume) => (
                    <Card
                        key={resume._id}
                        onClick={() => navigate(`/resume/${resume._id}`)}
                        className="p-2 cursor-pointer group transition-all hover:scale-[1.02] w-full"
                        style={{
                            backgroundColor: `${resume.accentColor}20`,
                            borderColor: resume.accentColor,
                        }}
                    >
                        <CardContent className="flex flex-col justify-between h-full p-3">
                            <div>
                                <div className="flex items-center justify-between">
                                    <FileText size={18} />
                                </div>
                                <p className="font-semibold mt-2 truncate">{resume.title}</p>
                                <p className="text-sm text-muted-foreground capitalize">
                                    {resume.templateId} Template
                                </p>
                                <span className="text-[10px] text-muted-foreground">
                                    Created At {new Date(resume.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div
                                className="w-full h-1.5 rounded-full mt-3"
                                style={{ backgroundColor: resume.accentColor }}
                            />
                            <ResumeActionSheet resumeId={resume._id} />
                        </CardContent>
                    </Card>
                ))}

            </div>

        </div>
    );
}

export default ResumeList;
