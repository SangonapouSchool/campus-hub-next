import { ActivityCard } from "@/components/ActivityCard";
import { ProgressCard } from "@/components/ProgressCard";
import { Sidebar } from "@/components/Sidebar";
import { TaskDashboard } from "@/components/TaskDashboard";
import { formatToday, student } from "@/lib/dashboard";
import { initialTasks } from "@/lib/tasks";

// La fecha del saludo se calcula en cada visita, no al compilar.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col gap-8 px-4 pt-7 pb-28 sm:px-8 md:px-12 md:py-10">
        <TaskDashboard
          initialTasks={initialTasks}
          firstName={student.firstName}
          today={formatToday()}
          aside={
            <>
              <ProgressCard />
              <ActivityCard />
            </>
          }
        />
      </main>
    </div>
  );
}
