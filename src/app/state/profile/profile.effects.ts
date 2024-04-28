// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
// import * as ProfileActions from "./profile.action";
// import { catchError, mergeMap } from "rxjs";
// import { Profile } from "../../services/Interfaces/profile";
// import { error, profile } from "console";


// @Injectable()

// // export class ProfileEffects {
// //   getProfile$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(ProfileActions.getProfile),
// //       this.facultyService.fetchData('getprofile/fetchProfile').pipe(

// //       )
// //     )
// //   )
// // export class ProfileEffects {
// //   getProfile$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(ProfileActions.getProfile),
// //       mergeMap(() => {
// //         return this.facultyService
// //           .fetchData<Profile>()
// //           .pipe(map(profile) => ProfileActions.getProfileSuccess({ profile }),
// //             catchError((error) =>
// //               of(ProfileActions.getProfileFailure({
// //                 error: error.message
// //               }))

// //             ))
// //       })
// //     )
// //   )


// // constructor(
// //   private actions$: Actions,
// //   private facultyService: FacultyRequestService
// // ) { }
// }
