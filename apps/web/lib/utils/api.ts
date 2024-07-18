import { Profile } from '@tekken-space/database'

type ApiAssertionSuccess<T = any> = {
    data: T
}

type ApiAssertionResult<T = any> =
    | {
          data: T
          errorResponse: never
      }
    | {
          data: never
          errorResponse: Response
      }

// export function assertAdmin(user: Profile | null): ApiAssertionResult<Profile> {
//     if (!user) {
//         return {
//             errorResponse: new Response(null, {
//                 status: 401,
//             }),
//         }
//     }
//
//     return {
//         data: user,
//         errorResponse: null,
//     }
// }
