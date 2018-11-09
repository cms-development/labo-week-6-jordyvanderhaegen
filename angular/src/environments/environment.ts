// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client_id: 'f88f5145-c49d-42e7-a8bd-8d6caacb1ed5',
  client_secret: 'wickedman',
  drupalApi : {
    url: 'http://localhost/',
    jsonurl: 'jsonapi/',
    endPoints: {
      node: {
        url: 'jsonapi/node/',
        type : {
          'article': 'article'
        }
      },
      student: {
        url: 'student/student'
      },
      instructor: {
        url: 'instructor/instructor'
      },
      course: {
        url: 'course/course'
      },
      oauth: {
        url: 'oauth/',
        type: {
          'token': 'token'
        }
      }
    },
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
