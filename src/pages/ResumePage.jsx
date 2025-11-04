import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ResumeBuilder from "@/components/dashboard/ResumeBuilder";

function Resume() {
    const { id } = useParams();
    console.log(id)
    const resume = useQuery(api.resume.get, id ? { id } : "skip");

    if (resume === undefined) return <p>Loading...</p>;
    if (!resume) return <p>Resume not found.</p>;

    return (
        <ResumeBuilder
            resumeId={resume._id}
            templateId={resume.templateId}
        />
    );
}

export default Resume;
