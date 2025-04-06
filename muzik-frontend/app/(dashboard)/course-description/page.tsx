import { Suspense } from "react";
import CoursePageContent from "./CoursePageContent";

export default function CoursePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoursePageContent />
    </Suspense>
  );
}
