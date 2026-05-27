import { ApiResponse } from "@/dto/api";
import type { UserInformation, UserProfileResponse } from "@/dto/user";

export function mapUserProfileToTopInformation(
  profile: UserProfileResponse,
): UserInformation {
  const firstName = profile.information?.firstName?.trim() ?? "";
  const lastName = profile.information?.lastName?.trim() ?? "";
  const fullName = `${firstName} ${lastName}`.trim();

  return {
    displayName: profile.name || firstName || "CareMate User",
    fullName: fullName || profile.name || "-",
    avatarUrl: profile.avatarUrl || "",
    role: "Member",
    phone: profile.information?.phone || profile.phone || "-",
    memberStatus: profile.isActive ? "Verified" : "Inactive",
  };
}

export function unwrapApiData<T>(data: ApiResponse<T> | T): T {
  const maybeWrapped = data as ApiResponse<T>;

  return maybeWrapped.data ?? maybeWrapped.Data ?? maybeWrapped.result ?? (data as T);
}
