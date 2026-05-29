import { UserInformation } from "@/dto/user";
import { TopUserInformation } from "@/components/card/user-information";
import { TopUserInformationSkeleton } from "@/components/card/user-skelton";

type HomeUserSummaryProps = {
  loadingUser: boolean;
  currentUser: UserInformation | null;
};

export default function HomeUserSummary({
  loadingUser,
  currentUser,
}: HomeUserSummaryProps) {
  if (loadingUser) {
    return <TopUserInformationSkeleton />;
  }

  if (currentUser) {
    return <TopUserInformation user={currentUser} />;
  }

  return null;
}