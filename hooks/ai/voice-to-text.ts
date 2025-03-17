// "use server"

// import { handleHttpError, http } from "@/lib/http"
// import { type ActionResponse } from "@/lib/types/action-response"

// export async function predictVoiceToText(
//   formData: FormData
// ): Promise<ActionResponse<{ message: string; data: string }>> {
//   try {
//     const { data, resultCode, message } = await http.post<string | unknown[]>(
//       `/api/library-items/voice`,
//       formData
//     )

//     if (resultCode === "SYS.Fail0008" && Array.isArray(data)) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return data as any
//     }

//     return {
//       isSuccess: true,
//       data: {
//         message: message,
//         data: data as string,
//       },
//     }
//   } catch (error) {
//     return handleHttpError(error)
//   }
// }
