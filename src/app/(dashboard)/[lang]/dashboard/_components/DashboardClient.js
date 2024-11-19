"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Meteors from "@/components/ui/meteors";
import Spinner from "@/components/ui/Spinner";
import { formatDate } from "@/lib/utils/utils";
import { useGetUser } from "@/lib/hooks/useAuth";

export default function DashboardClient({ lang, dict }) {
  const { data, error, isLoading } = useGetUser();
  const { user } = data || {};

  return (
    <div className="p-4 w-full h-full">
      <div className="p-4 bg-background/90 rounded-2xl relative overflow-hidden">
        {isLoading ? (
          <div className="h-24">
            <Spinner className="w-10 h-10" />
          </div>
        ) : (
          <>
            <div className="text-lg font-bold">
              {dict?.welcome} {user?.name}
            </div>
            <div>
              <p>
                {dict?.joined}: {formatDate(user?.created_at)}
              </p>
              <p>{user?.email}</p>
              <p>{user?.phone_number}</p>
            </div>
          </>
        )}
        <Meteors number={20} />
      </div>

      <div className="flex justify-start">
        <Link
          href={`/${lang}/dashboard/requests`}
          className="mt-4 rounded-2xl px-10 py-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
        >
          {dict?.sendRequest}
        </Link>
      </div>
    </div>
  );
}
